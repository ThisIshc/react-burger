import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import tabsStyle from "./tabs.module.css"

function Tabs(props) {
	return (
		<div className={tabsStyle.tabs + " text text_type_main-default mb-10"}>
			{ props.tabs.map((tab, index) => {
				return tab.active ?
					<div className={tabsStyle.tabs__item} key={index}>
						<Tab value={tab.value} active={tab.value}>{tab.value}</Tab>
					</div>
					:
					<div className={tabsStyle.tabs__item} key={index}>
						<Tab value={tab.value}>{tab.value}</Tab>
					</div>
				}
			)}
		</div>
	)
}

export default Tabs