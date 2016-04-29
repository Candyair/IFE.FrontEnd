import * as ActionTypes from '../constants/DateActionType';

const initialState = {
    calendar: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        limit: [new Date(1000,1,1), new Date(9998,12,31)],
        callback: null,
        switch: true
    }
};

const calendar = (state = initialState.calendar, action) => {
    switch(action.type) {
        case ActionTypes.DISPLAY_DATE:
            return Object.assign({}, state, {switch: !state.switch});
        case ActionTypes.SET_DATE:
            return Object.assign({}, state, action.date);
        case ActionTypes.INIT_DATE:
            return initialState.calendar;
        case ActionTypes.SET_LIMIT_DATE:
        console.log(action);
            return Object.assign({}, state, action.limit);
        default:
            return state;
    }
};

export default calendar;