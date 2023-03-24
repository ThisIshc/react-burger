import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import style from './ingredient-details.module.css'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentIngredient} from "../../services/ingredient-slice";

export default function IngredientDetails(props) {
	const [state, setState] = useState(null)
	const params = useParams()
	const dataIngredients = useSelector(state => state.burger.data)
	const dispatch = useDispatch()

	useEffect(() => {
		if (dataIngredients) {
			const dataIngredient = dataIngredients.find((item => item._id === params.ingredientId))
			setState(dataIngredient)
			if (state) {
				dispatch(getCurrentIngredient(state))
			}
		}
	}, [dataIngredients])

	return (
		<div className={props && !props.isModal ? style.detailIngredient : ''}>
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

IngredientDetails.propTypes = {
	isModal: PropTypes.bool
}