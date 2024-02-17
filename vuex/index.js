let _vue = null;

class Store {
  constructor(options) {
    const state = options.state || {};
    const mutations = options.mutations || {};
    const actions = options.actions || {};
    const getters = options.getters || {};
    // 实现state中的数据响应式
    this.state = _vue.observable(state);
    this.getters = Object.create(null);
    Object.keys(getters).forEach((key) => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key].call(this, this.state);
        },
      });
    });

    this.mutations = {};
    Object.keys(mutations).forEach((key) => {
      this.mutations[key] = (params) => {
        mutations[key].call(this, this.state, params);
      };
    });

    this.actions = {};
    Object.keys(actions).forEach((key) => {
      this.actions[key] = (params) => {
        actions[key].call(this, this, params);
      };
    });
  }
  // commit
  commit(eventName, param) {
    this.mutations[eventName](param);
  }
  //dispatch
  dispatch(eventName, param) {
    this.actions[eventName](param);
  }
}

function install(vue) {
  _vue = vue;
  // 全局混入 这样所用的组件都能使用$store
  _vue.mixin({
    beforeCreate() {
      // this.$options.store 是 new Vue()传递的对象
      if (this.$options.store) {
        // 挂载到原型上
        _vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default {
  install,
  Store,
};
