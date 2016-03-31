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
			else if(config.elem === 'select'){
				that.elem = d.createElement(config.elem);
				for(var i=0;i<config.selects.length;i++){					
					that.label = d.createElement("option");
					that.label.innerHTML = config.selects[i];
					that.elem.setAttribute("name",config.name);
					that.elem.appendChild(that.label);		
				}
				that.label = d.createElement("LABEL");
				that.label.innerHTML = config.label;
				that.group.appendChild(that.label);
				that.group.appendChild(that.elem);
				that.group.className = "Valid-" + config.elem;
			}
			else {
				that.elem = d.createElement(config.elem);
				that.elem.setAttribute("type",config.type);
				that.label = d.createElement("LABEL");
				that.label.innerHTML = config.label;
				if(config.name){
					that.elem.setAttribute("name",config.name);
				}
				if(config.placeholder){
					that.elem.setAttribute("placeholder",config.placeholder);
				}
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
					case "required": {                       //验证是否输入
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
					case "minHeight": {                     //验证输入长度
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
						var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;   //匹配Email地址是否合法
						if(!reg.test(value)){
							isPass = false;
						}
						break;
					}
					case "account": {
						var reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;   //匹配帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
						if(!reg.test(value)){
							isPass = false;
						}
						break;
					}
					case "phone": {
						var reg = /d{3}-d{8}|d{4}-d{7}/;   //匹配国内电话号码 PS 0511-4405222 或 021-87888822
						if(!reg.test(value)){
							isPass = false;
						}
						break;
					}
					case "qq": {
						var reg = /[1-9][0-9]{4,}/;   //匹配QQ帐号是否合法 
						if(!reg.test(value)){
							isPass = false;
						}
						break;
					}
					case "postcode": {
						var reg = /[1-9]d{5}(?!d)/;   //匹配中国邮政编码是否合法 
						if(!reg.test(value)){
							isPass = false;
						}
						break;
					}
					case "idCard": {
						var reg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;   //匹配身份证是否合法 
						if(!reg.test(value)){
							isPass = false;
						}
						break;
					}
					case "ip": {
						var reg = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/;   //匹配IP地址是否合法 
						if(!reg.test(value)){
							isPass = false;
						}
						break;
					}
				}
				if(that.config.diy){                 //自定义DIY验证规则
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