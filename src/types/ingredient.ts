export type TIngredient = {
	readonly calories: number,
	readonly carbohydrates: number
	readonly fat: number
	readonly image: string,
	readonly image_large: string,
	readonly image_mobile: string,
	readonly name: string,
	readonly price:number
	readonly proteins: number,
	readonly type: string,
	readonly __v: number,
	readonly _id: string,
	count?: number,
	readonly id?: string,
}
export interface IIngredient {
	ingredient: {
		ingredient: TIngredient
	}
}