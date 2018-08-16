# JavaScript

## 数据类型

  JavaScript中的数据类型有以下几种：
  
  - `栈`：原始数据类型 
  
    > 占据空间小，大小固定
    - Boolean
    - Number
    - String
    - null
    - undefined
    - Symbol （唯一且不可改变）
  - `堆`：引用数据类型
    > 占据内存大，大小不固定  
    引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址  
    当JavaScript解析器寻找引用值时，首先会检索在栈中的地址，取得地址后，再从堆中获得实体
    - Object （所有对象的父对象）
    - Array
    - Function
    - Date
    - RegExp
    - Math

## Typeof

  `typeof` 后面跟操作符，可以返回操作符的类型。
  
  对于原始数据类型：
  
  ```js
    typeof false // 'boolean'
    typeof 123 // 'number'
    typeof '123' // 'string'
    typeof undefined // 'undefined'
    typeof Symbol() // 'symbol'
    typeof b // b 没有声明，但是还会显示 undefined
  ```
  
  对于对象，除了函数都会显示 `object`
  
  ```js
    typeof [] // 'object'
    typeof {} // 'object'
    typeof console.log // 'function'
  ```
  
  对于 `null` 来说，虽然它是基本类型，但是会显示 `object` （bug）
  
  ```js
  typeof null // 'object'
  ```
  
  获取正确类型（改进）：
  
  ```js
  Object.prototype.toString.call([]) // [object Array]
  Object.prototype.toString.call({}) // [object Object]
  Object.prototype.toString.call(null) // [object Null]
  ```

## 原型

  ![prototype](https://camo.githubusercontent.com/71cab2efcf6fb8401a2f0ef49443dd94bffc1373/68747470733a2f2f757365722d676f6c642d63646e2e786974752e696f2f323031382f332f31332f313632316538613962636230383732643f773d34383826683d35393026663d706e6726733d313531373232)

  - `Object` 是所有对象的爸爸，所有对象都可以通过 `__proto__` 找到它
  - `Function` 是所有函数的爸爸，所有函数都可以通过 `__proto__` 找到它
  - `Function.prototype` 和 `Object.prototype` 是两个特殊的对象，他们由引擎来创建
  - 除了以上两个特殊对象，其他对象都是通过构造器 `new` 出来的
  - 函数的 `prototype` 是一个对象，也就是原型
  - 对象的 `__proto__` 指向原型， `__proto__` 将对象和原型连接起来组成了原型链


## 模块化

### CommonJS

  `CommonJs` 是 Node 独有的规范，用于服务器。
  
  - 只能在运行时确定这些东西
  - 输入时必须查找对象属性

  ```js
  // CommonJS模块
  let { stat, exists, readFile } = require('fs');
  
  // 等同于
  let _fs = require('fs');
  let stat = _fs.stat;
  let exists = _fs.exists;
  let readfile = _fs.readfile;
  ```
  上面代码的实质是整体加载 `fs` 模块（即加载fs的所有方法），生成一个对象 `_fs`，然后再从这个对象上面读取 3 个方法。  
  这种加载称为`“运行时加载”`，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。
  
#### module.exports / exports
  
### ES6 Module

  ES6 模块不是对象，而是通过 `export` 命令显式指定输出的代码，再通过 `import` 命令输入。
  ```js
  // ES6模块
  import { stat, exists, readFile } from 'fs';
  ```
  上面代码的实质是从 `fs` 模块加载 3 个方法，其他方法不加载。  
  这种加载称为`“编译时加载”`或者`静态加载`，即 ES6 可以在编译时就完成模块加载，效率要比 `CommonJS` 模块的加载方式高。
  
### 区别

#### `CommonJS` 和 `ES6` 模块化的区别
  
  - 前者支持`动态导入`，也就是 `require(${path}/xx.js)`，后者目前不支持，但是已有提案
  - 前者是`同步导入`，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
  - 前者在导出时都是`值拷贝`，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是后者采用实时绑定的方式，导入导出的值都指向同一个内存地址，所以导入值会跟随导出值变化
  - 后者会编译成 `require/exports` 来执行的

#### `CommonJS` 中 `module.exports` 和 `exports` 的区别

  ```js
  // 基本实现
  var module = {
    exports: {} // exports 就是个空对象
  }
  var exports = module.exports // 用法一样，但exports是一个顶部指针，即使赋值了，只改变exports的指针指向，不会改变module.exports的赋值，即不会有任何效果
  var load = function (module) {
      // 导出的东西
      var a = 1
      module.exports = a
      return module.exports
  };
  ```
  
  
## 防抖与节流

### 防抖
  
  你是否在日常开发中遇到一个问题，在滚动事件中需要做个`复杂计算`或者实现一个按钮的`防二次点击`操作。
  
  尤其是`复杂计算`，如果在频繁的事件回调中做复杂计算，很有可能导致页面卡顿，不如将多次计算合并为一次计算，只在一个精确点做操作。
  
  这些需求都可以通过函数防抖动来实现。
  
  ::: tip 共同点
  防抖和节流都是防止函数多次调用 
  :::
  
  ::: tip 区别
  情况：假设一个用户一直触发这个函数，比如：100次/s，且每次触发函数的间隔小于wait 比如1s  
  防抖：只会调用一次  
  节流：会每隔一定时间（参数wait，如1s）调用函数
  :::
  
  Mini版的防抖理解一下防抖的实现：
  
  ```js
  // func是用户传入需要防抖的函数
  // wait是等待时间
  const debounce = (func, wait = 50) => {
    // 缓存一个定时器id
    let timer = 0
    // 这里返回的函数是每次用户实际调用的防抖函数
    // 如果已经设定过定时器了就清空上一次的定时器
    // 开始一个新的定时器，延迟执行用户传入的方法
    return function(...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
  }
  // 不难看出如果用户调用该函数的间隔小于wait的情况下，上一次的时间还未到就被清除了，并不会执行函数
  ```
  这是一个简单版的防抖，但是有缺陷，这个防抖只能在最后调用。一般的防抖会有immediate选项，表示是否立即调用。
  
  下面我们来实现一个带有立即执行选项的防抖函数
  
  ```js
  // 这个是用来获取当前时间戳的
  function now() {
    return +new Date()
  }
  /**
   * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
   *
   * @param  {function} func        回调函数
   * @param  {number}   wait        表示时间窗口的间隔
   * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
   * @return {function}             返回客户调用函数
   */
  function debounce (func, wait = 50, immediate = true) {
    let timer, context, args
    
    // 延迟执行函数
    const later = () => setTimeout(() => {
      // 延迟函数执行完毕，清空缓存的定时器序号
      timer = null
      // 延迟执行的情况下，函数会在延迟函数中执行
      // 使用到之前缓存的参数和上下文
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait)
  
    // 这里返回的函数是每次实际调用的函数
    return function(...params) {
      // 如果没有创建延迟执行函数（later），就创建一个
      if (!timer) {
        timer = later()
        // 如果是立即执行，调用函数
        // 否则缓存参数和调用上下文
        if (immediate) {
          func.apply(this, params)
        } else {
          context = this
          args = params
        }
      // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
      // 这样做延迟函数会重新计时
      } else {
        clearTimeout(timer)
        timer = later()
      }
    }
  }
  ```
  
### 节流
  
  防抖和节流本质是不一样的。  
  防抖是将`多次执行变为最后一次执行`。  
  节流是将`多次执行变成每隔一段时间执行`。
  
  ```js
  /**
   * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
   *
   * @param  {function}   func      回调函数
   * @param  {number}     wait      表示时间窗口的间隔
   * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
   *                                如果想忽略结尾函数的调用，传入{trailing: false}
   *                                两者不能共存，否则函数不能执行
   * @return {function}             返回客户调用函数   
   */
  _.throttle = function(func, wait, options) {
      var context, args, result;
      var timeout = null;
      // 之前的时间戳
      var previous = 0;
      // 如果 options 没传则设为空对象
      if (!options) options = {};
      // 定时器回调函数
      var later = function() {
        // 如果设置了 leading，就将 previous 设为 0
        // 用于下面函数的第一个 if 判断
        previous = options.leading === false ? 0 : _.now();
        // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function() {
        // 获得当前时间戳
        var now = _.now();
        // 首次进入前者肯定为 true
  	  // 如果需要第一次不执行函数
  	  // 就将上次时间戳设为当前的
        // 这样在接下来计算 remaining 的值时会大于0
        if (!previous && options.leading === false) previous = now;
        // 计算剩余时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 如果当前调用已经大于上次调用时间 + wait
        // 或者用户手动调了时间
   	  // 如果设置了 trailing，只会进入这个条件
  	  // 如果没有设置 leading，那么第一次会进入这个条件
  	  // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
  	  // 其实还是会进入的，因为定时器的延时
  	  // 并不是准确的时间，很可能你设置了2秒
  	  // 但是他需要2.2秒才触发，这时候就会进入这个条件
        if (remaining <= 0 || remaining > wait) {
          // 如果存在定时器就清理掉否则会调用二次回调
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
          // 判断是否设置了定时器和 trailing
  	    // 没有的话就开启一个定时器
          // 并且不能不能同时设置 leading 和 trailing
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    };
  ```