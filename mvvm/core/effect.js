let activeEffect;

// 解决effect嵌套的问题
let effectStack = [];
let targetMap = new WeakMap();

// 收集依赖

export function track(target, key) {
  if (!activeEffect) return;
  // 建立target key 和 effectFn 的关系
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
  // 把当前的依赖关系加入到当前激活的副作用函数中
  activeEffect.deps.push(deps);
}

// 触发更新
export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  console.log('trigger', depsMap);
  if (!depsMap) return;
  let effects = depsMap.get(key);

  const effectsToRun = new Set();
  /**
   * 避免无限递归循环
   */
  effects &&
    effects.forEach((effectFn) => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  effectsToRun.forEach((effectFn) => effectFn());
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

export function effect(fn) {
  const effectFn = () => {
    /**
     * 分支切换防止多余的依赖被收集
     */
    cleanup(effectFn);
    // 当副作用函数执行的时候，将其设置为当前激活的副作用函数
    // effectFn 执行的时候设置为当前机会的副作用函数
    activeEffect = effectFn;
    /**
     * 处理嵌套的effect ，嵌套的时候一次推入副作用函数栈里面
     */
    effectStack.push(effectFn);
    fn();
    // 当前副作用函数执行完毕之后删除掉并且还原原来的副作用函数
    effectStack.pop();
    // 把副作用函数从栈中弹出
    activeEffect = effectStack[effectStack.length - 1];
  };
  // activeEffect.deps 存储所有的域该副作用函数相关联的依赖集合，每次副作用函数执行的时候都把之前关联的依赖删除
  effectFn.deps = [];
  effectFn();
}
