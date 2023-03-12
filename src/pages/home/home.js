import {useSelector} from "react-redux";
import React from "react";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";


function Home() {
	const ingredients = useSelector(state => state.burger)

	const {data, isLoading, hasError} = ingredients

	return (
		<div className="App">
			{isLoading && 'Загрузка'}
			{hasError && 'Произошла ошибка'}
			{!hasError && !isLoading && data.length &&
				<>
					<main>
						<div className="burger__content">
							<div className="container">
								<div className="burger__wrapper">
									<DndProvider backend={HTML5Backend}>
										<div className="burger__block">
											<BurgerIngredients />
										</div>
										<div className="burger__block">
											<BurgerConstructor />
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
}

export default Home