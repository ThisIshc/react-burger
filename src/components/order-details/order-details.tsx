import React, {FunctionComponent} from "react";
import PropTypes from 'prop-types';
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import orderIcon from '../../images/order-icon.png'
import style from './order-details.module.css'

type TOrderDetails = {
	readonly number: number
}

const OrderDetails:FunctionComponent<TOrderDetails> = (props) => {
	return (
		<div className={'orderDetails mb-15'}>
			<div className="orderDetails__content">
				<div className={style.orderDetails__number}>
					<span className={'text text_type_digits-large mb-8'}>{props.number}</span>
					<b className={'text text_type_main-medium mb-15'}>идентификатор заказа</b>
				</div>
				<div className={style.orderDetails__icon + " mb-15"}>
					<CheckMarkIcon type="primary" />
					<img src={orderIcon} alt="order-icon"/>
				</div>
				<div className={style.orderDetails__info }>
					<span className={'text text_type_main-default mb-2'}>Ваш заказ начали готовить</span>
					<span className={'text text_type_main-default secondary-text'}>Дождитесь готовности на орбитальной станции</span>
				</div>
			</div>
		</div>
	)
}

export default OrderDetails
