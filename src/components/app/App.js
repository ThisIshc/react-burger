import React from 'react';
import './App.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { data } from "../../utils/data";

function App() {
	return (
		<div className="App">
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
		</div>
	);
}

export default App;
