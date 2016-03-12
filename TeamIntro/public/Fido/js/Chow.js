window.onload=function(){
	
	function playMusic(){
		var audio = document.getElementById('my-fav-music');
		var status = document.getElementById('status');
		status.onclick =function(){
			var temp = status.attributes.status.value.toString();
			if(temp=="true"){
				status.attributes.status.value="false";
				status.innerHTML="&#xe632;"
				audio.pause();
				return;
			}
			else if(temp=="false"){		
				status.attributes.status.value="true";
				status.innerHTML="&#xe7fa;"
				audio.play();
				return;
			}	
		}
	}
	playMusic();

	function Bubble(initX,initY,initSize){
		var offsetX	=	Math.random();
		var offsetY	=	Math.random();
		var origin	= {
			X:initX,
			Y:initY,
			size:initSize,
		};
		this.translate = function(){
		this.origin.X+=offsetX+'px';
		this.origin.Y+=offsetY+'px';
	}
}
		var bubble = new Bubble(5,5,5);
		var stroyboard = document.getElementById('Stroyboard');
		stroyboard.addEventListener("mousemove",function(){
			e = event||window.event;
			var offsetX = -(e.clientX/100).toFixed(10);
			var offsetY = -(e.clientY/10).toFixed(10);
			this.style.webkitTransform =  'translate3d('+offsetX+'%,'+offsetY+'px,0)';
		},false);;
		
		















}