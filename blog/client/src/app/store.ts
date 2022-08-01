import {configureStore} from '@reduxjs/toolkit';
import { postReducer } from './fetaures/posts';

const store = configureStore({reducer:postReducer});

export default store;
export type StoreType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
