import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './modal.module.css';
import PropTypes from "prop-types";

const modalRoot = document.querySelector('#react-modals')

export default function Modal(props) {
	/* eslint-disable */
	const onClose = () => {
		props.onClose(true)
	}
	/* eslint-enable */

	useEffect(() => {
		const handleESCclose = (e) => {
			// eslint-disable-next-line no-unused-expressions
			e.key === 'Escape' ? onClose() : null
		}
		document.addEventListener('keydown', handleESCclose)

		return () => document.removeEventListener('keydown', handleESCclose)

	}, [onClose])

	return ReactDOM.createPortal (
		(
			<div className={style.modal}>
				<div className={style.modal__content + " pt-10 pl-10 pr-10 pb-15"}>
					<div className={style.modal__close} onClick={onClose}>
						<CloseIcon type="primary" />
					</div>
					{props.title &&
						<div className={style.modal__title + " text text_type_main-large"}>{props.title}</div>
					}
					{props.children}
				</div>
				<ModalOverlay onClose={onClose} pressKey={onClose} />
			</div>
		), modalRoot
	)
}

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.element.isRequired
}