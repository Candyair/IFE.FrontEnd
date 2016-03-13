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
				status.innerHTML="&#xe61d;"
				audio.play();
				return;
			}	
		}
	}
	playMusic();
	
	var stroyboard = document.getElementById('Stroyboard');
	stroyboard.addEventListener("mousemove",function(){
		e = event||window.event;
		var offsetX = -(e.clientX/100).toFixed(10);
		var offsetY = -(e.clientY/10).toFixed(10);
		this.style.webkitTransform =  'translate3d('+offsetX+'%,'+offsetY+'px,0)';
	},false);;

















}