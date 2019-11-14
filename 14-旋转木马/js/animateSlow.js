//------------------------------------
//添加多属性
//添加一个回调函数
//function animateSlow(ele,target,attr){
function animateSlow(ele, attrs, fn) {
  //attrs是一个对象,里面就包含多个键值对
  //  计时器做动画
  clearInterval(ele.timerId);
  //声明一个计时器
  ele.timerId = setInterval(function() {
    //假设这一次forin循环,所有的属性,都到达了目的地.
    var flag = true;

    //遍历出每一个要做动画的属性.
    for (var key in attrs) {
      if (key == "opacity") {
        //获取当前传入的要做动画的样式值
        var currentLeft = getStyle(ele, key) * 100; //透明度放大100倍来运算
        //设置一个步长
        //缓动动画步长不能写死,如果写死就是匀速动画
        //把目标位置减去当前位置, 值除以一个数
        var step = (attrs[key] * 100 - currentLeft) / 5;
        //如果算出来的步长是正数,就向上取整,如果算出来的步长是负数,就向下取整.
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //运动
        currentLeft += step;
        //赋值
        ele.style[key] = currentLeft / 100; //最后赋值的时候要缩小100倍.
        //判断,如果有一个属性没有到达目的地,就表示假设失败
        if (currentLeft != attrs[key] * 100) {
          flag = false;
        }

        // console.log(key + ":" + "步长:" + step + "-当前位置:" + currentLeft);

      } else if (key == "z-index") {
        //直接赋值
        ele.style[key] = parseInt(attrs[key]);

        // console.log(key + ":" + parseInt(attrs[key]));

      } else {
        //获取当前传入的要做动画的样式值
        var currentLeft = parseInt(getStyle(ele, key));
        //设置一个步长
        //缓动动画步长不能写死,如果写死就是匀速动画
        //把目标位置减去当前位置, 值除以一个数
        var step = (attrs[key] - currentLeft) / 10;
        //如果算出来的步长是正数,就向上取整,如果算出来的步长是负数,就向下取整.
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        //运动
        currentLeft += step;
        //赋值
        ele.style[key] = currentLeft + "px";
        //判断,如果有一个属性没有到达目的地,就表示假设失败
        if (currentLeft != attrs[key]) {
          flag = false;
        }

        // console.log(key + ":" + "步长:" + step + "-当前位置:" + currentLeft);
      }
    }

    //如果到了这里,flag的值还是true,说明假设成功.
    //那不就说明所有的属性都到达目的地了吗,那不就是要清空计时器了吗
    if (flag == true) {
      clearInterval(ele.timerId);
      //动画做完了,执行这个回调函数
      if (typeof fn == "function") {
        fn();
      }
    }
  }, 40);
}

//兼容处理
function getStyle(ele, attr) {
  //能力检测 :检测当前打开页面的浏览器支持不支持这个方法/属性
  if (ele.currentStyle) {
    //如果进到这里来了说是ie8和以前的
    //console.log('ie8');
    return ele.currentStyle[attr];
  } else {
    //如果进到这里来了,说明当前打开页面的浏览器是 谷歌和火狐等
    //console.log('谷歌');
    return window.getComputedStyle(ele, null)[attr];
  }
}
