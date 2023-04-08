import React, {FunctionComponent} from "react";
import styles from './modal-overlay.module.css'

type TModalOverlayProps = {
	onClose: () => void
}

const ModalOverlay:FunctionComponent<TModalOverlayProps> = (props) => {
	return (
		<div className={styles.modalOverlay} onClick={props.onClose} />
	)
}

export default ModalOverlay