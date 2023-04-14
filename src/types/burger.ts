import {TIngredient} from "./ingredient";

export type TBurgerTab = {
	readonly value: string,
	readonly active: boolean
}
export type TBurgerTabs = {
	tabs: TBurgerTab[]
}

export type TTab = {
	value: string,
	active: boolean,
	onClick: () => {}
}

export type TBurgerData = {
	readonly burger: {
		readonly data: TIngredient[]
		readonly tabs: TTab[]
	}
}