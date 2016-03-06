;(function(){
	var i=1;
	for(;i<=5;i++){
		var tar = document.getElementById('member'+i)
		switch(i){
			case 1: 
				addListener(tar,'click',function(){
					window.location.href = '/SU';
				})
				break;
			case 2: 
				addListener(tar,'click',function(){
					window.location.href = '/WeiYu';
				})
				break;
			case 3: 
				addListener(tar,'click',function(){
					window.location.href = '/Cat';
				})
				break;
			case 4: 
				addListener(tar,'click',function(){
					window.location.href = '/Fido';
				})
				break;
			case 5: 
				addListener(tar,'click',function(){
					window.location.href = '/chuan';
				})
				break;
		}
			
	}
	function addListener(element, eventName, handler) {
	    if (element.addEventListener) {
	        element.addEventListener(eventName, handler, false);
	    }
	    else if (element.attachEvent) {
	        element.attachEvent('on' + eventName, handler);
	    }
	    else {
	        element['on' + eventName] = handler;
	    }
	}

	function removeListener(element, eventName, handler) {
	    if (element.addEventListener) {
	        element.removeEventListener(eventName, handler, false);
	    }
	    else if (element.detachEvent) {
	        element.detachEvent('on' + eventName, handler);
	    }
	    else {
	        element['on' + eventName] = null;
	    }
	}
})()