import * as ActionTypes from "../constants/DateActionType"

const initialState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    switch: true
};

const calendar = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.DISPLAY_DATE:
            return Object.assign({}, state, {switch: !state.switch})
        case ActionTypes.SET_DATE:
            return Object.assign({}, state, action.date);
        case ActionTypes.INIT_DATE:
            return initialState;
        default:
            return state;
    }
}

export default calendar;