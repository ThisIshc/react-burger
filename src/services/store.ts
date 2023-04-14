import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger'
import {burgerSlice} from "./burger-slice";
import {ingredientSlice} from "./ingredient-slice";
import {burgerConstructorSlice} from "./burger-constructor-slice";
import {userSlice} from "./user-slice";
import {socketMiddleware} from "../middleware/socket-middleware";
import {socketSlice} from "./socket-slice";
import {feedSlice} from "./feed-slice";

const wsUrl:string = 'wss://norma.nomoreparties.space/orders'

const store = configureStore({
	reducer: {
		burger: burgerSlice.reducer,
		ingredient: ingredientSlice.reducer,
		order: burgerConstructorSlice.reducer,
		user: userSlice.reducer,
		feed: feedSlice.reducer,
		socket: socketSlice.reducer
	},
	middleware: (getDefaultMiddleaware) => getDefaultMiddleaware({serializableCheck: false}).concat(logger, socketMiddleware(wsUrl)),
	devTools: process.env.NODE_ENV !== 'production'
})

export default store;