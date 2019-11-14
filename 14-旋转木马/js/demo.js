window.onload = function () {
  var config = [
    {
      width: 400,
      top: 20,
      left: 50,
      opacity: 0.2,
      "z-index": 2
    }, //0
    {
      width: 600,
      top: 70,
      left: 0,
      opacity: 0.8,
      "z-index": 3
    }, //1
    {
      width: 800,
      top: 120,
      left: 200,
      opacity: 1,
      "z-index": 4
    }, //2
    {
      width: 600,
      top: 70,
      left: 600,
      opacity: 0.8,
      "z-index": 3
    }, //3
    {
      width: 400,
      top: 20,
      left: 750,
      opacity: 0.2,
      "z-index": 2
    } //4
  ];

  //1.获取元素
  var wrap = document.getElementById("wrap"); //大盒子
  var lis = document.getElementById("slide").children[0].children; //所有的li标签
  var arrow = document.getElementById("arrow"); //左右箭头面板
  var arrLeft = document.getElementById("arrLeft"); //左箭头
  var arrRight = document.getElementById("arrRight"); //右箭头

  //声明一个变量,用来描述可以做动画
  var flag = true;

  //2.遍历获取到的li标签们 (做动画)
  setStyles();

  //把所有的li标签设置样式,封装成一个函数
  function setStyles() {
    for (var i = 0; i < lis.length; i++) {
      // 给每一个li标签设置样式(什么样的样式,上面config数组已经列出来了)
      animateSlow(lis[i], config[i], function () {
        // 在动画做完了的回调函数中, 把flag改成true
        flag = true;
      });
    }
  }

  //3.鼠标移入移出显示左右焦点
  wrap.onmouseover = function () {
    arrow.style.opacity = 1;
  };
  wrap.onmouseout = function () {
    arrow.style.opacity = 0;
  }

  //4.右焦点设置点击事件.
  arrRight.onclick = function () {
    if (flag == true) {
      // 操作config这个数组, 把尾巴删掉添加到头部
      config.unshift(config.pop());
      // 给所有的li标签用新的样式 赋值
      setStyles();

      // 正在做动画的时候,就不要让下一个开始
      flag = false;
    }
  }

  //5.左焦点设置点击事件.
  arrLeft.onclick = function () {
    if (flag == true) {
      // 操作config这个数组, 把头删掉添加到尾部
      config.push(config.shift());
      // 给所以的li标签用新的样式 赋值
      setStyles();

      // 正在做动画的时候， 就不要让下一个开始
      flag = false;
    }
  };
};
