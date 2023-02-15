import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styleIngredient from "./ingredient.module.css"
import PropTypes from "prop-types";

function Ingredient(props) {
	const handlerIngredient = () => {
		props.getIngredient(props.id)
	}
	return (
		<div className={styleIngredient.ingredient} onClick={handlerIngredient}>
			<div className={styleIngredient.ingredient__counter}>
				{props.count > 0
					? <Counter count={props.count} size="default" extraClass="m-1" />
					: ''
				}
			</div>
			<div className={styleIngredient.ingredient__img + " pl-4 pr-4 mb-1"}>
				<img src={props.img} alt={props.name}/>
			</div>
			<div className={styleIngredient.ingredient__price + " text text_type_main-medium mb-1"}>
					<span className={"mr-2"}>
						{props.price}
					</span>
				<CurrencyIcon type="primary" />
			</div>
			<div className={styleIngredient.ingredient__name}>
					<span className={"text text_type_main-default"}>
						{props.name}
					</span>
			</div>
		</div>
	)
}

export default Ingredient

Ingredient.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	count: PropTypes.number,
	price: PropTypes.number.isRequired,
}