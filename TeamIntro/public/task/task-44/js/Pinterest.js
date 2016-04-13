;(function(w,d,$,undefined){
	//图片状态
	var ImgStatus = {
		flag : false,
		startX : 0,
		startY : 0,
		left : 0,
		top : 0
	}
	//瀑布流实例
	var Pinterest = function(elem, config){
		this.$elem = elem;
		this.$imgs = this.$elem.find('img');
		this.images = [];
		this.config = config;
		this.streams = [];
		this.line = config.line ? config.line : 4;
		this.gap = config.gap ? config.gap : 15;
		this.width = config.width ? config.width : this.getWidth();

		//图片全屏显示
		this.$elem.on('click','img', this.fullScreen);
		$(d).on('click','.priterest-full-img', this.fullFigure);
		$(d).on('click','.priterest-shrink-btn', this.shrinkImg);
		$(d).on('mousedown','.priterest-big-img', this.dragImg);
		$(d).on('mousemove','.priterest-big-img', this.moveImg);
		$(d).on('mouseup','.priterest-big-img', this.dropImg);
	}

	Pinterest.prototype = {
		//得到每列宽度和图片宽度
		getWidth: function(){
			var width = this.$elem.width();
			var index = this.line + 1;
			return width ? (width - (this.gap * index))/this.line : 200;
		},
		//得到当前最短的列
		getMinStreams: function(){
			var that = this;
			var min = that.streams[0].height();
			var index = 0;
			for(var i=1; i<that.line; i++){
				var height = that.streams[i].height();
				if(min > height){
					min = height;
					index = i;
				}
			};
			return index;
		},
		//初始化
		init: function(){
			var that = this;
			for(var i=0; i<this.line; i++){
				that.streams.push($("<div class='pinterest-stream' style='width:"+ that.width +"px; margin-left:" + that.gap + "px; margin-bottom:" + that.gap + "px; display:inline-block; vertical-align: top'></div>"));
			 	that.streams[i].appendTo(this.$elem);
			};
			that.$imgs.css({
				"margin-top" : that.gap + 'px',
				"width" : that.width + 'px'
			});
			$.each(that.$imgs, function(i, v){
				var index = that.getMinStreams();
				that.$imgs.eq(i).appendTo(that.streams[index]);
			});

		},
		loading: function(){
			this.$elem.hide();
		},
		loadComplete: function(){
			this.$elem.show();
		},
		//增加图片
		add: function( elem ){
			var that = this;
			var $elem = $(elem);
			$elem.css({
				"margin-top" : that.gap + 'px',
				"width" : that.width + 'px'
			});
			this.$imgs.push($elem[0]);
			var index = this.getMinStreams();
			$elem.appendTo(this.streams[index]);
		},
		//移除图片
		remove: function( index ){
			index = parseInt(index);
			if( index === undefined ){ this.$elem.children().remove(); return false; }
			var i = index < 0 ? (index + this.$imgs.length) : index;		
			this.$imgs.eq(i-1).remove();		
		},
		//全屏显示图片
		fullScreen: function(){
			var $wrap = $("<div class='priterest-wrap' style='width: 100%;height: 100%;left:0;top:0;position: fixed;'></div>");
			var $fade = $("<div class='priterest-fade' style='width: 100%;height: 100%;background-color: #000;opacity:.8;z-index: 9999;'></div>");
			var $full_img = $("<img src="+ this.src +" style='z-index:10000;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);max-height:80%;max-width:80%;cursor:zoom-in;' class='priterest-full-img'/>");
			var $shrink_btn = $("<a style='width:100%;height:70px;background-color:rgba(0,0,0,.35);cursor:zoom-out;position:absolute;z-index:10001;top:0;display:none;' class='priterest-shrink-btn'></a>")
			$fade.click(function(){
				$wrap.remove();
			});
			$wrap.append($fade);
			$wrap.append($full_img);
			$wrap.append($shrink_btn);
			$wrap.appendTo('body');
		},
		//点击显示完整图片
		fullFigure: function(){
			if($(this).css('max-height') !== 'none'){
				$(this).css({
					"max-height" : "none",
					"max-width" : "none",
					"cursor": setCursor('grab')
				}).addClass('priterest-big-img');
				$('.priterest-shrink-btn').show();
			}
		},
		//点击缩小图片
		shrinkImg: function(){
			$('.priterest-full-img').css({
				"max-height" : "80%",
				"max-width" : "80%",
				"left" : "50%",
				"top" : "50%",
				"cursor" : 'zoom-in'
			}).removeClass('priterest-big-img');
			$(this).hide();
		},
		//拖拽图片
		dragImg: function(event){
			event.preventDefault();
			$(this).css({
				"cursor":  setCursor('grabbing')
			})
			//设置图片初始状态
			ImgStatus.flag = true;
			ImgStatus.startX = event.pageX;
			ImgStatus.startY = event.pageY;
			ImgStatus.left = parseInt(w.getComputedStyle(this , null)['left']);
			ImgStatus.top = parseInt(w.getComputedStyle(this , null)['top']);
		},
		//移动视口显示的图片
		moveImg: function(event){
			if(ImgStatus.flag){
				this.style.left = (event.pageX - ImgStatus.startX + ImgStatus.left) + 'px';
				this.style.top = (event.pageY - ImgStatus.startY + ImgStatus.top) + 'px';
			}
		},
		//放下图片
		dropImg: function(){
			ImgStatus.flag = false;
			$(this).css('cursor',setCursor('grab'));
		}
	};
	//设置cursor抓手属性
	(function(){
		var v = navigator.userAgent;
		var prefix = v.indexOf('AppleWebKit') > -1 ? "-webkit-" : v.indexOf('Gecko') > -1 && v.indexOf('KHTML') == -1 ? "-moz-" : v.indexOf('Presto') ? '' : 'IE';

		return setCursor = function( prop ){
			if(prefix === 'IE'){
				return "move";
			}
			else {
				return prefix + prop;
			}
		};
	})();

	$.fn.pinterest = function(option){
		var config = arguments[0] ? arguments[0] : {};
		var value = arguments[1];

	    return this.each(function () {
	      var $this = $(this),
	          data = $this.data('pinterest');

	      if (!data){ $this.data('pinterest', (data = new Pinterest($this, config))); }
	      
		  if (typeof config === 'string'){
	        switch(config){
	        	case 'add':{
	        		data.add(value);
	        		break;
	        	}
	        	case 'remove': {
	        		data.remove(value);
	        		break;
	        	}
	        	default: {
	        		data.init();
	        		break;
	        	}
	        }
	      } else {
	        data.init();
	      }
	    });
	}
})(window,document,jQuery)