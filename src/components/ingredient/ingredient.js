import React from "react";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styleIngredient from "./ingredient.module.css"

class Ingredient extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={styleIngredient.ingredient}>
				<div className={styleIngredient.ingredient__counter}>
					{this.props.count && this.props.count > 0
						? <Counter count={this.props.count} size="default" extraClass="m-1" />
						: ''
					}
				</div>
				<div className={styleIngredient.ingredient__img + " pl-4 pr-4 mb-1"}>
					<img src={this.props.img} alt={this.props.name}/>
				</div>
				<div className={styleIngredient.ingredient__price + " text text_type_main-medium mb-1"}>
					<span className={"mr-2"}>
						{this.props.price}
					</span>
					<CurrencyIcon type="primary" />
				</div>
				<div className={styleIngredient.ingredient__name}>
					<span className={"text text_type_main-default"}>
						{this.props.name}
					</span>
				</div>
			</div>
		)
	}
}

export default Ingredient