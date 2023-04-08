import React, {useMemo, useRef, useEffect, FunctionComponent} from "react";
import Tabs from "../tabs/tabs";
import style from "./burger-ingredients.module.css"
import IngredientsGroup from "../ingredients-group/ingredients-group";
import {useDispatch, useSelector} from "react-redux";
import {updateTabs} from "../../services/burger-slice";
import {getCurrentIngredient} from "../../services/ingredient-slice";
import {TIngredient} from "../../types/ingredient";

type TTab = {
	value: string,
	active: boolean,
	onClick: () => {}
}

type TBurgerData = {
	readonly burger: {
		readonly data: TIngredient[]
		readonly tabs: TTab[]
	}
}

const BurgerIngredients:FunctionComponent = () => {
	const dispatch = useDispatch()
	const ingredients:TIngredient[] | unknown = useSelector<TBurgerData>(state => state.burger.data)
	const tabs = useSelector<TBurgerData>(state => state.burger.tabs)

	const rootRef = useRef<HTMLDivElement>(null)

	const buns = useMemo(() => {
		if (Array.isArray(ingredients)) {
			return ingredients.filter((item) => item.type === 'bun')
		}
	}, [ingredients])
	const sauce = useMemo(() => {
		if (Array.isArray(ingredients)) {
			return ingredients.filter((item) => item.type === 'sauce')
		}
	}, [ingredients])
	const main = useMemo(() => {
		if (Array.isArray(ingredients)) {
			return ingredients.filter((item) => item.type === 'sauce')
		}
	}, [ingredients])

	const getIngredient = (ingredientData: TIngredient | undefined) => {
		if (ingredientData) {
			dispatch(getCurrentIngredient({ingredient: ingredientData}))
		}
	}

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry, index) => {
				if (entry.isIntersecting) {
					dispatch(updateTabs({index: entry.target.id}))
				}
			})
		}, {
			root: rootRef.current
		})
		if (rootRef.current) {
			rootRef.current.querySelectorAll('.ingredientsGroup').forEach(function (group, index) {
				group.id = index.toString()
				observer.observe(group)
			})
		}

		return () => observer.disconnect()
	}, [dispatch])

	return (
		<div className={"burgerIngredients"}>
			<div className="burgerIngredients__top mt-10">
				<div className="burgerIngredients__title text text_type_main-large mb-5">
					Собери бургер
				</div>
				<Tabs tabs={(tabs as TTab[])} />
			</div>
			<div className={style.burgerIngredients__content} ref={rootRef}>
				{ buns && <IngredientsGroup title={"Булки"} data={buns} getIngredient={getIngredient} /> }
				{ main && <IngredientsGroup title={"Начинки"} data={main} getIngredient={getIngredient} /> }
				{ sauce && <IngredientsGroup title={"Соусы"} data={sauce} getIngredient={getIngredient} /> }
			</div>
		</div>
	)
}

export default BurgerIngredients