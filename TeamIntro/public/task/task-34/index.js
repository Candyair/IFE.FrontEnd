window.onload = init;
var container = document.getElementById('container');
var block = document.getElementById('block');
var status = 0;
var curStatus = 0;
var deg = 0;

//  命令对象
var command = {
	exportGo: function(num){
		var d = parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
		if(num || num===0){
			a = num;
		}
		else {
			a = (d%360);
		}
		switch(a) {
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
		command.exportGo(270);
	},

	exportRight: function(){
		command.exportGo(90);
	},

	exportTop: function(){
		command.exportGo(0);
	},

	exportBottom: function(){
		command.exportGo(180);
	},

	exportMovLeft: function(){
		var d = parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
		d = Math.floor(d/360)*360;
		block.style.transform = 'rotateZ('+(d+270)+'deg)';
		command.exportGo();
	},

	exportMovTop: function(){
		var d = parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
		d = Math.floor(d/360)*360;
		block.style.transform = 'rotateZ('+d+'deg)';
		command.exportGo();
	},

	exportMovRight: function(){
		var d = parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
		d = Math.floor(d/360)*360;
		block.style.transform = 'rotateZ('+(d+90)+'deg)';
		command.exportGo();
	},

	exportMovBottom: function(){
		var d = parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
		d = Math.floor(d/360)*360;
		block.style.transform = 'rotateZ('+(d+180)+'deg)';
		command.exportGo();
	}
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
		case "TRA LEF": return command.exportLeft();
		case "TRA RIG": return command.exportRight();
		case "TRA TOP": return command.exportTop();
		case "TRA BOT": return command.exportBottom();
		case "MOV LEF": return command.exportMovLeft();
		case "MOV TOP": return command.exportMovTop();
		case "MOV RIG": return command.exportMovRight();
		case "MOV BOT": return command.exportMovBottom();
	}

	alert("你输入的命令有误!");
}

//  设置方向
function setDirection(deg){
	var oldDeg = parseInt((block.style.transform).match(/[-]*\d+/g)[0])
    block.style.transform = 'rotateZ('+(oldDeg+deg)+'deg)';
}

//  键盘控制方向
document.onkeydown = function(event){
	var e = event || window.event;
	switch(e.keyCode){
		case 37:
			return command.exportLeft();
			break;
		case 38:
			return command.exportTop();
			break;
		case 39:
			return command.exportRight();
			break;
		case 40:
			return command.exportBottom();
			break;
		case 87:
			return command.exportMovTop();
			break;
		case 65:
			return command.exportMovLeft();
			break;
		case 68:
			return command.exportMovRight();
			break;
		case 83:
			return command.exportMovBottom();
			break;
	}
}