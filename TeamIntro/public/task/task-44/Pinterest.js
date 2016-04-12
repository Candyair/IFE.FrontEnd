;(function(w,d,$,undefined){
	var Pinterest = function(elem, config){
		this.$elem = elem;
		this.$imgs = this.$elem.find('img');
		this.config = config;
		this.streams = [];
		this.line = config.line ? config.line : 4;
		this.gap = config.gap ? config.gap : 15;
		this.width = config.width ? config.width : this.getWidth();

		//图片全屏显示
		this.$elem.on('click','img',this.fullScreen);
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
			}
			return index;
		},
		//初始化
		init: function(){
			var that = this;
			for(var i=0; i<this.line; i++){
				that.streams.push($("<div class='pinterest-stream' style='width:"+ that.width +"px; margin-left:" + that.gap + "px; margin-bottom:" + that.gap + "px; display:inline-block; vertical-align: top'></div>"));
				that.streams[i].appendTo(that.$elem);
			}
			that.$imgs.css({
				"margin-top" : that.gap + 'px'
			})
			$.each(that.$imgs, function(i, v){
				that.$imgs.eq(i).width(that.width);
				var index = that.getMinStreams();
				that.$imgs.eq(i).appendTo(that.streams[index]);
			})
		},
		//增加图片
		add: function( src ){
			var img = $("<img src=" + src + " style='width:"+ this.width +"px; margin-top:" + this.gap + "px;' />");
			var index = this.getMinStreams();
			img.appendTo(this.streams[index]);
		},
		//移除图片
		remove: function( index ){
			if( index === undefined ){ this.$elem.children().remove(); return false; }
			var i = index < 0 ? index + this.$imgs.length : index;
			this.$imgs.get(i).remove();
		},
		//全屏显示图片
		fullScreen: function(){
			var $wrap = $("<div class='priterest-wrap' style='width: 100%;height: 100%;left:0;top:0;position: fixed;'></div>");
			var $fade = $("<div class='priterest-fade' style='width: 100%;height: 100%;background-color: #000;opacity:.8;z-index: 9999;'></div>");
			var $full_img = $("<img src="+ this.src +" style='z-index:10000;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);max-height:80%;max-width:80%;'/>");
			$fade.click(function(){
				$wrap.remove();
			});
			$wrap.append($fade);
			$wrap.append($full_img);
			$wrap.appendTo('body');
		}
	}
	
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