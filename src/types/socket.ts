import {TFeedItem} from "./feed";

export interface ISocketMessage {
	orders: TFeedItem[],
	success: boolean,
	total: number,
	totalToday: number
}

export type TWSState = {
	wsConnected: boolean;
	messages: string[];
	error?: Event;
}

export type TSocketData = {
	socket: TWSState
}