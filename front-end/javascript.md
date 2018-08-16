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
