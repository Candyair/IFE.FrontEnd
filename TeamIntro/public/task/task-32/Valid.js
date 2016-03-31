;(function(w,d,undefined){
	var vAll = [];
	var Valid = function(container,config){
		var that = this;
		this.container = container;
		this.config = config;
		if(!config.messages){
			this.config.messages = {};
		}
		this.config.messages['default'] = config.messages['default'] ? config.messages['default'] : "输入不合法";
	};

	Valid.prototype = {
		constructor: Valid,

		//表单生成
		init: function(){
			var that = this;
			var config = that.config;

			that.group = d.createElement('DIV');
			that.group.className = "Valid-" + config.type;

			if(config.type === 'radio' || config.type === 'checkbox'){
				that.label = d.createElement("LABEL");
				that.label.innerHTML = config.label;
				that.group.appendChild(that.label);
				for(var i=0;i<config.selects.length;i++){
					that.elem = d.createElement(config.elem);
					that.elem.setAttribute("type",config.type);
					that.label = d.createElement("LABEL");
					that.label.innerHTML = config.selects[i];
					that.elem.setAttribute("name",config.name);
					that.group.appendChild(that.label);
					that.group.appendChild(that.elem);
				}
			}
			else {
				that.elem = d.createElement(config.elem);
				that.elem.setAttribute("type",config.type);
				that.label = d.createElement("LABEL");
				that.label.innerHTML = config.label;
				that.elem.setAttribute("name",config.name);
				that.group.appendChild(that.label);
				that.group.appendChild(that.elem);

				this.elem.addEventListener("blur",function(){
					that.validator(that)
				});	
			}		
		
			that.error = d.createElement('SPAN');
			that.group.appendChild(that.error);
			that.container.appendChild(that.group);	
		},

		//表单认证
		validator: function(data){
			var that = data;
			var value = that.elem.value;
			var rules = that.config.validator;
			var messages = that.config.messages;
			var isPass = true;
			for(var i in rules){
				switch(i){
					case "required": {
						if(rules[i]){
							if(that.config.type === 'radio' || that.config.type === 'checkbox'){
								var selects = document.getElementsByName(that.config.name);
								for(var k=0,rlen=selects.length;k<rlen;k++){
									if(selects[k].checked){
										return that.successMsg();
									}
								}
								isPass = false;
								break;
							}
							else if(value === ''){
								isPass = false;
							}
						}
						break;
					}
					case "minHeight": {
						var minLen = rules[i];
						var len = getLength(value);
						if(len < minLen){
							isPass = false;
						}
						break;
					}
					case "maxHeight": {
						var maxLen = rules[i];
						var len = getLength(value);
						if(len > maxLen){
							isPass = false;
						}
						break;
					}
					case "email": {
						var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
						if(!reg.test(value)){
							isPass = false;
						}
					}
				}
				if(that.config.diy){
					var diyRules = that.config.diy;
					if(diyRules[i]){
						var reg = diyRules[i];
							if(!reg.test(value)){
							isPass = false;
						}
					}
				}
				if(!isPass){break;}
			}
			if(isPass){
				return that.successMsg();
			}
			else {
				if(messages[i]){
					return that.errorMsg(messages[i]);
				}
				else {
					return that.errorMsg(messages['default']);
				}
			}
		},

		//验证通过
		successMsg : function(){
			var that = this;
			if(that.config.type !== 'radio' && that.config.type !== 'checkbox'){
				that.elem.style.borderColor = "#27AE60";		
			}
			that.error.innerHTML = '';
			return true;
		},

		//验证不通过
		errorMsg : function(msg){
			var that = this;
			if(that.config.type !== 'radio' && that.config.type !== 'checkbox'){
				that.elem.style.borderColor = "#A94442";
			}
			that.error.innerHTML = msg;
			return false;
		}
	};

	//插件入口
	function valConfig(id,config){
		var container = d.getElementById(id);
		if(Object.prototype.toString.call(config) === "[object Array]"){
			for(var i=0;i<config.length;i++){
				var v = new Valid(container,config[i]);
				vAll.push(v);
				v.init();
			}
		}
		else {
			var v = new Valid(container,config);
			vAll.push(v);
			v.init();
		}

		return vAll;
	};

	//得到字符串长度
	function getLength(str){
		var len = 0;
		for(var i=0;i<str.length;i++){
			if(str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255){
				len = len + 2;
			}
			else {
				len = len + 1;
			}
		}
		return len;
	};

	//验证方法
	function submitVal(arr){
		var subFlag = true;
		for(var i=0,len=arr.length;i<len;i++){
			if(!arr[i].validator(arr[i])){
				subFlag = false;
			}
		}
		return subFlag;
	}

	w['valConfig'] = valConfig;
	w['submitVal'] = submitVal;
})(window,document)