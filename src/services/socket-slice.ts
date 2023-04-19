import {createSlice} from "@reduxjs/toolkit";
import {TWSState} from "../types/socket";

const initialState: TWSState = {
	wsConnected: false,
	messages: [],
	error: undefined
};
export const socketSlice = createSlice({
	name: 'socket',
	initialState: initialState,
	reducers: {
		wsConnectionStart(state, action) {
			return {
				...state
			}
		},
		wsConnectionSuccess(state, action) {
			return {
				...state,
				error: undefined,
				wsConnected: true
			}
		},
		wsConnectionError(state, action) {
			return {
				...state,
				error: action.payload,
				wsConnected: false
			}
		},
		wsConnectionClose(state, action) {
			return {
				...state,
				error: undefined,
				wsConnected: false
			}
		},
		wsGetMessage(state, action) {
			return {
				...state,
				error: undefined,
				messages: [...state.messages, action.payload]
			}
		},
		wsSendMessage(state, action) {
			return {
				...state
			}
		}
	}
})

export const {
	wsConnectionSuccess,
	wsConnectionError,
	wsConnectionClose,
	wsGetMessage,
	wsSendMessage,
	wsConnectionStart
} = socketSlice.actions