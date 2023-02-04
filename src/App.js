import React from 'react';
import './App.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import { data } from "./utils/data";

console.log(data)
function App() {
	return (
		<div className="App">
			<AppHeader />
			<main>
				<div className="burger__content">
					<div className="container">
						<div className="burger__wrapper">
							<div className="burger__block">
								<BurgerIngredients />
							</div>
							<div className="burger__block">
								<BurgerConstructor />
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;
