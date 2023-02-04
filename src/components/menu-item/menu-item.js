import React from "react";
import menuItemStyles from "./menu-item.module.css"
import PropTypes from "prop-types";

function MenuItem (props) {
	const styleLink = props.type === "secondary" ? `${menuItemStyles.link_secondary}` : `${menuItemStyles.link_primary}`;
	return (
		<div className={"pl-5 pr-5 pt-4 pb-4"}>
			<a href={props.link} className={menuItemStyles.link + " " + styleLink}>
				{props.children}
				<span className={"ml-2"}>{props.text}</span>
			</a>
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