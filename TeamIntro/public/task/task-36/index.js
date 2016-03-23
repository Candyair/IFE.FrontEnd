window.onload = init;
var container = document.getElementById('container');
var Textarea = document.getElementById('command');
var block = document.getElementById('block');
var status = 0;
var curStatus = 0;
var deg = 0;
var timer = null;
var queue = [];
var walls = [];

//  命令对象
var command = {
	//  有num参数时为偏移，否则为向当前方向前进
	exportGo: function(num){
		var deg = parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
		var dir = 0;
		var coord = getBlockIndex();
		if(num || num===0){
			dir = num;
		}
		else {
			dir = (deg%360);
		}
		// console.log(walls)
		// console.log(coord)
		switch(dir) {
			case 0:
			case -0: {
				if(block.style.top==='30px' || walls.indexOf(coord-10)>=0){return false} 
				block.style.top = (parseInt(block.style.top) - 30) +'px';
				break;
			}

			case 90:
			case -270: {
				if(block.style.left==='270px' || walls.indexOf(coord+1)>=0){return false} 
				block.style.left = (parseInt(block.style.left) + 30) +'px';
				break;
			}

			case 180:
			case -180: {
				if(block.style.top==='300px' || walls.indexOf(coord+10)>=0){return false} 
				block.style.top = (parseInt(block.style.top) + 30) +'px';
				break;
			}

			case 270:
			case -90: {
				if(block.style.left==='0px' || walls.indexOf(coord-1)>=0){return false} 
				block.style.left = (parseInt(block.style.left) - 30) +'px';
				break;
			}
		}
	},
	handleWall: function(color){
		var deg = parseInt((block.style.transform).match(/[-]*\d+/g)[0]);
		var allDiv = container.getElementsByTagName('DIV');
		var dir = (deg%360);
		var coord = getBlockIndex();

		switch(dir) {
			case 0:
			case -0: {
				if(block.style.top==='30px'){return console.log("超过边界墙！")}
				coord = coord - 10;
				break;
			}

			case 90:
			case -270: {
				if(block.style.left==='270px'){return console.log("超过边界墙！")} 
				coord = coord + 1;
				break;
			}

			case 180:
			case -180: {
				if(block.style.top==='300px'){return console.log("超过边界墙！")} 
				coord = coord + 10;
				break;
			}

			case 270:
			case -90: {
				if(block.style.left==='0px'){return console.log("超过边界墙！")} 
				coord = coord - 1;
				break;
			}
		}

		//  判断是上色还是修墙
		if(!color){
			//  判断墙是否已存在
			if(walls.indexOf(coord)>=0){
				return console.log("面前已有墙!");
			}
			allDiv[coord].classList.add('wall');
			walls.push(coord);
		}
		else {
			if(walls.indexOf(coord)===-1){
				return console.log("没有墙可粉刷");
			}
			allDiv[coord].style.backgroundColor = color;
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
	},

	exportXq: function(key){
		command.handleWall(key);
	},

	randomXq: function(){
		var allDiv = container.getElementsByTagName('DIV');
		var coord = getBlockIndex();
		var ran = Math.floor(Math.random()*100);
		if(ran===coord || walls.indexOf(ran)>=0){
			return command.randomXq();
		}

		allDiv[ran].classList.add('wall');
		walls.push(ran);
	},

	moveTo: function(key){
		if(walls.indexOf(((key[0]-1) + (key[1]-1)*10))>=0){
			return console.log("错误：移动位置有墙");
		}
		var pos = {};
		var coord = getBlockIndex();
		var oldpos = {}
		pos.x = coord%10 + 1;
		pos.y = (coord - coord%10)/10 + 1;

		//  得到起始点到终点的距离G
		var G = getDistance(pos,key);

		return (function move(pos,oldpos){
			if(pos.x == key[0] && pos.y == key[1]){return false;}
			//  得到周围四个方向可移动点dir
			var dir = [];
			dir[0] = getDir(pos,0,oldpos);
			dir[1] = getDir(pos,1,oldpos);
			dir[2] = getDir(pos,2,oldpos);
			dir[3] = getDir(pos,3,oldpos);

			var TS = [];
			//  得到当前四个点到终点的距离，存入暂存TS
			for(var i=0;i<4;i++){
				TS.push(getDistance(dir[i],key));
			}

			//  得到最小的 F (起始点到结束点距离 + 当前点到结束点距离)
			var F = 0,
				index = 0,
				min = 0;
			for(var k=0;k<4;k++){
				//  判断是否为NAN（不可移动点）
				if(TS[k]!==TS[k]){
					continue;
				}
				//  首个F值
				if(min === 0){min = G + TS[k];index = k; continue;}
				F = G + TS[k];

        		if(min > F){
            		min = F;
           			index = k;
           		}
       		}

       		if(min!==min || min===0){return console.log("出不去啦!")}

       		//  保存移动前的点
       		var oldpos = {};
       		for(var c in pos){
       			oldpos[c] = pos[c];
       		}

       		switch(index){
       			case 0: pos.y = pos.y - 1; exportIt("MOV TOP");break;
       			case 1: pos.y = pos.y + 1; exportIt("MOV BOT");break;
       			case 2: pos.x = pos.x - 1; exportIt("MOV LEF");break;
       			case 3: pos.x = pos.x + 1; exportIt("MOV RIG");break;
       		}

       		arguments.callee(pos,oldpos)
		})(pos,oldpos)
	},
}

//  得到两点的距离
function getDistance(obj,key){
	return Math.abs(obj.x - key[0]) + Math.abs(obj.y - key[1]);
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
	block.style.left = Math.floor(Math.random()*10)*30+"px";
	block.style.top = Math.ceil(Math.random()*10)*30+"px";
	block.style.transform = "rotateZ(0deg)";

	//  textarea有缓存时显示行数
	Textarea.onkeydown();
}

//  执行命令
var exportCommand = function(){
	var value = document.getElementById('command').value;
	var vArray = value.split('\n');

	for(var i=0;i<vArray.length;i++){
		//  判断是否包含数字 (且数字小于10)
		if(/\d+/.test(vArray[i]) && vArray[i].match(/\d+/) && vArray[i].match(/\d+/) <= 10){
			//  判断是否包含"BULD"或","
			if(/BIUD/.test(vArray[i]) || /,/.test(vArray[i])){
				exportIt(vArray[i]);
			}
			else {
				for(var j=0;j<+vArray[i].match(/\d+/);j++){
					exportIt(vArray[i].replace(/\s+\d+\s*/g,''));
				}
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
	// console.log(value)
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

			if(/BIUD/.test(val)){
				var key = val.split(" ")[1];
				val = "BIUD"
			}
			if(/MOV TO/.test(val) && val.match(/\d+/g) && val.match(/\d+/g).length === 2){
				var key = val.match(/\d+/g);
				val = "MOV TO";
			}

			// console.log(val + "    <<");
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
				case "BIUD": command.handleWall(key); break;
				case "MOV TO": if(!key){errorCM(val); queue.length=0; break;} command.moveTo(key); break
				default: errorCM(val); queue.length=0; break;   //  出错中止执行
			}
			if(queue.length>0){
				exportIt();
			}
		},200);
	}
}

//  得到方块位置索引
function getBlockIndex(){
	var x = (parseInt(block.style.top))/30-1;
	var y = (parseInt(block.style.left))/30;
	return x*10+y;
}

//  判断该方向能否通过
function isPass(coord,dir){
	switch(dir) {
		case "TOP": {
			if(coord<=9) {return false;}
			coord = coord - 10;
			break;
		}
		case "BOT": {
			if(coord>=90) {return false;}
			coord = coord + 10;
			break;
		}
		case "LEF": {
			if(coord%10===0) {return false;}
			coord = coord - 1 ;
			break;
		}
		case "RIG": {
			if(coord%10===9) {return false;}
			coord = coord + 1 ;
			break;
		}
	}
	//  判断墙是否已存在
	if(walls.indexOf(coord)>=0){
		return false;
	}
	return true;
}

//  得到四个方向的可以移动点( 不可移动: 有墙, 边界墙, 上一个移动点)
function getDir(pos,dir,oldpos){
	var obj = {};
	for(var i in pos){
		obj[i] = pos[i];
	}
	switch(dir) {
		case 0: {
			if(obj.y===1 || obj.y-1==oldpos.y) {return false;}
			obj.y = obj.y - 1;
			break;
		}
		case 1: {
			if(obj.y===10 || obj.y+1==oldpos.y) {return false;}
			obj.y = obj.y + 1;
			break;
		}
		case 2: {
			if(obj.x===1 || obj.x-1==oldpos.x) {return false;}
			obj.x = obj.x - 1 ;
			break;
		}
		case 3: {
			if(obj.x===10 || obj.x+1==oldpos.x) {return false;}
			obj.x = obj.x + 1 ;
			break;
		}
	}
	//  判断墙是否已存在
	if(walls.indexOf(((obj.x-1) + (obj.y-1)*10))>=0){
		return false;
	}
	return obj;
}

//  错误命令处理
var errorCM = function(val){
	var value = document.getElementById('command').value;
	var lineNumber =  document.getElementsByClassName('lineNumber');
	var vArray = value.split('\n');

	for(var i=0;i<vArray.length;i++){
		console.log(val)
		console.log(vArray[i])
		if(vArray[i].indexOf(val)>=0){
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