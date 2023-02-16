import React, {useMemo, useState, useContext} from "react";
import {ConstructorElement, DragIcon, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from './burger-constructor.module.css'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {IngredientContext} from "../../utils/ingredient-context";
import createOrder from "../../utils/order-api";


function BurgerConstructor(props) {
	const [order, setOrder] = useState({
		order: {},
		hasError: false
	})


	const productsData = useContext(IngredientContext)

	const bun = useMemo(() => productsData.find((item) => item.type === 'bun'), [productsData])
	const products = useMemo(() => productsData.filter((item) => item.type !== 'bun'), [productsData])
	const sum = useMemo(() => {
		let sumIngredients = 0
		sumIngredients = bun.price * 2
		products.forEach((item) => {
			sumIngredients += item.price
		})
		return sumIngredients
	}, [bun, products])

	function handleClickOrder() {
		const ingredientsId = products.map((item) => item._id)
		return createOrder(ingredientsId)
			.then(data => {
				setOrder({...order, order: data, hasError: false})
			})
			.catch(e => {
				setOrder({...order, hasError: true})
			})
	}

	const closeModal = (e) => {
		setOrder({...order, hasError: false})
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
					<span className={"mr-2"}>{sum}</span>
					<CurrencyIcon type="primary" />
				</div>
				<div className="burgerConstructor__button ml-10">
					<Button htmlType="button" type="primary" size="large" onClick={handleClickOrder}>
						Оформить заказ
					</Button>
				</div>
			</div>
			{order.order.number !== undefined && !order.hasError &&
				<Modal onClose={closeModal} >
					<OrderDetails dataOrder={order.order}  />
				</Modal>
			}
			{order.hasError &&
				<Modal onClose={closeModal} >
					<div>Произошла ошибка при оформлении, попробуйте позже</div>
				</Modal>
			}
		</div>
	)
}

export default BurgerConstructor
