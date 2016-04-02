var Grid =  document.getElementById('Container');
var Box = document.getElementById('block');	
Box.deg=0;

var LEF = document.getElementById('LEF');
var RIG = document.getElementById('RIG');
var BAC = document.getElementById('BAC');

Grid.init =function(){
	Box.style.top = Math.floor(Math.random()*10)*30+'px';
	Box.style.left = Math.floor(Math.random()*10)*30+'px';
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j<10; j++) {
			var oDiv = document.createElement("div");
			Container.appendChild(oDiv);
			oDiv.style.top = 10 * i ; 
			oDiv.style.left = 10 * j ;
		}
	}
}
Command = {
	"GO":function(obj){
		var top = parseInt(obj.style.top);
		var left = parseInt(obj.style.left);
		Box.deg = Box.deg%360;
		if(Box.deg==0){
			if(top==0){return}
				obj.style.top  =top -30 +'px';
		}
		if(Box.deg==-90||Box.deg==270){
			if(left==0){return}
				obj.style.left  =left -30 +'px';
		}
		if(Box.deg==90||Box.deg ==-270){
			if(left==270){return}
				obj.style.left  =left +30 +'px';
		}
		if(Box.deg==180||Box.deg==-180){
			if(top==270){return}
				obj.style.top  = top +30 +'px';
		}
	},
	"LEF":function(obj){
		Box.deg-=90;		
		obj.style.transform = 'rotateZ('+Box.deg+'deg)';
	},
	"RIG":function(obj){
		Box.deg+=90;
		obj.style.transform = 'rotateZ('+Box.deg+'deg)';
	},
	"BAC":function(obj){
		Box.deg+=180;
		obj.style.transform = 'rotateZ('+Box.deg+'deg)';
	}

}
var excute =function (cmd,obj) {
	return Command[cmd](obj);
}



window.onload = function (argument) {	
	Grid.init();
	LEF.onclick = function (argument) {
		excute("LEF",Box);
	}
	RIG.onclick = function (argument) {
		excute("RIG",Box);
	}
	BAC.onclick = function (argument) {
		excute("BAC",Box);
	}
	GO.onclick = function (argument) {
		excute("GO",Box);
	}

}