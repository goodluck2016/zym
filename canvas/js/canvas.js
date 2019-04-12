window.onload = function(){
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.fillStyle= '#ccc';
	ctx.fillRect(0,0,300,150);

	canvas.onmousedown = function(e){
      canvas.onmousemove = function(e){
      	var x = e.clientX,
      	    y = e.clientY;
      	ctx.clearRect(x,y,30,30);
      }
	};

	canvas.onmouseup= function(e){
		canvas.onmousemove = null;
	};

	var gifts = ['一个亿','海景别墅','一等奖','二等奖','三等奖','1000元现金','谢谢惠顾'];
	var i = Math.floor(Math.random()*gifts.length);
	console.log(i);
	document.getElementByClassName('prize').innerHtml = gifts[i];
	// document.querySelector('.prize').innerText = gifts[i];
}