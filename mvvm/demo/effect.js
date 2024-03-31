let activeEffect; // 存(储当前激活的副作用函数
let targetMap = new Map();
let effectStack = [];

// 收集依赖
export function track(target, key) {
  if (!activeEffect) return;
  //
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  // 当前收集的依赖
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  //
  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

// 触发更新
export function trigger(target, key) {
  // 取出当前激活的副作用函数并且执行
  const depsMap = targetMap.get(target);
  console.log('trigger', depsMap);
  if (!depsMap) {
    return;
  }
  const effects = depsMap.get(key);
  console.log('trigger', effects);

  const effectTpRun = new Set();
  effects &&
    effects.forEach((effect) => {
      if (activeEffect !== effect) {
        effectTpRun.add(effect);
      }
    });
  effectTpRun.forEach((effect) => effect());
  //   effects && effects.foreach((effect) => effect());
}

function cleanUp(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

// 执行副作用函数
export function effect(fn) {
  const effectFn = () => {
    cleanUp(effectFn);
    activeEffect = effectFn;
    effectStack.push(activeEffect);
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  };
  effectFn.deps = [];
  effectFn();
}
