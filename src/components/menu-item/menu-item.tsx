import React, {FunctionComponent, ReactElement} from "react";
import styles from "./menu-item.module.css"
import {NavLink, useLocation} from "react-router-dom";

type TMenuItemProps = {
	text: string;
	link: string;
	children: ReactElement
}

const MenuItem:FunctionComponent<TMenuItemProps> = ({text, link, children}) => {
	const location = useLocation()

	return (
		<div className={"pl-5 pr-5 pt-4 pb-4"}>
			<NavLink
				to={{pathname: link}}
				state={{ from: location.pathname }}
			 	className={({ isActive }) => isActive ? styles.link + ' ' + styles.active : styles.link}
			>
				{children}
				<span className={"ml-2"}>{text}</span>
			</NavLink>
		</div>
	)
}

export default MenuItem