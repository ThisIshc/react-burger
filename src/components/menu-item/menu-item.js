import React from "react";
import menuItemStyles from "./menu-item.module.css"

class MenuItem extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		const styleLink = this.props.type === "secondary" ? `${menuItemStyles.link_secondary}` : `${menuItemStyles.link_primary}`;
		return (
			<div className={"pl-5 pr-5 pt-4 pb-4"}>
				<a href={this.props.link} className={menuItemStyles.link + " " + styleLink}>
					{this.props.children}
					<span className={"ml-2"}>{this.props.text}</span>
				</a>
			</div>
		)
	}
}

export default MenuItem