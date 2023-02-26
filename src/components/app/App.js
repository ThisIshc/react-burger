import React, {useEffect, useState} from 'react';
import './App.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
	const dispatch = useDispatch()
	const ingredients = useSelector(state => state.burger)

	useEffect(() => {
		dispatch(fetchIngredients())
	}, [dispatch])

	const {data, isLoading, hasError} = ingredients

	return (
		<div className="App">
			{isLoading && 'Загрузка'}
			{hasError && 'Произошла ошибка'}
			{!hasError && !isLoading && data.length &&
				<>
					<AppHeader />
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

export default App;
