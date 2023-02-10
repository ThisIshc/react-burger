import React, {useEffect, useState} from 'react';
import './App.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
	const [state, setState] = useState({
		data: [],
		isLoading: false,
		hasError: false
	})

	useEffect(() => {
		getIngredients();
	}, [])

	const getIngredients = () => {
		setState({...state, isLoading: true, hasError: false})
		fetch(API_URL)
			.then(res => res.json())
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
								<div className="burger__wrapper">
									<div className="burger__block">
										<BurgerIngredients ingredients={data} />
									</div>
									<div className="burger__block">
										<BurgerConstructor products={data} sum={610} />
									</div>
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
