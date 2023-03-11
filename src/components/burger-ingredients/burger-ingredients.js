import React, {useMemo, useRef, useEffect} from "react";
import Tabs from "../tabs/tabs";
import style from "./burger-ingredients.module.css"
import IngredientsGroup from "../ingredients-group/ingredients-group";
import {useDispatch, useSelector} from "react-redux";
import {updateTabs} from "../../services/burger-slice";
import {getCurrentIngredient} from "../../services/ingredient-slice";

function BurgerIngredients(props) {
	const dispatch = useDispatch()
	const ingredients = useSelector(state => state.burger.data)
	const tabs = useSelector(state => state.burger.tabs)

	const rootRef = useRef()
	const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients])
	const sauce = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients])
	const main = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients])

	const getIngredient = (ingredientData) => {
		dispatch(getCurrentIngredient({ingredient: ingredientData}))
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
		rootRef.current.querySelectorAll('.ingredientsGroup').forEach(function (group, index) {
			group.id = index
			observer.observe(group)
		})
		return () => observer.disconnect()
	}, [dispatch])

	return (
		<div className={"burgerIngredients"}>
			<div className="burgerIngredients__top mt-10">
				<div className="burgerIngredients__title text text_type_main-large mb-5">
					Собери бургер
				</div>
				<Tabs tabs={tabs} />
			</div>
			<div className={style.burgerIngredients__content} ref={rootRef}>
				<IngredientsGroup title={"Булки"} data={buns} getIngredient={getIngredient} />
				<IngredientsGroup title={"Начинки"} data={main} getIngredient={getIngredient} />
				<IngredientsGroup title={"Соусы"} data={sauce} getIngredient={getIngredient} />
			</div>
		</div>
	)
}

export default BurgerIngredients