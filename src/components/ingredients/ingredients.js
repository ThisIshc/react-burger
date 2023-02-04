import React from "react";
import Ingredient from "../ingredient/ingredient";

import bun_2 from "../../images/ingredients/bun-02.png";
import bun_1 from "../../images/ingredients/bun-01.png";
import sauce_1 from "../../images/ingredients/sauce-01.png";
import sauce_2 from "../../images/ingredients/sauce-02.png";
import sauce_3 from "../../images/ingredients/sauce-03.png";
import sauce_4 from "../../images/ingredients/sauce-04.png";
import meat_1 from "../../images/ingredients/meat-01.png";
import meat_2 from "../../images/ingredients/meat-02.png";
import meat_3 from "../../images/ingredients/meat-03.png";
import meat_4 from "../../images/ingredients/meat-04.png";


import styleIngredients from './ingredients.module.css'

class Ingredients extends React.Component {
	render() {
		return (
			<div className={styleIngredients.ingredients}>
				<div className="ingredients__block mb-10">
					<div className="ingredients__title text text_type_main-medium mb-6">
						Булки
					</div>
					<div className={styleIngredients.ingredients__list + " pl-4 pr-4"}>
						<div className={styleIngredients.ingredients__item + " pr-3"}>
							<Ingredient img={bun_2} count={1} price={20} name={"Краторная булка N-200i"} />
						</div>
						<div className={styleIngredients.ingredients__item + " pr-3"}>
							<Ingredient img={bun_1} price={20} name={"Флюоресцентная булка R2-D3"} />
						</div>
					</div>
				</div>
				<div className="ingredients__block mb-10">
					<div className="ingredients__title text text_type_main-medium mb-6">
						Соусы
					</div>
					<div className={styleIngredients.ingredients__list + " pl-4 pr-4"}>
						<div className={styleIngredients.ingredients__item + " pr-3 mb-8"}>
							<Ingredient img={sauce_2} price={30} name={"Соус Spicy-X"} />
						</div>
						<div className={styleIngredients.ingredients__item + " pr-3 mb-8"}>
							<Ingredient img={sauce_4} price={30} name={"Соус фирменный Space Sauce"} />
						</div>
						<div className={styleIngredients.ingredients__item + " pr-3 mb-8"}>
							<Ingredient img={sauce_3} count={1} price={30} name={"Соус традиционный галактический"} />
						</div>
						<div className={styleIngredients.ingredients__item + " pr-3 mb-8"}>
							<Ingredient img={sauce_1} price={30} name={"Соус с шипами Антарианского плоскоходца"} />
						</div>
					</div>
				</div>
				<div className="ingredients__block mb-10">
					<div className="ingredients__title text text_type_main-medium mb-6">
						Начинки
					</div>
					<div className={styleIngredients.ingredients__list + " pl-4 pr-4"}>
						<div className={styleIngredients.ingredients__item + " pr-3 mb-8"}>
							<Ingredient img={meat_1} price={300} name={"Биокотлета из марсианской Магнолии"} />
						</div>
						<div className={styleIngredients.ingredients__item + " pr-3 mb-8"}>
							<Ingredient img={meat_2} price={300} name={"Мясо бессмертных моллюсков Protostomia"} />
						</div>
						<div className={styleIngredients.ingredients__item + " pr-3 mb-8"}>
							<Ingredient img={meat_3} count={1} price={300} name={"Филе Люминесцентного тетраодонтимформа"} />
						</div>
						<div className={styleIngredients.ingredients__item + " pr-3 mb-8"}>
							<Ingredient img={meat_4} price={300} name={"Говяжий метеорит (отбивная)"} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Ingredients