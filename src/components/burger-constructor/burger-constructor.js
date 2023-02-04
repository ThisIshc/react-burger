import React from "react";
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from './burger-constructor.module.css'

import bun_1 from "../../images/ingredients/bun-01.png";
import sauce_3 from "../../images/ingredients/sauce-03.png";
import meat_2 from "../../images/ingredients/meat-02.png";
import rings from "../../images/ingredients/mineral-rings.png";
import sp_1 from "../../images/ingredients/mineral-rings.png";

const constructorPropTypes = PropTypes.shape({
	img: PropTypes.string,
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	type: PropTypes.string,
	isLocked: PropTypes.bool
});

class BurgerConstructor extends React.Component {
	render() {
		return (
			<div className={"burgerConstructor mt-25"}>
				<div className={constructorStyle.burgerConstructor__list + " pl-4 pr-4"}>
					<div className={constructorStyle.burgerConstructor__item}>
						<ConstructorElement
							type="top"
							isLocked={true}
							text="Краторная булка N-200i (верх)"
							price={20}
							thumbnail={bun_1}
						/>
					</div>
					<div className={constructorStyle.burgerConstructor__wrapper}>
						<div className={constructorStyle.burgerConstructor__item}>
							<div className="burgerConstructor__icon mr-2">
								<DragIcon type="primary" />
							</div>
							<ConstructorElement
								text="Соус традиционный галактический"
								price={30}
								thumbnail={sauce_3}
							/>
						</div>
						<div className={constructorStyle.burgerConstructor__item}>
							<div className="burgerConstructor__icon mr-2">
								<DragIcon type="primary" />
							</div>
							<ConstructorElement
								text="Мясо бессмертных моллюсков Protostomia"
								price={300}
								thumbnail={meat_2}
							/>
						</div>
						<div className={constructorStyle.burgerConstructor__item}>
							<div className="burgerConstructor__icon mr-2">
								<DragIcon type="primary" />
							</div>
							<ConstructorElement
								text="Плоды Фалленианского дерева"
								price={80}
								thumbnail={sp_1}
							/>
						</div>
						<div className={constructorStyle.burgerConstructor__item}>
							<div className="burgerConstructor__icon mr-2">
								<DragIcon type="primary" />
							</div>
							<ConstructorElement
								text="Хрустящие минеральные кольца"
								price={80}
								thumbnail={rings}
							/>
						</div>
						<div className={constructorStyle.burgerConstructor__item}>
							<div className="burgerConstructor__icon mr-2">
								<DragIcon type="primary" />
							</div>
							<ConstructorElement
								text="Хрустящие минеральные кольца"
								price={80}
								thumbnail={rings}
							/>
						</div>
						<div className={constructorStyle.burgerConstructor__item}>
							<div className="burgerConstructor__icon mr-2">
								<DragIcon type="primary" />
							</div>
							<ConstructorElement
								text="Хрустящие минеральные кольца"
								price={80}
								thumbnail={rings}
							/>
						</div>
						<div className={constructorStyle.burgerConstructor__item}>
							<div className="burgerConstructor__icon mr-2">
								<DragIcon type="primary" />
							</div>
							<ConstructorElement
								text="Хрустящие минеральные кольца"
								price={80}
								thumbnail={rings}
							/>
						</div>
					</div>
					<div className={constructorStyle.burgerConstructor__item}>
						<ConstructorElement
							type="bottom"
							isLocked={true}
							text="Краторная булка N-200i (низ)"
							price={20}
							thumbnail={bun_1}
						/>
					</div>
				</div>
				<div className={constructorStyle.burgerConstructor__bottom + " mt-10"}>
					<div className={constructorStyle.burgerConstructor__sum + " text text_type_digits-medium"}>
						<span className={"mr-2"}>610</span>
						<CurrencyIcon type="primary" />
					</div>
					<div className="burgerConstructor__button ml-10">
						<Button htmlType="button" type="primary" size="large">
							Оформить заказ
						</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default BurgerConstructor

BurgerConstructor.propTypes = {
	products: PropTypes.arrayOf(PropTypes.objectOf(constructorPropTypes)).isRequired,
	sum: PropTypes.number.isRequired,
}