import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./forgot-password.module.css"
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {fetchPasswordReset} from "../../services/user-slice";
import {useDispatch, useSelector} from "react-redux";

function ForgotPage() {
	const [state, setState] = useState('')
	const dispatch = useDispatch()
	const refForm = useRef()
	const resetData = useSelector(data => data.user.resetData)
	const navigate = useNavigate()

	useEffect(() => {
		if (resetData && resetData.success) {
			navigate('/reset-password')
		}
	}, [resetData, navigate])

	const onChange = (e) => {
		setState(e.target.value)
	}
	function handleSubmit(e) {
		e.preventDefault()
		dispatch(fetchPasswordReset(state))
	}

	return (
		<div className={style.page}>
			<div className={style.page__wrapper}>
				<div className={style.title + ' text text_type_main-medium mb-6'}>
					Восстановление пароля
				</div>
				<form className={"form mb-20"} onSubmit={handleSubmit} ref={refForm}>
					<div className="form__wrapper">
						<div className="form__input mb-6">
							<EmailInput
								onChange={onChange}
								value={state}
								name={'email'}
								isIcon={false}
							/>
						</div>
					</div>
					<div className={style.form__bottom}>
						<Button htmlType="submit" type="primary" size="large" >
							Восстановить
						</Button>
					</div>
				</form>
				<div className={style.bottom}>
					<div className={'text text_type_main-default'}>
						Вспомнили пароль? <Link to="/login">Войти</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ForgotPage