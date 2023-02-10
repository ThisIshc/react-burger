import React, {useEffect} from "react";
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

export default function ModalOverlay(props) {
	function pressKey() {
		props.pressKey()
	}

	useEffect(() => {
		window.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				pressKey()
			}
		})
	}, [])

	return (
		<div className={styles.modalOverlay} onClick={props.onClick} onKeyPress={pressKey} />
	)
}

ModalOverlay.propTypes = {
	onClick: PropTypes.func.isRequired
}