import React from "react";
import styleIngredients from "./ingredients-group.module.css";
import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";

const ingredientPropTypes = PropTypes.shape({
	name: PropTypes.string.isRequired,
	image: PropTypes.string,
	count: PropTypes.number,
	price: PropTypes.number.isRequired
});

function IngredientsGroup(props) {
	return (
		<div className="ingredientsGroup mb-10">
			<div className="ingredientsGroup__title text text_type_main-medium mb-6">
				{props.title}
			</div>
			<div className={styleIngredients.ingredientsGroup__list + " pl-4 pr-4"}>
				{props.data.map((item, index) => (
					<div className={styleIngredients.ingredientsGroup__item +" pr-3"} key={index}>
						<Ingredient img={item.image} count={item.count} price={item.price} name={item.name} />
					</div>
					)
				)}
			</div>
		</div>
	)
}

export default IngredientsGroup

IngredientsGroup.propTypes = {
	title: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(ingredientPropTypes).isRequired
}