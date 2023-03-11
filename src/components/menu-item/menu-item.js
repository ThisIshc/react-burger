import React from "react";
import styles from "./menu-item.module.css"
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

function MenuItem (props) {
	return (
		<div className={"pl-5 pr-5 pt-4 pb-4"}>
			<NavLink to={{ pathname: props.link }}
					 className={({ isActive }) => isActive ? styles.link + ' ' + styles.active : styles.link}
			>
				{props.children}
				<span className={"ml-2"}>{props.text}</span>
			</NavLink>
		</div>
	)
}

export default MenuItem

MenuItem.propTypes = {
	type: PropTypes.string,
	link: PropTypes.string.isRequired,
	children: PropTypes.element,
	text: PropTypes.string.isRequired,
}