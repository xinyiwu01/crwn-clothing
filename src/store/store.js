import { legacy_createStore as createStore} from 'redux'
import {compose, applyMiddleware} from 'redux';
//import logger from 'redux-logger';
import { rootReducer} from './root-reducer';

// when dispatch action, it hits middleWare first, then hits reducer
//chained curry function
const loggerMiddleWare = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action)
    }
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);
    console.log('next state: ', store.getState());

}
//const middleWares = [logger]
const middleWares = [loggerMiddleWare]

const composedEnhancers = compose(applyMiddleware(...middleWares))
export const store = createStore(rootReducer, undefined, composedEnhancers)
// enhancer: first middleware then log

