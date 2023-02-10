import React from "react";
import PropTypes from "prop-types";
import style from './ingredient-details.module.css'

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

export default function IngredientDetails(props) {
	return (
		<div className={'detailIngredient'}>
			<div className={style.detailIngredient__content}>
				<div className={style.detailIngredient__img}>
					<img src={props.data.image_large} alt={props.data.name}/>
				</div>
				<div className="detailIngredient__info mt-4">
					<div className={style.detailIngredient__title + " text text_type_main-medium mb-8"}>{props.data.name}</div>
					<div className={style.detailIngredient__props}>
						<div className={style.detailIngredient__prop}>
							<span className={'text text_type_main-default mb-2'}>Калории, ккал</span>
							<span className={'text text_type_digits-default'}>{props.data.calories}</span>
						</div>
						<div className={style.detailIngredient__prop}>
							<span className={'text text_type_main-default mb-2'}>Белки, г</span>
							<span className={'text text_type_digits-default'}>{props.data.proteins}</span>
						</div>
						<div className={style.detailIngredient__prop}>
							<span className={'text text_type_main-default mb-2'}>Жиры, г</span>
							<span className={'text text_type_digits-default'}>{props.data.fat}</span>
						</div>
						<div className={style.detailIngredient__prop}>
							<span className={'text text_type_main-default mb-2'}>Углеводы, г</span>
							<span className={'text text_type_digits-default'}>{props.data.carbohydrates}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

IngredientDetails.propTypes = {
	data: ingredientPropTypes.isRequired
}