import React from "react";
import styleIngredients from "./ingredients-group.module.css";
import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";

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

function IngredientsGroup(props) {
	const getIngredient = (id) => {
		props.getIngredient(id)
	}

	return (
		<div className="ingredientsGroup mb-10">
			<div className="ingredientsGroup__title text text_type_main-medium mb-6">
				{props.title}
			</div>
			<div className={styleIngredients.ingredientsGroup__list + " pl-4 pr-4"}>
				{props.data.map((item, index) => (
					<div className={styleIngredients.ingredientsGroup__item +" pr-3"} key={index}>
						<Ingredient id={item._id} img={item.image} count={item.count} price={item.price} name={item.name} getIngredient={getIngredient} />
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
	data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}