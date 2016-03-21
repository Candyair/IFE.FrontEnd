window.onload = init;
var container = document.getElementById('container');
var block = document.getElementById('block');
var status = 0;
var curStatus = 0;
var deg = 0;

//  命令对象
var command = {
	exportGo: function(){
		var d = parseInt((block.style.transform).match(/[-]*\d+/g)[0])
		switch(d%360) {
			case 0:
			case -0: {
				if(block.style.top==='30px'){return false} 
				block.style.top = (parseInt(block.style.top) - 30) +'px';
				break;
			}

			case 90:
			case -270: {
				if(block.style.left==='270px'){return false} 
				block.style.left = (parseInt(block.style.left) + 30) +'px';
				break;
			}

			case 180:
			case -180: {
				if(block.style.top==='300px'){return false} 
				block.style.top = (parseInt(block.style.top) + 30) +'px';
				break;
			}

			case 270:
			case -90: {
				if(block.style.left==='0px'){return false} 
				block.style.left = (parseInt(block.style.left) - 30) +'px';
				break;
			}
		}
	},

	exportLeft: function(){
		setDirection(-90);
	},

	exportRight: function(){
		setDirection(90);
	},

	exportBack: function(){
		setDirection(180);
	},
}


// 初始化
function init(){
	var row = container.getElementsByTagName('li');
	//  行循环
	for(var i=0;i<10;i++){
		//  行内循环
		for(var j=0;j<10;j++){
 			var div = document.createElement('div');
 			row[i].appendChild(div);
		}
	}

	block.style.left = Math.ceil(Math.random()*9)*30+"px";
	block.style.top = Math.ceil(Math.random()*9)*30+"px";
	block.style.transform = "rotateZ(0deg)";
}

//  执行命令
var exportCommand = function(){
	var value = document.getElementById('command').value;
	switch(value){
		case "GO": return command.exportGo();
		case "TUN LEF": return command.exportLeft();
		case "TUN RIG": return command.exportRight();
		case "TUN BAC": return command.exportBack();
	}

	alert("你输入的命令有误!");
}

//  设置方向
function setDirection(deg){
	var oldDeg = parseInt((block.style.transform).match(/[-]*\d+/g)[0])
    block.style.transform = 'rotateZ('+(oldDeg+deg)+'deg)';
}

//  键盘控制方向
document.onkeypress = function(event){
	var e = event || window.event;
	switch(e.keyCode){
		case 37:
			return command.exportLeft();
			break;
		case 38:
			return command.exportGo();
			break;
		case 39:
			return command.exportRight();
			break;
		case 40:
			return command.exportBack();
			break;

	}
}