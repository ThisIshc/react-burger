import React from "react";
import PropTypes from 'prop-types';
import Tabs from "../tabs/tabs";
import Ingredients from "../ingredients/ingredients";

const ingredientPropTypes = PropTypes.shape({
	img: PropTypes.string,
	counter: PropTypes.number,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired
});

class BurgerIngredients extends React.Component {
	render() {
		return (
			<div className={"burgerIngredients"}>
				<div className="burgerIngredients__top mt-10">
					<div className="burgerIngredients__title text text_type_main-large mb-5">
						Собери бургер
					</div>
					<Tabs />
				</div>
				<Ingredients />
			</div>
		)
	}
}

export default BurgerIngredients

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(PropTypes.objectOf(ingredientPropTypes)).isRequired
}