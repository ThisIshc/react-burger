import React, {FunctionComponent} from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {useAppSelector} from "../../services/store";
import style from './../../components/app/app.module.css'
import {TIngredient} from "../../types/ingredient";

const Home:FunctionComponent = () => {
	const ingredients = useAppSelector(state => state.burger)

	if (ingredients) {
		let {isLoading, hasError, data}: { isLoading?: boolean, hasError?: boolean, data?: TIngredient[]} = ingredients
		return (
			<div className="App">
				{isLoading && 'Загрузка'}
				{hasError && 'Произошла ошибка'}
				{!hasError && !isLoading && data?.length &&
					<>
						<main>
							<div className="burger__content">
								<div className="container">
									<div className={style.burger__wrapper}>
										<DndProvider backend={HTML5Backend}>
											<div className={style.burger__block}>
												<BurgerIngredients/>
											</div>
											<div className={style.burger__block}>
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