window.onload = init;
var container = document.getElementById('container');
var Textarea = document.getElementById('command');
var block = document.getElementById('block');
var status = 0;
var curStatus = 0;
var deg = 0;
var timer = null;
var queue = [];

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

	//  方块随机位置
	block.style.left = Math.ceil(Math.random()*9)*30+"px";
	block.style.top = Math.ceil(Math.random()*9)*30+"px";
	block.style.transform = "rotateZ(0deg)";

	//  textarea有缓存时显示行数
	Textarea.onkeydown();
}

//  执行命令
var exportCommand = function(){
	var value = document.getElementById('command').value;
	var vArray = value.split('\n');

	for(var i=0;i<vArray.length;i++){
		if(/\d+/.test(vArray[i])){
			for(var j=0;j<+vArray[i].match(/\d+/);j++){
				exportIt(vArray[i].replace(/\s+\d+\s*/g,''));
			}
		}
		else {
			exportIt(vArray[i]);
		}
	}
}

//  清除命令
var resetCommand = function(){
	document.getElementById('command').value = '';

	var lineNumber =  document.getElementsByClassName('lineNumber');
	for(var i=0;i<lineNumber.length-1;i++){
		lineNumber[i].style.backgroundColor = '#999999';
	}
}

//  进入执行队列
function exportIt(value){
	if(value){
		queue.push(value);
	}
	if(timer){
		return false;
	} else {
		return timer = setTimeout(function(){
			clearTimeout(timer);
			timer = null;
			var val = queue.shift();
			switch(val){
				case "GO": command.exportGo(); break;
				case "TRA LEF": command.exportLeft(); break;
				case "TRA RIG": command.exportRight(); break;
				case "TRA TOP": command.exportTop(); break;
				case "TRA BOT": command.exportBottom(); break;
				case "MOV LEF": command.exportMovLeft(); break;
				case "MOV TOP": command.exportMovTop(); break;
				case "MOV RIG": command.exportMovRight(); break;
				case "MOV BOT": command.exportMovBottom(); break;
				default: errorCM(val); queue.length=0; break;   //  出错中止执行
			}
			if(queue.length>0){
				exportIt();
			}
		},400);
	}
}

//  错误命令处理
var errorCM = function(val){
	var value = document.getElementById('command').value;
	var lineNumber =  document.getElementsByClassName('lineNumber');
	var vArray = value.split('\n');

	for(var i=0;i<vArray.length;i++){
		if(val == vArray[i].replace(/\s+\d+\s*/g,'')){
			lineNumber[i].style.backgroundColor = "red";
		}
	}
}

/*-----------------------------------textarea行数-----------------------------------------*/

Textarea.onkeydown = function(){
	setTimeout(function(){
		var command = document.getElementById('command');
		var value = command.value;
		value.match(/\n/g) ? updateLine(value.match(/\n/g).length+1) : updateLine(1);
		syncScroll();
	},0);
}

//  行数更新
function updateLine(count){
	var command = document.getElementById('command');
	var rows = document.getElementsByClassName('command-rows')[0];
	rows.innerHTML = '';
	for(var i=1;i<=count;i++){
		var li = document.createElement('LI');
		var txt = document.createTextNode(i);
		li.appendChild(txt);
		li.className = "lineNumber";
		li.style.marginTop = "0px";
		rows.appendChild(li);
	}
}

//  滚动时行数条与textarea同步
function syncScroll(){
	var command = document.getElementById('command');
	var rows = document.getElementsByClassName('command-rows')[0];
	var lineNumber =  document.getElementsByClassName('lineNumber');

	lineNumber[0].style.marginTop = -command.scrollTop + "px";
}

Textarea.onscroll = syncScroll;