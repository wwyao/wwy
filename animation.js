/*
*匀速运动、匀加速运动、匀减速运动）
*ele：元素(object)
*target:目标距离(number)
*direction：运动的方向，取值：'v','h'（默认）(string)
*velocity：运动速度(number)
*mode:normal(匀速,默认)、up(匀加速)、down（匀减速）(string)
*func:回调函数
*/
function uniformMove(obj,target,mode,velocity,direction,func){
	direction = direction || 'h';
	mode = mode || 'normal';
	velocity = velocity || 20;
	clearInterval(obj.timeId);
	obj.timeId = setInterval(function(){
		var offset = (direction === 'v')?obj.offsetTop:obj.offsetLeft;
		var dir = (direction === 'v')?'top':'left';
		var speed = target > offset?velocity:-velocity;
		if(offset >= target) {
				clearInterval(obj.timeId);
				obj.style[dir] = target + "px";
				if(func){
					func();
				}
			}else {
				obj.style[dir] = offset + speed + "px";
			}
		//a速度变化量
		var a = velocity/(target/velocity);
		if(mode === 'up') {
			velocity += a;
		}else if(mode === 'down') {
			
			velocity -= a;
		}
	},20);
}


/*
*缓冲运动
*ele：元素
*target:目标距离
*direction：运动的方向，取值：'v','h'（默认）(string)
*velocity：运动速度，值越小速度越快，值越大速度越慢
*func:回调函数
*/
function bufferMove(obj,target,direction,velocity,func){
	direction = direction || 'h';
	clearInterval(obj.timeId);
	var speed;
	obj.timeId = setInterval(function(){
		var offset = (direction === 'v')?obj.offsetTop:obj.offsetLeft;
		var dir = (direction === 'v')?'top':'left';
		speed = (target - offset)/velocity;
		speed = speed > 0?Math.ceil(speed):Math.floor(speed);
		if(offset >= target) {
			clearInterval(obj.timeId);
			obj.style[dir] = target + "px";
			// console.log("buffer:"+obj.offsetLeft);
			if(func){
				func();
			}
		}else {
			obj.style[dir] = offset + speed + "px";
		}	
	},20);
}




/*
*属性变化过程的动画
*obj：目标元素
*target：属性的目标值
*att：要改变的属性名(string)
*func:回调函数
*/
function attributeAnim(obj,json,velocity,func) {
	clearInterval(obj.timeId);
	obj.timeId = setInterval(function(){
		var isStop = true;
		for(var att in json){
			var start = (att === 'opacity')?parseInt(parseFloat(getStyle(obj,att))*100):parseInt(getStyle(obj,att));
			var speed = (json[att] - start)/7
			speed = speed > 0?Math.ceil(speed):Math.floor(speed);
			if(start != json[att]) {
				isStop = false;
			} 
			obj.style[att]  = (att === 'opacity')?(start + speed)/100:(start + speed) + "px";
		}	
		if(isStop){
			clearInterval(obj.timeId);
			if(func){
				func();
			}
		}
	},velocity);
}

/*
*弹性运动
*obj:目标元素
*att:要改变的属性名(string)
*target:目标距离
*velocity:变化速度，值越小越快，越大越慢
*/
function flexMove(obj,att,target,velocity) {
	clearInterval(obj.timeId);
	var speed = 0;
	obj.timeId = setInterval(function(){
		speed += (target - parseInt(getStyle(obj,att)))/8;
		//摩擦系数一般选0.7或0.5
		speed *= 0.7;
		if(Math.abs(speed) < 1 && Math.abs(target - parseInt(getStyle(obj,att))) < 1) {
			clearInterval(obj.timeId);
			obj.style[att] = target + 'px';
		}else{
			obj.style[att] = parseInt(getStyle(obj,att)) + speed + 'px';
		}
	},velocity);
}
/*
*碰撞及重力
*obj：目标元素
*parentObj：obj的父级
*speedX：x轴的变化速度
*speedY：y轴的变化速度
*isGravity:是否添加重力，true有重力，false没有重力
*/
function knockMove(obj,parentObj,speedX,speedY,isGravity){
	clearInterval(obj.timeId);
	var w =  parentObj.clientWidth - obj.offsetWidth;
	var h =  parentObj.clientHeight - obj.offsetHeight;
	console.log(obj.style);
	speedX = speedX || 2;
	speedY = speedY || 3;

	obj.timeId = setInterval(function(){
		if(isGravity){
			speedY += 6;
		}
		var l = obj.offsetLeft + speedX;
		var t = obj.offsetTop + speedY;
		if(l <= 0){
			speedX *= -1;
			l = '0px';
		}else if(l >= w) {
			speedX *= -1;
			l = w;
		}
		if(t <= 0){
			speedY *= -1;
			t = '0px';
		}else if(t >= h) {
			speedY *= -1;
			t = h;
		}
		console.log(t,h);
		if(isGravity){
			// console.log(obj.offsetLeft,t);
			if(obj.offsetTop === t){
				clearInterval(obj.timeId);
			}
		}
		obj.style.left = l + 'px';
		obj.style.top = t + 'px';
	},30);
}
/*
*获取某元素的属性(该元素可以是外部，内部，内嵌)
*obj:目标元素
*att:要改变的属性名(string)
*/
function getStyle(obj,att) {
	if(obj.currentStyle){
		return obj.currentStyle[att];
	} else {
		return getComputedStyle(obj)[att];
	}
}

