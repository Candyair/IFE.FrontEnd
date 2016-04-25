(function  ($) {
	date = new Date();
	_year = date.getFullYear();
	_month = date.getMonth()+1;
	_day = date.getDate();
	table_blank = true;
	var head = "<tr><td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td></tr>"
	
	var Calendar = (function(){
		function Calendar(element,options){
			this.settings = $.extend(true,$.fn.Calendar.defaults,options||{});
			this.element = element;
			this.init();
		}
		Calendar.prototype={
			init:function(){
				var me = this;
				me.year = me.settings.year;
				me.month = me.settings.month;
				me.day = me.settings.day;	
			},
			renderTable:function(){
				var me =this;
				me.rows = me.getRows();
				console.log(me.rows);
				document.write("<table class='UI-table'>");
				document.write(head);
				for (var i = 0; i < me.rows; i++) {
					document.write("<tr>");
					for ( j = 0; j < 7; j++) {
						index = 7 * i + j; 
						date_str = index - me.getFirstDay() +1;
						(date_str<=0 || date_str>m_days[me.month-1])?date_str="":date_str=index -me.getFirstDay()+1;
						date_str == me.day?document.write("<td class='active UI-td'>"+date_str+"</td>"):document.write("<td class='UI-td'>"+date_str+"</td>")
					};
					document.write("</tr>")
				};
				document.write("</table>")
			},


			is_leap:function(){
				var me = this;
				return (me.year%4===0&&me.year%100!==0)||(me.year%400===0)?1:0;
			},
			get_m_days:function(){
				return (function(){
					m_days=new Array(31,28+Calendar.prototype.is_leap.apply(),31,30,31,30,31,31,30,31,30,31);
					return m_days;
				})()
			},	
			getRows:function(){
				var me = this ; 
				nowDay = new Date(me.year,me.month-1,1);
				var firstDay = nowDay.getDay();
				var _m_days = Calendar.prototype.get_m_days();
				return Math.ceil((_m_days[me.month-1]+firstDay)/7);
			},
			getFirstDay:function(){
				var me = this ;
				var fDay = new Date(me.year,me.month-1,1);
				var firstDay = fDay.getDay();
				return firstDay;

			},
		}
		return Calendar;
	})();


	$.fn.Calendar = function(options){
		return this.each(function(){
			var me = $(this),
			instance =  me.data("Calendar");
			if(!instance){
				instance = new Calendar(me,options);
				me.data("Calendar",instance);
			}
			if($.type(options)==="string")return instance[options]();
		});
	};

	$.fn.Calendar.defaults = {
		"year":_year,
		"month":_month,
		"day":_day,	
		"format":{
			one:"XX/XX/XX"
		},
		"isLunar":true,
		"isNationalDay":true,		
	}


})(jQuery);