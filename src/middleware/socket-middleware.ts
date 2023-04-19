import type { Middleware, MiddlewareAPI } from 'redux';
import {wsConnectionClose, wsConnectionError, wsConnectionSuccess, wsGetMessage} from "../services/socket-slice";
import {getCookie} from "../utils/cookie";

export const socketMiddleware = (wsUrl: string): Middleware => {
	return ((store: MiddlewareAPI) => {
		let socket: WebSocket | null = null;
		return next => (action: any) => {
			const { dispatch } = store;
			const { type, payload } = action;
			if (type === 'WS_CONNECTION_START') {
				if (document.location.href.indexOf('feed') !== -1) {
					socket = new WebSocket(`${wsUrl}/all`);
				} else if (document.location.href.indexOf('orders') !== -1) {
					const token = getCookie('accessToken').replace('Bearer ', '')
					socket = new WebSocket(`${wsUrl}?token=${token}`);
				}
			}
			if (type === 'WS_CONNECTION_CLOSE') {
				if (socket) {
					socket.close()
				}
			}
			if (socket) {
				socket.onopen = event => {
					dispatch(wsConnectionSuccess(event))
				};

				socket.onerror = event => {
					dispatch(wsConnectionError(event))
				};

				// функция, которая вызывается при получения события от сервера
				socket.onmessage = event => {
					const { data } = event;
					dispatch(wsGetMessage(data))
				};

				socket.onclose = event => {
					dispatch(wsConnectionClose(event))
				};

				if (type === 'WS_SEND_MESSAGE') {
					const message = payload;
					// функция для отправки сообщения на сервер
					socket.send(JSON.stringify(message));
				}
			}

			next(action);
		};
	}) as Middleware;
};