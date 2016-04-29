import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './app';
import rootReducer from './reducers';

const initialState = {
	calendar: {
	    year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
	    limit: [new Date(2004,3,3), new Date(2016,4,15)],  //月份 0~11
	    callback: function(date){console.log("回调函数:" + date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate())},
	    switch: true
	}
};

let store = createStore(rootReducer, initialState);

var node = document.getElementById('app');

render(
	 <Provider store={store}>
		<App></App>
	</Provider>,
	node
);