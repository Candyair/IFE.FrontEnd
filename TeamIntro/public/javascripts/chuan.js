;(function(){
	var i=1;
	for(;i<=5;i++){
		var tar = document.getElementById('member'+i)
		addListener(tar,'click',function(){
			window.location.href = '/'
		})
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