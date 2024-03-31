/**
 * 代理数组
 * 需要注意的是
 *   1 如果设置索引的长度大于数组本身的长度，那么就会更新数组的length属性。 那么与数组本身length相关联的副作用属性应该触发
 *    处理方式： 如果操作类型是数组并且为ADD， 应该取出并执行与length属性相关的副作用函数
 */
import { reactive, effect } from 'vue';

const arr = reactive(['foo']);

effect(() => {
  console.log(arr.length );
});

arr[2] = 'bar';
