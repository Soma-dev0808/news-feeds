import { configureStore } from '@reduxjs/toolkit';

import newsListReducer from 'redux/feature/newsListSlice';
import newContentReducer from 'redux/feature/newsContentSlice';

const store = configureStore({
    reducer: {
        newsListState: newsListReducer,
        newsContentState: newContentReducer,
    }
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppGetState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
export type GenericCommonActionType = (...args: Array<any>) => (dispatch: AppDispatch, getState: AppGetState) => void;
export type CommonActionType = () => (dispatch: AppDispatch, getState: AppGetState) => void;