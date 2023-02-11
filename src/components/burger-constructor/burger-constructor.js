import React, {useMemo, useState} from "react";
import PropTypes from 'prop-types';
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from './burger-constructor.module.css'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const ingredientPropTypes = PropTypes.shape({
	__v: PropTypes.number.isRequired,
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	proteins: PropTypes.number.isRequired,
	fat: PropTypes.number.isRequired,
	carbohydrates: PropTypes.number.isRequired,
	calories: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_mobile: PropTypes.string.isRequired,
	image_large: PropTypes.string.isRequired,
	count: PropTypes.number,
	price: PropTypes.number.isRequired,
});

function BurgerConstructor(props) {
	const [isOpen, setIsOpen] = useState(false)

	const bun = useMemo(() => props.products.find((item) => item.type === 'bun'), [props.products])
	const products = useMemo(() => props.products.filter((item) => item.type !== 'bun'), [props.products])

	function handleClickOrder() {
		setIsOpen(true)
	}
	const closeModal = (e) => {
		setIsOpen(!e)
	}

	return (
		<div className={"burgerConstructor mt-25"}>
			<div className={constructorStyle.burgerConstructor__list + " pl-4 pr-4"}>
				<div className={constructorStyle.burgerConstructor__item}>
					<ConstructorElement
						type="top"
						isLocked={true}
						text={bun.name + " верх"}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
				<div className={constructorStyle.burgerConstructor__wrapper}>
					{products.map((item,index) => (
						<div className={constructorStyle.burgerConstructor__item} key={index}>
							<div className="burgerConstructor__icon mr-2">
								<DragIcon type="primary" />
							</div>
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image}
							/>
						</div>
					))}
				</div>
				<div className={constructorStyle.burgerConstructor__item}>
					<ConstructorElement
						type="bottom"
						isLocked={true}
						text={bun.name + " низ"}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			</div>
			<div className={constructorStyle.burgerConstructor__bottom + " mt-10"}>
				<div className={constructorStyle.burgerConstructor__sum + " text text_type_digits-medium"}>
					<span className={"mr-2"}>{props.sum}</span>
					<CurrencyIcon type="primary" />
				</div>
				<div className="burgerConstructor__button ml-10">
					<Button htmlType="button" type="primary" size="large" onClick={handleClickOrder}>
						Оформить заказ
					</Button>
				</div>
			</div>
			{isOpen &&
				<Modal onClose={closeModal} >
					<OrderDetails />
				</Modal>
			}
		</div>
	)
}

export default BurgerConstructor

BurgerConstructor.propTypes = {
	products: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
	sum: PropTypes.number.isRequired
}