import {configureStore} from "@reduxjs/toolkit";
// @ts-ignore
import logger from 'redux-logger'
import {burgerSlice} from "./burger-slice";
import {ingredientSlice} from "./ingredient-slice";
import {burgerConstructorSlice} from "./burger-constructor-slice";
import {userSlice} from "./user-slice";

const store = configureStore({
	reducer: {
		burger: burgerSlice.reducer,
		ingredient: ingredientSlice.reducer,
		order: burgerConstructorSlice.reducer,
		user: userSlice.reducer
	},
	middleware: (getDefaultMiddleaware) => getDefaultMiddleaware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production'
})

export default store;