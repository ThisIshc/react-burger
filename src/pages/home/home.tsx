import React, {FunctionComponent} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {useAppSelector} from "../../services/store";

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

interface IIngredients {
	data: TIngredientData[],
	isLoading: boolean,
	hasError: boolean,
}

interface IIngredientsState {
	burger: {
		data: TIngredientData[],
		isLoading: boolean,
		hasError: boolean,
	}
}

const Home:FunctionComponent = () => {
	const ingredients = useAppSelector(state => state.burger)

	if (ingredients) {
		let {isLoading, hasError, data}: { isLoading?: boolean, hasError?: boolean, data?: TIngredientData[]} = ingredients
		return (
			<div className="App">
				{isLoading && 'Загрузка'}
				{hasError && 'Произошла ошибка'}
				{!hasError && !isLoading && data?.length &&
					<>
						<main>
							<div className="burger__content">
								<div className="container">
									<div className="burger__wrapper">
										<DndProvider backend={HTML5Backend}>
											<div className="burger__block">
												<BurgerIngredients/>
											</div>
											<div className="burger__block">
												<BurgerConstructor/>
											</div>
										</DndProvider>
									</div>
								</div>
							</div>
						</main>
					</>
				}
			</div>
		);
	} else {
		return <></>
	}
}

export default Home