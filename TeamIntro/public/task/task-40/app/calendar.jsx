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
				year: this.props.year,
				month: this.props.month,
				day: this.props.day
			},
			type: 'day',
			year_range: 0
		}
		this.openYearList = this.openYearList.bind(this);
		this.openMonthList = this.openMonthList.bind(this);
	}
	/*
	 * 初始化选中状态和默认日期
	 */
	componentDidMount(){
		var today = this.getDayDom(this.props.year, this.props.month, this.props.day);
		if(today){
			$(today).addClass('To_Date Active_Date');
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
		if(!dateyear && !datemonth && !dateday){
			return false;
		}
		if(dateyear > -1 && datemonth > -1 && dateday > -1){
			this.props.onSelectDate({year:dateyear,month:datemonth,day:dateday});
		}
		else if(dateyear > -1 && datemonth > -1 && !dateday){
			this.setState({
				type: 'day',
				month: datemonth
			})
		}
		else if(dateyear > -1 && !datemonth && !dateday){
			this.setState({
				type: 'month',
				year: dateyear
			})
		}
		if(this.state.type === 'day') {
			return false;
		}
		const $tbody = $(this.refs.CalendarDays).find('tbody');
		$tbody.addClass('Calendat-fadein');
		setTimeout(() => {
			$tbody.removeClass('Calendat-fadein');
		},400)
	}
	/*
	 * 给定日期得到对应DOM节点 ( 如无则false )
	 */
	getDayDom(year, month, day){
		const doms = this.refs.CalendarDays.querySelectorAll('td');
		let obj;
		Array.prototype.forEach.call(doms, (dom) => {
			let dateyear = $(dom).attr('data-dateyear');
			let datemonth = $(dom).attr('data-datemonth');
			let dateday = $(dom).attr('data-dateday');
			if(dateyear == year && datemonth == month && dateday == day){
				obj = dom;
			}
			else if(dateyear == year && datemonth == month && !dateday){
				obj = dom;
			}
			else if(dateyear == year && !datemonth && !dateday){
				obj = dom;
			}
		})
		return obj ? obj : false;
	}
	/*
	 * 加载日历
	 */
	getDay(x, y, first, curMonth, prevMonth) {
		var cur = (x-1)*7 + y;
		var year = this.state.year,
			month = this.state.month,
			day = this.state.day;
		first = (first === 1 || first === 0) ? (first + 7) : first;
		if(cur < first){
			day = (prevMonth - (first - cur - 1));
			if(this.state.month === 0){
				year = this.state.year - 1;
				month = 12;
			}
			return <td key={"Calendar_td_" + cur} data-dateyear={year} data-datemonth={month-1} data-dateday={day} >{day}</td>;
		}
		else if(cur >= (first + curMonth)){
			if(this.state.month === 11){
				year = this.state.year + 1;
				month = 1;
			}
			day = (cur - (first + curMonth - 1));
			return <td key={"Calendar_td_" + cur} data-dateyear={year} data-datemonth={month+1} data-dateday={day} >{day}</td>;
		}
		else {
			day = (cur - first + 1);
			return <td key={"Calendar_td_" + cur} data-dateyear={year} data-datemonth={month} data-dateday={day} className="Now_Month">{day}</td>;
		}
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
			<tr key={"Calendar_tr_" + i}>
				{
					(() => {
						var arr = [];
						for(var j=1;j<=7;j++){
							arr.push(this.getDay(i, j, first, curMonth, prevMonth));
						}
						return arr;
					}).call(this)
				}
			</tr>)
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
					})
				}
				else if(nextState>11){
					this.setState({
						month: 0,
						year: this.state.year+1
					})
				}
				else {
					this.setState({
						month: nextState
					})
				}
			break;
			case 'month':
				var nextState = this.state.year + i;
				this.setState({
					year: nextState
				})
			break;
			case 'year':
				var nextState = this.state.year_range + i*20;
				this.setState({
					year_range: nextState
				})
			break;
		}

		const $tbody = $(this.refs.CalendarDays).find('tbody');
		var slideType = i===1 ? 'up' : 'down';
		$tbody.addClass('Calendat-slide' + slideType);
		setTimeout(() => {
			$tbody.removeClass('Calendat-slide' + slideType);
		},400)
	}
	/*
	 * 打开年历
	 */
	openYearList(){
		let tbody = [];
		const start = this.state.year_range;
		for(var i=1;i<=4;i++){
			tbody.push(
			<tr key={"Calendar_tr_" + i}>
				{
					(() => {
						var arr = [];
						for(var j=1;j<=5;j++){
							var cur = start + (i-1)*5+j;
							arr.push(<td key={"Calendar_td_" + ((i-1)*4+j)} data-dateyear={cur} className="Year_List">{cur}</td>);
						}
						return arr;
					}).call(this)
				}
			</tr>)
		}
		return tbody;
	}
	/*
	 * 打开月历
	 */
	openMonthList(){
		let tbody = [];
		for(var i=1;i<=3;i++){
			tbody.push(
			<tr key={"Calendar_tr_" + i}>
				{
					(() => {
						var arr = [];
						for(var j=1;j<=4;j++){
							var cur = (i-1)*4+j;
							arr.push(<td key={"Calendar_td_" + cur} data-dateyear={this.state.year} data-datemonth={cur-1} className="Month_List">{cur}月</td>);
						}
						return arr;
					}).call(this)
				}
			</tr>)
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
		})

		if(this.state.type === 'year') {
			return false;
		}
		const $tbody = $(that.refs.CalendarDays).find('tbody');;
		$tbody.addClass('Calendat-fadeout');
		setTimeout(() => {
			$tbody.removeClass('Calendat-fadeout');
		},400)
	}
	render() {
		var tbody;
		switch(this.state.type){
			case 'day':
				var thead = (<thead><tr key="Calendar_tr_0">
					<th key="Calendar_th_1">一</th>
					<th key="Calendar_th_2">二</th>
					<th key="Calendar_th_3">三</th>
					<th key="Calendar_th_4">四</th>
					<th key="Calendar_th_5">五</th>
					<th key="Calendar_th_6">六</th>
					<th key="Calendar_th_7">日</th>
				</tr></thead>)
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
			<div className="Calendar-Wrap" style={{"display": this.props.switch ? "block" : "none"}}>
				<div className="Calendar-Head">
				    <span className="Calendar-Year" onClick={this.switchList.bind(this, 'year')}>{this.state.type === 'year' ? (this.state.year_range + '-' + (this.state.year_range + 20)) : (this.state.year + '年')}</span>
				    <span className="Calendar-Month" onClick={this.switchList.bind(this, 'month')} style={{"visibility": this.state.type !== 'day' ? "hidden" : "visible"}}>{(+this.state.month + 1) + '月'}</span>
					<span className="Switch-Month-Btn" onClick={this.changeDate.bind(this, 1)}></span>
					<span className="Switch-Month-Btn" onClick={this.changeDate.bind(this, -1)}></span>
				</div>
				<table ref="CalendarDays" className="Calendar-Body" onClick={this.handleClick.bind(this)}>
					{thead}
					<tbody>
						{tbody}
					</tbody>
				</table>
			</div>
		)
	}
}

Calendar.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  switch: React.PropTypes.bool,
  onSelectDate: PropTypes.func.isRequired
}