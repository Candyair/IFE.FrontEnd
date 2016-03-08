window.onload=function(){
	var audio = document.getElementById('my-fav-music');
	var status = document.getElementById('status');
	var musicbox = document.getElementById('musicbox')
	status.onclick =function(){
			if(status.attributes.status.value.toString()=="true"){
			status.attributes.status.value=false;
			status.innerHTML="&#xe632;"
			audio.pause();
			return;
			}
			else if(status.attributes.status.value.toString()=="false"){		
			status.attributes.status.value=true;
			status.innerHTML="&#xe7fa;"
			audio.play();
			return;
		}


	
}





}