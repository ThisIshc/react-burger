import React, {FunctionComponent} from "react";
import styleIngredients from "./ingredients-group.module.css";
import Ingredient from "../ingredient/ingredient";
import {Link, useLocation} from "react-router-dom";

type TIngredientData = {
	readonly __v: number,
	readonly _id: string,
	readonly name: string,
	readonly type: string,
	readonly proteins: number,
	readonly fat: number,
	readonly carbohydrates: number,
	readonly calories: number,
	readonly image: string,
	readonly image_mobile: string,
	readonly image_large: string,
	readonly count?: number,
	readonly price: number,
}

type TIngredientsGroupProps = {
	readonly title: string,
	readonly data: TIngredientData[],
	readonly getIngredient: (ingredient: TIngredientData | undefined) => void
}

const IngredientsGroup:FunctionComponent<TIngredientsGroupProps> = (props) => {
	const location = useLocation()

	const getIngredient = (id:string) => {
		const ingredientData = props.data.find(item => item._id === id)
		props.getIngredient(ingredientData)
	}

	return (
		<div className="ingredientsGroup mb-10">
			<div className="ingredientsGroup__title text text_type_main-medium mb-6">
				{props.title}
			</div>
			<div className={styleIngredients.ingredientsGroup__list + " pl-4 pr-4"}>
				{props.data.map((item, index) => (
					<Link to={{
						pathname: '/ingredients/'+ item._id
					}}
						 state={{background: location}}
						  className={styleIngredients.ingredientsGroup__item +" pr-3"}
						  key={index}
					id={'ingredient_'+index}>
						<Ingredient id={item._id} image={item.image} count={item.count} price={item.price} name={item.name} type={item.type} getIngredient={getIngredient} />
					</Link>
					)
				)}
			</div>
		</div>
	)
}

export default IngredientsGroup