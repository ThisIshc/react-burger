import React from "react";
import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";

class MenuList extends React.Component {
	render() {
		return (
			<nav>
				<ul>
					<li>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a href="#">
							<BurgerIcon type="primary" />
							<span className={""}>Конструктор</span>
						</a>
					</li>
					<li>
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a href="#">
							<ListIcon type="secondary" />
							<span>Лента заказов</span>
						</a>
					</li>
				</ul>
			</nav>
		)
	}
}

export default MenuList;