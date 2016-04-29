import * as ActionTypes from "../constants/DateActionType";

const DateActions = {
	displayDate(){
		return {type: ActionTypes.DISPLAY_DATE }
	},
	initDate(){
		return {type: ActionTypes.INIT_DATE }
	},
	setDate(date){
		return {type: ActionTypes.SET_DATE , date}
	},
	setLimitDate(limit){
		return {type: ActionTypes.SET_LIMIT_DATE, limit}
	}
}

export default DateActions;