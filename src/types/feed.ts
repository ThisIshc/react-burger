export type TFeedItem = {
	readonly createdAt: string,
	readonly ingredients: string[],
	readonly name: string,
	readonly number: number
	readonly status: string
	readonly updatedAt: string,
	readonly _id: string
}

export interface ISliceFeed {
	feed: { feed: TFeedItem }
}