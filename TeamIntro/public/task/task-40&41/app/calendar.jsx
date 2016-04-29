import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

export default class Calendar extends Component {
	constructor (props) {
		super(props);
		this.state = {
			year: this.props.year,
			month: this.props.month,
			day: this.props.day,
			today: {
				year: new Date().getFullYear(),
			    month: new Date().getMonth(),
			    day: new Date().getDate()
			},
			limit: {
				min: this.props.limit[0],
				max: this.props.limit[1]
			},
			type: 'day',
			year_range: 0
		};
		this.openYearList = this.openYearList.bind(this);
		this.openMonthList = this.openMonthList.bind(this);
	}
	/*
	 * 初始化选中状态和默认日期
	 */
	componentDidMount(){
		const activeday = this.getDayDom(this.props.year, this.props.month, this.props.day);
		const today = this.getDayDom(this.state.today.year, this.state.today.month, this.state.today.day);
		$(today).addClass('To_Date');
		if(activeday){
			$(activeday).addClass('Active_Date');
		}
	}
	/*
	 * 每次更新获取选中日期和默认日期
	 */
	componentDidUpdate(){
		const $tbody = $(this.refs.CalendarDays);
		$tbody.find('.To_Date').add('.Active_Date').removeClass('To_Date Active_Date');
		const activeday = this.getDayDom(this.props.year, this.props.month, this.props.day);
		const today = this.getDayDom(this.state.today.year, this.state.today.month, this.state.today.day);
		if(today){
			$(today).addClass('To_Date');
		}
		if(activeday){
			$(activeday).addClass('Active_Date');
		}
	}
	/*
	 * 点击切换选中日期
	 */
	handleClick(event){
		var $td = $(event.target);
		let dateyear = parseInt($td.attr('data-dateyear'));
		let datemonth = parseInt($td.attr('data-datemonth'));
		let dateday = parseInt($td.attr('data-dateday'));
		if($td.hasClass('No_Date')) return false;

		//当错误点击或点击当前日期不执行操作
		if((!dateyear && !datemonth && !dateday) ||  (dateyear === this.props.year && datemonth === this.props.month && dateday === this.props.day)){
			return false;
		}
		//日历点击
		if(dateyear > 0 && datemonth > -1 && dateday > 0){
			if(this.props.callback){
				this.props.callback(new Date(dateyear, datemonth, dateday));
			}
			this.props.onSelectDate({year:dateyear,month:datemonth,day:dateday});
		}
		//月历点击
		else if(dateyear > 0 && datemonth > -1 && !dateday){
			this.setState({
				type: 'day',
				month: datemonth
			});
		}
		//年历点击
		else if(dateyear > 0 && !datemonth && !dateday){
			this.setState({
				type: 'month',
				year: dateyear
			});
		}
		//日历点击不执行zoom-in动画
		if(this.state.type === 'day') {
			return false;
		}
		//zoom-in动画
		const $tbody = $(this.refs.CalendarDays).find('tbody');
		$tbody.addClass('Calendat-fadein');
		setTimeout(() => {
			$tbody.removeClass('Calendat-fadein');
		},400);
	}
	/*
	 * 给定日期得到对应DOM节点 ( 如无则false )
	 */
	getDayDom(year, month, day){
		const doms = this.refs.CalendarDays.querySelectorAll('td');
		var obj;
		var arr = Array.prototype.filter.call(doms, (dom) => {
			let dateyear = $(dom).attr('data-dateyear');
			let datemonth = $(dom).attr('data-datemonth');
			let dateday = $(dom).attr('data-dateday');
			// if(dateyear == year && datemonth == month && dateday == day){
			// 	obj = dom;
			// }
			// else if(dateyear == year && datemonth == month && !dateday){
			// 	obj = dom;
			// }
			// else if(dateyear == year && !datemonth && !dateday){
			// 	obj = dom;
			// }

			//简化代码
			obj = dateyear == year ? ( !datemonth ? ( !dateday ? dom : false ) : ( datemonth == month ? ( (dateday == day || !dateday) ? dom : false ) : false )) : false;
			if(typeof obj === 'object'){
				return true;;
			}
		});
		return arr[0];
	}
	/*
	 * 加载日历
	 */
	getDay(x, y, first, curMonth, prevMonth) {
		var cur = (x-1)*7 + y;
		var year = this.state.year,
			month = this.state.month,
			day,
			classNames = '';

		first = (first < 2) ? (first + 7) : first;

		//上个月的日期
		if(cur < first){
			day = (prevMonth - (first - cur - 1));
			if(this.state.month === 0){
				year = this.state.year - 1;
				month = 11;
			}
			else {
				month--;
			}
		}
		//下个月的日期
		else if(cur >= (first + curMonth)){
			if(this.state.month === 11){
				year = this.state.year + 1;
				month = 0;
			}
			else {
				month++;
			}
			day = (cur - (first + curMonth - 1));
		}
		//本月的日期
		else {
			day = (cur - first + 1);
			classNames = 'Now_Month';
		}
		classNames += this.is_DateRange(year,month,day) ? '' : ' No_Date';
		return <td key={'Calendar_td_' + cur} data-dateyear={year} data-datemonth={month} data-dateday={day} className={classNames}>{day}</td>;
	}
	/*
	 * 得到日期是否在范围内
	 */
	is_DateRange(year, month, day){
		var cur = new Date(year, month, day);
		var min = this.state.limit.min;
		var max = this.state.limit.max;
		if(cur > min && cur < max){
			return true;
		}
		return false;
	}
	/*
	 * 获得二月日数
	 */
	is_leap(year) {
		return (year%100==0?(year%400==0?29:28):(year%4==0?29:28));
	}
	/*
	 * 初始化日历
	 */
	initCalendar (){
		const date = this.state;
		const first = new Date(date.year,date.month).getDay();
		const total = new Array(31,this.is_leap(date.year),31,30,31,31,30,31,30,31,30,31);
		const curMonth = total[date.month];
		const prevMonth = date.month > 0 ? total[date.month-1] : 31;
		var tbody = [];
		for(var i=1;i<=6;i++){
			tbody.push(
			<tr key={'Calendar_tr_' + i}>
				{
					(() => {
						var arr = [];
						for(var j=1;j<=7;j++){
							arr.push(this.getDay(i, j, first, curMonth, prevMonth));
						}
						return arr;
					}).call(this)
				}
			</tr>);
		}
		return tbody;
	}
	/*
	 * 上下箭头切换日历
	 */
	changeDate (i){
		switch(this.state.type){
			case 'day':
				var nextState = this.state.month + i;
				if(nextState<0){
					this.setState({
						month: 11,
						year: this.state.year-1
					});
				}
				else if(nextState>11){
					this.setState({
						month: 0,
						year: this.state.year+1
					});
				}
				else {
					this.setState({
						month: nextState
					});
				}
			break;
			case 'month':
				var nextState = this.state.year + i;
				this.setState({
					year: nextState
				});
			break;
			case 'year':
				var nextState = this.state.year_range + i*20;
				this.setState({
					year_range: nextState
				});
			break;
		}
		//滑动动画
		const $tbody = $(this.refs.CalendarDays).find('tbody');
		if($tbody.data('slideFlag')) {
			return false;
		}

		var slideType = i===1 ? 'up' : 'down';
		$tbody.addClass('Calendat-slide' + slideType);
		$tbody.data('slideFlag', true);
		setTimeout(() => {
			$tbody.removeClass('Calendat-slide' + slideType);
			$tbody.data('slideFlag', false);
		},400);
	}
	/*
	 * 打开年历
	 */
	openYearList(){
		let tbody = [];
		const start = this.state.year_range;
		var classNames;
		for(var i=1;i<=4;i++){
			tbody.push(
			<tr key={'Calendar_tr_' + i}>
				{
					(() => {
						var arr = [];
						for(var j=1;j<=5;j++){
							var cur = start + (i-1)*5+j;
							classNames = 'Year_List';
							if(cur < this.state.limit.min.getFullYear() || cur > this.state.limit.max.getFullYear()){
								classNames += ' No_Date'
							}
							arr.push(<td key={'Calendar_td_' + ((i-1)*4+j)} data-dateyear={cur} className={classNames}>{cur}</td>);
						}
						return arr;
					}).call(this)
				}
			</tr>);
		}
		return tbody;
	}
	/*
	 * 打开月历
	 */
	openMonthList(){
		let tbody = [];
		var classNames;
		for(var i=1;i<=3;i++){
			tbody.push(
			<tr key={'Calendar_tr_' + i}>
				{
					(() => {
						var arr = [];
						for(var j=1;j<=4;j++){
							var cur = (i-1)*4+j;
							classNames = 'Month_List';
							if((this.state.year < this.state.limit.min.getFullYear() || this.state.year > this.state.limit.max.getFullYear()) || (this.state.year == this.state.limit.min.getFullYear() && cur-1 < this.state.limit.min.getMonth()) || (this.state.year == this.state.limit.max.getFullYear() && cur-1 > this.state.limit.max.getMonth())){
								classNames += ' No_Date';
							}
							arr.push(<td key={'Calendar_td_' + cur} data-dateyear={this.state.year} data-datemonth={cur-1} className={classNames}>{cur}月</td>);
						}
						return arr;
					}).call(this)
				}
			</tr>);
		}
		return tbody;
	}
	/*
	 * 切换显示状态
	 */
	switchList(string){
		var that = this;

		const start = that.state.year-that.state.year%20;
		that.setState({
			type: string,
			year_range: start
		});

		if(this.state.type === 'year') {
			return false;
		}

		//zoom-out动画
		const $tbody = $(that.refs.CalendarDays).find('tbody');;
		$tbody.addClass('Calendat-fadeout');
		setTimeout(() => {
			$tbody.removeClass('Calendat-fadeout');
		},400);
	}
	render() {
		var tbody;
		switch(this.state.type){
			case 'day':
				var thead = (<thead><tr key='Calendar_tr_0'>
					<th key='Calendar_th_1'>一</th>
					<th key='Calendar_th_2'>二</th>
					<th key='Calendar_th_3'>三</th>
					<th key='Calendar_th_4'>四</th>
					<th key='Calendar_th_5'>五</th>
					<th key='Calendar_th_6'>六</th>
					<th key='Calendar_th_7'>日</th>
				</tr></thead>);
				tbody = this.initCalendar();
				break;
			case 'month':
				tbody = this.openMonthList();
				break;
			case 'year':
				tbody = this.openYearList();
				break;
		}
		return (
			<div className='Calendar-Wrap' style={{'display': this.props.switch ? 'block' : 'none'}}>
				<div className='Calendar-Head'>
				    <span className='Calendar-Year' onClick={this.switchList.bind(this, 'year')}>{this.state.type === 'year' ? (this.state.year_range + '-' + (this.state.year_range + 20)) : (this.state.year + '年')}</span>
				    <span className='Calendar-Month' onClick={this.switchList.bind(this, 'month')} style={{'visibility': this.state.type !== 'day' ? 'hidden' : 'visible'}}>{(+this.state.month + 1) + '月'}</span>
					<span className='Switch-Month-Btn' onClick={this.changeDate.bind(this, 1)}></span>
					<span className='Switch-Month-Btn' onClick={this.changeDate.bind(this, -1)}></span>
				</div>
				<table ref='CalendarDays' className='Calendar-Body' onClick={this.handleClick.bind(this)}>
					{thead}
					<tbody>
						{tbody}
					</tbody>
				</table>
			</div>
		);
	}
}

Calendar.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  switch: React.PropTypes.bool,
  limit: React.PropTypes.arrayOf(React.PropTypes.object),
  onSelectDate: PropTypes.func.isRequired
};