var timeId = null;
/*
*缓冲运动
*ele：元素
*target:目标距离
*direction：运动的方向，取值：'v','h'（默认）
*velocity：运动速度，值越小速度越快，值越大速度越慢
*/
function bufferMove(ele,target,direction,velocity){
	direction = direction || 'h';
	clearInterval(timeId);
	var speed;
	timeId = setInterval(function(){
		if(direction === 'v') {
			speed = (target - ele.offsetTop)/velocity;
			speed = speed > 0?Math.ceil(speed):Math.floor(speed);
			if(ele.offsetTop === target) {
				clearInterval(timeId);
			}else {
				ele.style.top = ele.offsetTop + speed + "px";
			}
		} else{
			speed = (target - ele.offsetLeft)/velocity;
			speed = speed > 0?Math.ceil(speed):Math.floor(speed);
			if(ele.offsetLeft === target) {
				clearInterval(timeId);
			}else {
				ele.style.left = ele.offsetLeft + speed + "px";
			}
		}
		
	},20);
}
