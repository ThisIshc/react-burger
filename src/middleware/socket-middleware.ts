import type {Middleware, MiddlewareAPI} from 'redux';

export const socketMiddleware = (wsActions:any) => {
	return((store: MiddlewareAPI) => {
		let socket: WebSocket | null = null;
		return (next) => (action: any) => {
			const { dispatch } = store
			const {type, payload} = action
			const {wsInit, wsClose, wsSendMessage, onOpen, onClose, onError, onMessage} = wsActions

			if (type === wsInit) {
				socket = new WebSocket(payload.wsUrl)
				socket.onopen = (event) => {
					dispatch({type: onOpen, payload: event})
				}

				socket.onerror = (event) => {
					dispatch({type: onError, payload: event})
				}

				socket.onmessage = (event) => {
					const { data } = event
					dispatch({type: onMessage, payload: data})
				}

				socket.onclose = event => {
					dispatch({type: onClose, payload: event})
				};

				if (type === onMessage) {
					socket.send(JSON.stringify(payload));
				}

				if (type === wsClose) {
					socket.close()
				}
			}
			next(action);
		}

	}) as Middleware
}