/* eslint-disable */
class Component {
  static name = 'component';

  constructor({ container, data, parent = null } = {}) {
    this.data = data;
    this.container = container;
    this.container.innerHTML = this.render(this.data);
  }

  registerSubComponents(...Comps) {
    const data = this.data;
    const container = this.container;
    this.children = this.children || [];
    Comps.forEach((Comp) => {
      const subContainer = document.createElement('div');
      const sub = new Comp({ container: subContainer, data, parent: this });
      container.appendChild(subContainer);
      this.children.push(sub);
    });
  }

  render(data) {
    /* abstract */
    return '';
  }
}

class Slider extends Component {
  static name = 'slider';

  constructor({ container, images = [], cycle = 3000 } = {}) {
    super({ container, data: images });
    this.items = Array.from(this.container.querySelectorAll('.slider__item, .slider__item--selected'));
    this.cycle = cycle;
    this.slideTo(0);
  }

  render(images) {
    const content = images.map((image) =>
      `
      <li class="slider__item">
        <img src="${image}"/>
      </li>    
    `.trim(),
    );

    return `<ul>${content.join('')}</ul>`;
  }

  getSelectedItem() {
    const selected = this.container.querySelector('.slider__item--selected');
    return selected;
  }

  getSelectedItemIndex() {
    return this.items.indexOf(this.getSelectedItem());
  }

  slideTo(idx) {
    const selected = this.getSelectedItem();
    if (selected) {
      selected.className = 'slider__item';
    }
    const item = this.items[idx];
    if (item) {
      item.className = 'slider__item--selected';
    }

    const detail = { index: idx };
    const event = new CustomEvent('slide', { bubbles: true, detail });
    this.container.dispatchEvent(event);
  }

  slideNext() {
    const currentIdx = this.getSelectedItemIndex();
    const nextIdx = (currentIdx + 1) % this.items.length;
    this.slideTo(nextIdx);
  }

  slidePrevious() {
    const currentIdx = this.getSelectedItemIndex();
    const previousIdx = (this.items.length + currentIdx - 1) % this.items.length;
    this.slideTo(previousIdx);
  }

  start() {
    this.stop();
    this._timer = setInterval(() => this.slideNext(), this.cycle);
  }

  stop() {
    clearInterval(this._timer);
  }
}

class SliderController extends Component {
  static name = 'slider__control';

  constructor({ container, data, parent: slider }) {
    super({ container, data });

    const buttons = container.querySelectorAll('.slider__control-buttons, .slider__control-buttons--selected');
    container.addEventListener('mouseover', (evt) => {
      const idx = Array.from(buttons).indexOf(evt.target);
      if (idx >= 0) {
        slider.slideTo(idx);
        slider.stop();
      }
    });

    container.addEventListener('mouseout', (evt) => {
      slider.start();
    });

    slider.container.addEventListener('slide', (evt) => {
      const idx = evt.detail.index;
      const selected = container.querySelector('.slider__control-buttons--selected');
      if (selected) selected.className = 'slider__control-buttons';
      buttons[idx].className = 'slider__control-buttons--selected';
    });
  }

  render(images) {
    return `
      <div class="slider__control">
        ${images
          .map(
            (image, i) => `
            <span class="slider__control-buttons${i === 0 ? '--selected' : ''}"></span>
        `,
          )
          .join('')}
      </div>    
    `.trim();
  }
}

class SliderPrevious extends Component {
  constructor({ container, parent: slider }) {
    super({ container });
    const previous = container.querySelector('.slider__previous');
    previous.addEventListener('click', (evt) => {
      slider.stop();
      slider.slidePrevious();
      slider.start();
      evt.preventDefault();
    });
  }

  render() {
    return '<a class="slider__previous"></a>';
  }
}

class SliderNext extends Component {
  constructor({ container, parent: slider }) {
    super({ container });
    const previous = container.querySelector('.slider__next');
    previous.addEventListener('click', (evt) => {
      slider.stop();
      slider.slidePrevious();
      slider.start();
      evt.preventDefault();
    });
  }

  render() {
    return '<a class="slider__next"></a>';
  }
}
