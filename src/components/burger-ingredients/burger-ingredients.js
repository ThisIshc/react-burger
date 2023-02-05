import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import Tabs from "../tabs/tabs";
import style from "./burger-ingredients.module.css"
import IngredientsGroup from "../ingredients-group/ingredients-group";

const ingredientPropTypes = PropTypes.shape({
	__v: PropTypes.number.isRequired,
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	count: PropTypes.number,
	price: PropTypes.number.isRequired,
});

function BurgerIngredients(props) {
	const buns = useMemo(() => props.ingredients.filter((item) => item.type === 'bun'), [props.ingredients])
	const sauce = useMemo(() => props.ingredients.filter((item) => item.type === 'sauce'), [props.ingredients])
	const main = useMemo(() => props.ingredients.filter((item) => item.type === 'main'), [props.ingredients])


	return (
		<div className={"burgerIngredients"}>
			<div className="burgerIngredients__top mt-10">
				<div className="burgerIngredients__title text text_type_main-large mb-5">
					Собери бургер
				</div>
				<Tabs />
			</div>
			<div className={style.burgerIngredients__content}>
				<IngredientsGroup title={"Булки"} data={buns} />
				<IngredientsGroup title={"Соусы"} data={sauce} />
				<IngredientsGroup title={"Начинки"} data={main} />
			</div>
		</div>
	)
}

export default BurgerIngredients

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}