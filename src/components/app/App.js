import React, {useEffect, useState} from 'react';
import './App.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import getIngredientsApi from "../../utils/burger-api";
import {IngredientContext} from "../../utils/ingredient-context";

function App() {
	const [state, setState] = useState({
		data: [],
		isLoading: false,
		hasError: false
	})

	/* eslint-disable */
	useEffect(() => {
		getIngredients();
	}, [])
	/* eslint-enable */

	const getIngredients = () => {
		setState({...state, isLoading: true, hasError: false})
		getIngredientsApi()
			.then(data => setState({...state, data: data.data, isLoading: false}))
			.catch(e => {
				setState({...state, isLoading: false, hasError: true})
			})
	}

	const {data, isLoading, hasError} = state
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
								<IngredientContext.Provider value={data}>
									<div className="burger__wrapper">
										<div className="burger__block">
											<BurgerIngredients />
										</div>
										<div className="burger__block">
											<BurgerConstructor />
										</div>
									</div>
								</IngredientContext.Provider>
							</div>
						</div>
					</main>
				</>
			}
		</div>
	);
}

export default App;
