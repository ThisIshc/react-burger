import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import tabsStyle from "./tabs.module.css"

class Tabs extends React.Component {
	render() {
		return (
			<div className={tabsStyle.tabs + " text text_type_main-default mb-10"}>
				<div className={tabsStyle.tabs__item}>
					<Tab value={"Булки"} active={"Булки"}>
						Булки
					</Tab>
				</div>
				<div className={tabsStyle.tabs__item}>
					<Tab value={"Соусы"} >
						Соусы
					</Tab>
				</div>
				<div className={tabsStyle.tabs__item}>
					<Tab value={"Начинки"} >
						Начинки
					</Tab>
				</div>
			</div>
		)
	}
}

export default Tabs