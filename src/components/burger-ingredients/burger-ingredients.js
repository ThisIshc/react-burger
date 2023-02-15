import React, {useMemo, useState, useContext} from "react";
// import PropTypes from 'prop-types';
import Tabs from "../tabs/tabs";
import style from "./burger-ingredients.module.css"
import IngredientsGroup from "../ingredients-group/ingredients-group";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {IngredientContext} from "../../utils/ingredient-context";

// const ingredientPropTypes = PropTypes.shape({
// 	__v: PropTypes.number.isRequired,
// 	_id: PropTypes.string.isRequired,
// 	name: PropTypes.string.isRequired,
// 	type: PropTypes.string.isRequired,
// 	proteins: PropTypes.number.isRequired,
// 	fat: PropTypes.number.isRequired,
// 	carbohydrates: PropTypes.number.isRequired,
// 	calories: PropTypes.number.isRequired,
// 	image: PropTypes.string.isRequired,
// 	image_mobile: PropTypes.string.isRequired,
// 	image_large: PropTypes.string.isRequired,
// 	count: PropTypes.number,
// 	price: PropTypes.number.isRequired,
// });

function BurgerIngredients(props) {
	const [state, setState] = useState({ingredient: null, openModal: false})
	const ingredients = useContext(IngredientContext)

	const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients])
	const sauce = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients])
	const main = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients])

	const getIngredient = (ingredientData) => {
		setState({...state, ingredient: ingredientData, openModal: true})
	}

	const closeModal = (e) => {
		setState({...state, openModal: !e})
	}

	return (
		<div className={"burgerIngredients"}>
			<div className="burgerIngredients__top mt-10">
				<div className="burgerIngredients__title text text_type_main-large mb-5">
					Собери бургер
				</div>
				<Tabs />
			</div>
			<div className={style.burgerIngredients__content}>
				<IngredientsGroup title={"Булки"} data={buns} getIngredient={getIngredient} />
				<IngredientsGroup title={"Соусы"} data={sauce} getIngredient={getIngredient} />
				<IngredientsGroup title={"Начинки"} data={main} getIngredient={getIngredient} />
			</div>
			{state.openModal &&
				<Modal title={'Детали ингредиента'} onClose={closeModal} >
					<IngredientDetails data={state.ingredient} />
				</Modal>
			}
		</div>
	)
}

export default BurgerIngredients

// BurgerIngredients.propTypes = {
// 	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
// }