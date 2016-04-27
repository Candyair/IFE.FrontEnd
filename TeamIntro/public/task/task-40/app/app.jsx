import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import DateActions from './actions/DateAction';
import Calendar from "./calendar"
import "./style"

export default class App extends React.Component {
	constructor (props) {
	    super(props);
    	this.state = {switch: this.props.newState.switch};
	}
	render() {
		const { displayDate, setDate } = this.props.actions;
		var state = this.props.newState;
		return (
		<div className="Calendar">
			<div className="Calendar-Switch" onClick={displayDate}>{state.year + "-" + (+state.month+1) + "-" + state.day}</div>
			<Calendar {...state} onSelectDate={(date) => setDate(date)} />
		</div>
		)
	}
}

const mapStateToProps = (state) => ({
	newState: state.calendar
})

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(DateActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);