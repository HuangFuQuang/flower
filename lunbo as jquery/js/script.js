$(document).ready(function(){
   var $imglis=$(".main-slider .main-slider-imglist .slider-list li");
   $imglis.children("a").each(function(i,obj){
   	
   	$(obj).css("background", "url('img/lunbo"+(i+1)+".jpg') no-repeat");
   });
   
//自动轮播函数
//第一步判断当前的下标,第二步，让当前下标隐藏，下一个显示 
   var curIndex=0;//当前初始值是0，自动播放设置是0，但点击等操作不行哦，要动态判断他的当前值
   var nextIndex;
   var i=setTimeout(scroll, 2000);//这种触发方式函数是可以的,先延迟启动一次
   function scroll(){
	nextIndex=curIndex+1;
    if(nextIndex>=$imglis.length){
   	nextIndex=0;
   }
    //启动切换函数
    toggle();
   i=setTimeout(scroll, 2000);

}

//添加左右两个按钮事件
var imglength=$imglis.length;//数组长度
  $(".btn").on({
  	click:function(e){
       e.preventDefault();//阻止浏览器默认行为
       // 判断手势确定下标以及下一个下标      
          clearTimeout(i);
              if ($(this).hasClass("left-btn")) {
                    nextIndex=curIndex-1;
                    if(nextIndex<0){
                        nextIndex=imglength-1;
                    }
                 }else{
                    nextIndex=curIndex+1;
                    if(nextIndex>=imglength){
                        nextIndex=0;
                    }
                 }
                 toggle();
           i=setTimeout(scroll, 2000);
  	}
  })
//切换图片的函数可以一次函数多个对象使用
  function toggle(){
        $imglis.eq(curIndex).fadeOut(300,function(){
        $imglis.eq(nextIndex).fadeIn(300);
   });
  	    //小圆点一起动起来！
  	    $(".wrapper-items").eq(curIndex).removeClass("select").end().eq(nextIndex).addClass("select");
        curIndex=nextIndex;
  };

  //底部小圆点栏居中
  $(".wrapper").css("margin-left",0 - $(".wrapper").width()/2);

  //底部小圆点点击事件
  $(".wrapper-items").on({
  	mouseenter:function(){
  		clearTimeout(i);
  		nextIndex=$(this).index();
  		toggle();
  	},
  	mouseleave:function(){
  		i=setTimeout(scroll, 2000);
  	}
  });

  //给图片加一个鼠标事件
  $imglis.on({
  	mouseenter:function(e){
  		e.stopPropagation();
  		clearTimeout(i);
  	},
  	mouseleave:function(e){
  		e.stopPropagation();
  		clearTimeout(i);
  		i=setTimeout(scroll, 2000);
  	},
  })
})
