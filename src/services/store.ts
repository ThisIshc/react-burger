import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger'
import {burgerSlice} from "./burger-slice";
import {ingredientSlice} from "./ingredient-slice";
import {burgerConstructorSlice} from "./burger-constructor-slice";
import {userSlice} from "./user-slice";
import {socketMiddleware} from "../middleware/socket-middleware";
import {socketSlice} from "./socket-slice";
import {feedSlice} from "./feed-slice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {
	WS_CONNECTION_CLOSE,
	WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
	WS_CONNECTION_START,
	WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE
} from "../actions/ws-actions";

export const wsUrl:string = 'wss://norma.nomoreparties.space/orders'

const wsActions = {
	wsInit: WS_CONNECTION_START,
	wsClose: WS_CONNECTION_CLOSE,
	wsSendMessage: WS_SEND_MESSAGE,
	onOpen: WS_CONNECTION_SUCCESS,
	onClose: WS_CONNECTION_CLOSED,
	onError: WS_CONNECTION_ERROR,
	onMessage: WS_GET_MESSAGE,
}

const store = configureStore({
	reducer: {
		burger: burgerSlice.reducer,
		ingredient: ingredientSlice.reducer,
		order: burgerConstructorSlice.reducer,
		user: userSlice.reducer,
		feed: feedSlice.reducer,
		socket: socketSlice.reducer
	},
	middleware: (getDefaultMiddleaware) => getDefaultMiddleaware(
		{serializableCheck: false}
	).concat(
		logger,
		socketMiddleware(wsActions)
	),
	devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;