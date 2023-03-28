import React, {FunctionComponent, useEffect, useState} from "react";
import style from './ingredient-details.module.css'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentIngredient} from "../../services/ingredient-slice";

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

type TBurgerData = {
	readonly burger: {
		readonly data: TIngredientData[]
	}
}

interface IIngredientDetailsProps {
	isModal: boolean
}

interface IIngredientDetailsState {
	image_large: string,
	name: string,
	calories: number,
	proteins: number,
	fat: number,
	carbohydrates: number,
}

const IngredientDetails:FunctionComponent<IIngredientDetailsProps> = ({isModal}) => {
	const [state, setState] = useState<IIngredientDetailsState>()
	const params = useParams()
	const dataIngredients:TIngredientData[] | unknown = useSelector<TBurgerData>(state => state.burger.data)
	const dispatch = useDispatch()

	useEffect(() => {
		if (dataIngredients && Array.isArray(dataIngredients)) {
			const dataIngredient = dataIngredients.find( (item:TIngredientData) => item._id === params.ingredientId)
			setState(dataIngredient)
			if (state) {
				dispatch(getCurrentIngredient(state))
			}
		}
	}, [dataIngredients])

	return (
		<div className={!isModal ? style.detailIngredient : ''}>
			{state &&
				<div className={style.detailIngredient__content}>
				<div className={style.detailIngredient__img}>
					<img src={state.image_large} alt={state.name}/>
				</div>
				<div className="detailIngredient__info mt-4">
					<div className={style.detailIngredient__title + " text text_type_main-medium mb-8"}>{state.name}</div>
					<div className={style.detailIngredient__props}>
						<div className={style.detailIngredient__prop}>
							<span className={'text text_type_main-default mb-2'}>Калории, ккал</span>
							<span className={'text text_type_digits-default'}>{state.calories}</span>
						</div>
						<div className={style.detailIngredient__prop}>
							<span className={'text text_type_main-default mb-2'}>Белки, г</span>
							<span className={'text text_type_digits-default'}>{state.proteins}</span>
						</div>
						<div className={style.detailIngredient__prop}>
							<span className={'text text_type_main-default mb-2'}>Жиры, г</span>
							<span className={'text text_type_digits-default'}>{state.fat}</span>
						</div>
						<div className={style.detailIngredient__prop}>
							<span className={'text text_type_main-default mb-2'}>Углеводы, г</span>
							<span className={'text text_type_digits-default'}>{state.carbohydrates}</span>
						</div>
					</div>
				</div>
			</div>
			}
		</div>
	)
}
export default IngredientDetails