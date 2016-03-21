window.onload = init;
var container = document.getElementById('container');
var status = 0;

//  命令对象
var command = {
	exportGo: function(){
		var curDiv = container.getElementsByClassName('cur')[0];
		var allDiv = container.getElementsByTagName('div');
		if(status===0){status += 4;}
		var curStatus = status%4;
		var index = getIndex();
		switch(curStatus) {
			case 0: {
				if(index-10<0){return false;}
				allDiv[(index-10)].classList.add('cur');
				break;
			}

			case 1: {
				if(index%10===9){return false;}
				allDiv[(index+1)].classList.add('cur');
				break;
			}

			case 2: {
				if(index+10>100){return false;}
				allDiv[(index+10)].classList.add('cur');
				break;
			}

			case 3: {
				if(index%10===0){return false;}
				allDiv[(index-1)].classList.add('cur');
				break;
			}
		}
		curDiv.classList.remove('cur');

		var newDiv = container.getElementsByClassName('cur')[0];
		setDirection(curStatus,newDiv);
	},

	exportLeft: function(){
		var curDiv = container.getElementsByClassName('cur')[0];
		if(status<=0){ status += 4;}
		var curStatus = (--status)%4;
		setDirection(curStatus,curDiv);
	},

	exportRight: function(){
		var curDiv = container.getElementsByClassName('cur')[0];
		if(status<=0){ status += 4;}
		var curStatus = (++status)%4;
		setDirection(curStatus,curDiv);
	},

	exportBack: function(){
		var curDiv = container.getElementsByClassName('cur')[0];
		if(status<=0){ status += 4;}
		status = parseInt(status) + 2;
		var curStatus = (status)%4;
		setDirection(curStatus,curDiv);
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

	var random = Math.ceil(Math.random()*100);

	container.getElementsByTagName('div')[random].classList.add('cur');
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

//  得到当前方块位置
function getIndex(){
	for(var i=0;i<100;i++){
		if(container.getElementsByTagName('div')[i].classList.contains('cur')){
			return i;
		}
	}
}

//  设置方向
function setDirection(curStatus,curDiv){
	switch(curStatus){
    	case 0: 
    		curDiv.style.borderBottomWidth = '0px';
    		curDiv.style.borderRightWidth = '0px';
    		curDiv.style.borderLeftWidth = "0px";
    		curDiv.style.borderTopWidth = "5px";
    		break;
		case 1: 
		    curDiv.style.borderTopWidth = '0px';
    		curDiv.style.borderLeftWidth = "0px";
			curDiv.style.borderBottomWidth = '0px';
			curDiv.style.borderRightWidth = "5px";
			break;
		case 2: 
    		curDiv.style.borderLeftWidth = "0px";
			curDiv.style.borderTopWidth = '0px';
			curDiv.style.borderRightWidth = "0px";
			curDiv.style.borderBottomWidth = "5px";
			break;
		case 3: 
			curDiv.style.borderRightWidth = '0px';
			curDiv.style.borderBottomWidth = "0px";
			curDiv.style.borderTopWidth = '0px';
			curDiv.style.borderLeftWidth = "5px";
		break;
    }
}

//  键盘控制方向
window.onkeypress = function(event){
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