;
(function(w, d, undefined) {
	var unique,fadeFn,wFn,btn1Fn,btn2Fn;
	var Layer = function(txt, config, titleTxt) {
		this.txt = txt;
		this.config = config;
		this.titleTxt = titleTxt;
	}

	Layer.prototype = {
		init: function() {
			var that = this;
			this.warp = d.createElement('DIV'),
			this.fade = d.createElement('DIV'),
			this.model = d.createElement('DIV'),
			this.title = d.createElement('DIV'),
			this.content = d.createElement('DIV')
			this.footer = d.createElement('DIV'),
			this.confirmBtn = d.createElement("BUTTON"),
			this.closeBtn = d.createElement("BUTTON");

			this.warp.className = 'POP-wrap';
			this.fade.className = 'POP-fade';
			this.model.className = 'POP-model';
			this.title.className = 'POP-title';
			this.footer.className = 'POP-footer';
			this.content.className = 'POP-content';
			this.confirmBtn.className = 'POP-confirm';
			this.confirmBtn.innerHTML = '确认';
			this.closeBtn.className = 'POP-close';
			this.closeBtn.innerHTML = '取消';
			this.model.appendChild(this.title);
			this.model.appendChild(this.content);
			this.model.appendChild(this.footer);
			this.footer.appendChild(this.closeBtn);
			this.footer.appendChild(this.confirmBtn);
			this.warp.appendChild(this.fade);
			this.warp.appendChild(this.model);
			this.fade.addEventListener('click', fadeFn = function(){that.close(that)});
			w.addEventListener('keydown', wFn = function(event){
				var code = event.keyCode;
				if(code === 27 || code === 13){
					event.preventDefault();
					that.close(that);
				}
			})
			d.getElementsByTagName('BODY')[0].appendChild(this.warp);
		},
		alert: function() {
			var that = this;
			this.init();
			this.setTheme(this.config);
			this.content.innerHTML = this.txt;
			this.footer.removeChild(this.closeBtn);
			this.confirmBtn.addEventListener('click', btn2Fn = function(){that.close(that)});
		},
		confirm: function() {
			var that = this;
			this.init();
			this.setTheme(this.config);
			this.content.innerHTML = this.txt;
			this.closeBtn.addEventListener('click', btn1Fn = function(){that.close(that,false)});
			this.confirmBtn.addEventListener('click', btn2Fn = function(){that.close(that,true)});
		},
		prompt: function() {
			var that = this;
			this.init();
			this.setTheme(this.config);
			this.title.innerHTML = this.txt;
			this.input = d.createElement('INPUT');
			this.input.type = 'text';
			this.content.appendChild(this.input);
			this.closeBtn.addEventListener('click', btn1Fn = function(){that.close(that)});
			this.confirmBtn.addEventListener('click', btn2Fn = function(){that.close(that,that.input.value)});
		},
		close: function(that, msg) {
			d.getElementsByTagName('BODY')[0].removeChild(that.warp);
			this.fade.removeEventListener("click", fadeFn , false);
			w.removeEventListener("keydown", wFn , false);
			this.closeBtn.removeEventListener("click", btn1Fn , false);
			this.confirmBtn.removeEventListener("click", btn2Fn , false);
			unique = undefined;
			if(msg !== undefined){
				return msg;
			}
		},
		setTheme: function(type) {
			switch (type) {
				case "success":
					{
						this.model.style.backgroundColor = "#5CB85C";
						this.title.innerHTML = 'Success!';
						break;
					}
				case "error":
					{
						this.model.style.backgroundColor = "#E74C3C";
						this.title.innerHTML = 'Error!';
						break;
					}
				case "warning":
					{
						this.model.style.backgroundColor = "#F1C40F";
						this.title.innerHTML = 'Warning!';
						break;
					}
				default: 
					{
						this.model.style.backgroundColor = "#999";
						this.title.innerHTML = '弹出框';
						break;
					}
			}
			if(this.titleTxt){
				this.title.innerHTML = this.titleTxt;
			}
		}
	}
	//  插件入口对象
	var POP = {
		alert: function(txt, config, titleTxt) {
			var layer = this.single(txt, config, titleTxt);
			if(layer){
				layer.alert();
			}
		},
		confirm: function(txt, config, titleTxt) {
			var layer = this.single(txt, config, titleTxt);
			if(layer){
				layer.confirm();
			}
		},
		prompt: function(txt, config, titleTxt) {
			var layer = this.single(txt, config, titleTxt);
			if(layer){
				layer.prompt();
			}
		},
		single: (function() {
			return function getInstance(txt, config, titleTxt) {
				if (unique === undefined) {
					unique = new Layer(txt, config, titleTxt);
					return unique;
				}
				else {
					return false;
				}				
			}
		})()
	}

	window["POP"] = POP;
})(window, document)