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

export type TIngredientShort = {
	readonly id: string,
	readonly name: string,
	readonly image: string,
	readonly type: string,
	readonly price: number,
	dragId?: string,
	index?: number,
	count?: number,
	readonly getIngredient?: (id:string) => void
}
type TIngredientProps = {
	readonly img: string,

	readonly getIngredient: (id:string) => void
}

export interface IIngredient {
	ingredient: {
		ingredient: TIngredient
	}
}