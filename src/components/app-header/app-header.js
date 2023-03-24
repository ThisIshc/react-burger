import React from 'react';
import headerStyles from "./app-header.module.css"
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import MenuItem from "../menu-item/menu-item";

function AppHeader() {
	return (
		<header className={headerStyles.header + ' text text_type_main-default'}>
			<div className="container p-4">
				<div className={headerStyles.header__content}>
					<nav className={headerStyles.header__menu}>
						<MenuItem link={"/"} text={"Конструктор"}>
							<BurgerIcon />
						</MenuItem>
						<MenuItem link={"/order"} text={"Лента заказов"} type={"secondary"}>
							<ListIcon />
						</MenuItem>
					</nav>
					<Logo />
					<nav className="header__menu">
						<MenuItem link={"/profile"} text={"Личный кабинет"}>
							<ProfileIcon />
						</MenuItem>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default AppHeader;


