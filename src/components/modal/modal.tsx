import React, {FunctionComponent, ReactElement, useEffect} from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './modal.module.css';

type TModalProps = {
	title?: string,
	onClose: () => void,
	children: ReactElement
}

const modalRoot:HTMLElement | null = document.querySelector('#react-modals')


const Modal:FunctionComponent<TModalProps> = (props) => {
	/* eslint-disable */
	const onClose = () => {
		props.onClose()
	}
	/* eslint-enable */

	useEffect(() => {
		const handleESCclose = (e:KeyboardEvent) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			e.key === 'Escape' ? onClose() : null
		}
		document.addEventListener('keydown', handleESCclose)

		return () => document.removeEventListener('keydown', handleESCclose)

	}, [onClose])

	if (modalRoot) {
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
					<ModalOverlay onClose={onClose} />
				</div>
			), modalRoot
		)
	} else {
		return <></>
	}
}

export default Modal