import React, {FunctionComponent, useCallback, useEffect, useMemo} from "react";
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from './burger-constructor.module.css'
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {addIngredient, fetchCreateOrder, clearOrder, updateList } from "../../services/burger-constructor-slice";
import {updateData} from "../../services/burger-slice";
import { v4 as uuidv4 } from 'uuid';
import IngredientConstructor from "../ingredient-constructor/ingredient-constructor";
import {getCookie} from "../../utils/cookie";
import {useAppDispatch, useAppSelector} from "../../services/store";
import {Link} from "react-router-dom";

type TIngredient = {
	readonly dragId: string,
	readonly id: string,
	readonly image: string,
	readonly name: string,
	readonly type: string,
	readonly index: number,
	readonly price: number,
}

interface IDataConstructor {
	ingredients: TIngredient[],
	buns: TIngredient[],
	order: any,
	modalIsOpen: boolean
	hasError: boolean
}

const BurgerConstructor:FunctionComponent = () => {
	const dispatch = useAppDispatch()
	const dataConstructor:IDataConstructor | any = useAppSelector((state) => state.order)

	const bun = useMemo(() => {
		if (dataConstructor && dataConstructor.buns && Array.isArray(dataConstructor.buns)) {
			return dataConstructor.buns.find((item:TIngredient) => item.type === 'bun')
		}
	}, [dataConstructor])
	const products = useMemo(() => {
		if (dataConstructor && dataConstructor.ingredients && Array.isArray(dataConstructor.ingredients)) {
			return dataConstructor.ingredients.filter((item:TIngredient) => item.type !== 'bun')
		}
	}, [dataConstructor])
	const sum = useMemo(() => {
		if (bun) {
			let sumIngredients = 0
			sumIngredients = bun.price * 2
			products.forEach((item:TIngredient) => {
				sumIngredients += item.price
			})
			return sumIngredients
		}
		return 0
	}, [bun, products])

	const handleClickOrder = () => {
		const productsIds = products ? products.map((item:TIngredient) => item.id) : null
		const ingredientsId = [...productsIds, bun.id, bun.id]
		dispatch(fetchCreateOrder(ingredientsId))
	}

	useEffect(() => {
		if (products.length || bun) {
			dispatch(updateData({products: products, bun: bun}))
		}
	}, [products, bun, dispatch])

	const closeModal = () => {
		dispatch(clearOrder())
	}

	const [, dropTargetRef] = useDrop({
		accept: 'ingredient',
		collect: monitor => ({
			isHover: monitor.isOver()
		}),
		drop(item) {
			dispatch(addIngredient({...(item as TIngredient), dragId: uuidv4()}))
		}
	})

	const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
		const dragCard = dataConstructor.ingredients[dragIndex]
		const newCards = [...dataConstructor.ingredients]
		newCards.splice(dragIndex, 1)
		newCards.splice(hoverIndex, 0, dragCard)
		dispatch(updateList({items: newCards}))

	}, [dataConstructor.ingredients, dispatch])

	return (
		<div className={constructorStyle.burgerConstructor + " pt-25"}>
			<div className={constructorStyle.burgerConstructor__list + " pl-4 pr-4"} ref={dropTargetRef}>
				{bun &&
					<div className={constructorStyle.burgerConstructor__item}>
						<ConstructorElement
							type="top"
							isLocked={true}
							text={bun.name + " верх"}
							price={bun.price}
							thumbnail={bun.image}
						/>
					</div>
				}
				{products &&
					<div className={constructorStyle.burgerConstructor__wrapper}  >
						{products.map((item: TIngredient,index: number) => (
							<IngredientConstructor key={item.dragId} index={index} item={item} moveCard={moveCard} />
						))}
					</div>
				}
				{bun &&
					<div className={constructorStyle.burgerConstructor__item}>
						<ConstructorElement
							type="bottom"
							isLocked={true}
							text={bun.name + " низ"}
							price={bun.price}
							thumbnail={bun.image}
						/>
					</div>
				}
				{ !(bun && products) &&
					<div>Собери свой бургер <br/> перенесите ингредиенты в эту область</div>
				}
			</div>
			<div className={constructorStyle.burgerConstructor__bottom + " mt-10"}>
				<div className={constructorStyle.burgerConstructor__sum + " text text_type_digits-medium"}>
					<span className={"mr-2"}>{sum}</span>
					<CurrencyIcon type="primary" />
				</div>
				{ (bun && products) &&
					<div className="burgerConstructor__button ml-10">
						{ getCookie('accessToken') ?
							<Button htmlType="button" type="primary" size="large" onClick={handleClickOrder}>
								Оформить заказ
							</Button>
							:
							<Link to={'/login'}>
								<Button htmlType="button" type="primary" size="large">
									Оформить заказ
								</Button>
							</Link>
						}
					</div>
				}
			</div>
			{dataConstructor.order.number !== undefined &&
				<Modal onClose={closeModal} >
					<OrderDetails number={dataConstructor.order.number}  />
				</Modal>
			}
			{dataConstructor.hasError &&
				<Modal onClose={closeModal} >
					<div>Произошла ошибка при оформлении, попробуйте позже</div>
				</Modal>
			}
		</div>
	)
}

export default BurgerConstructor
