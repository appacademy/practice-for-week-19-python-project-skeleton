import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import session from './session'
import reviewReducer from './reviews';
import restaurantReducer from './restaurants';

const rootReducer = combineReducers({
  session,
  reviews: reviewReducer,
  restaurant: restaurantReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = (preloadedState) => {
  // return createStore(rootReducer, preloadedState, enhancer);
  let store = createStore(persistedReducer, preloadedState, enhancer)
  let persistor = persistStore(store)
  return { store, persistor }
};

export default configureStore;
