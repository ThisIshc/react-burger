import React, {FunctionComponent} from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import tabsStyle from "./tabs.module.css"

type TTab = {
	value: string,
	active: boolean,
	onClick: () => {}
}

interface ITabsProps {
	tabs: TTab[]
}

const Tabs:FunctionComponent<ITabsProps> = (props) => {
	return (
		<div className={tabsStyle.tabs + " text text_type_main-default mb-10"}>
			{ props.tabs.map((tab, index) => {
				return tab.active ?
					<div className={tabsStyle.tabs__item} key={index}>
						<Tab value={tab.value} onClick={() => {}} active={tab.active}>{tab.value}</Tab>
					</div>
					:
					<div className={tabsStyle.tabs__item} key={index}>
						<Tab value={tab.value} onClick={() => {}} active={tab.active}>{tab.value}</Tab>
					</div>
				}
			)}
		</div>
	)
}

export default Tabs