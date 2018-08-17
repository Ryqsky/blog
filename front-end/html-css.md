# HTML / CSS

## HTML5 新特性

  - 语义化标签：header, footer, article
  - 媒介播放：`video`, `audio`
  - 新绘画：`canvas`, `svg`
  - 新表单元素：time, date, calendar, email
  - 新离线储存：localStorage, sessionStorage


## HTML 语义化

  - 对于用户，及时没加载css，文档结构不至于太乱
  - 对于开发者，结构更清晰，代码更容易维护
  - 对于搜索引擎，利于爬虫和SEO解析与收录


## CSS3

### 边框

  - `border-radius`
  - `box-shadow`
  - `border-image`
  
### 2D/3D 转换

  - `transform`
  - `transform-origin`: x y z;
  - `transform-style`
  - `perspective`
    - 该属性允许您改变 3D 元素查看 3D 元素的视图
    - 当为元素定义 perspective 属性时，其子元素会获得透视效果，而不是元素本身
    - perspective 属性只影响 3D 转换元素

### 过渡

  - `transition`: `property` `duration` `timing-function` `delay`;
  
### 动画

  - `@keyframes` （定义动画）
    ```css
    @keyframes mymove
    {
      0%   {top:0;}
      25%  {top:200px;}
      50%  {top:100px;}
      75%  {top:200px;}
      100% {top:0;}
    }
    ```
  - `animation` （为elm赋值动画）
    - `name`
    - `duration`
    - `timing-function`
    - `delay`
    - `iteration-count` （规定动画被播放的次数）
    - `direction` （规定动画是否在下一周期逆向地播放）
      - normal
      - alternate （动画应该轮流反向播放）
    - `play-state`
      - paused
      - running （默认）
    - `fill-mode` （属性规定动画在播放之前或之后，其动画效果是否可见）

### 用户界面

  - `box-sizing`
    - content-box
      - 宽度和高度分别应用到元素的内容框
      - 在宽度和高度之外绘制元素的内边距和边框
    - border-box
      - 从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度
      

## reflow / repaint

`repaint` 主要是针对某一个DOM元素进行的重绘

> 不涉及任何DOM元素的排版问题的变动为repaint，例如元素的color/text-align/text-decoration等等属性的变动。

`reflow` 则是回流，针对整个页面的重排

> 例如元素的任何涉及长、宽、行高、边框、display等style的修改。
