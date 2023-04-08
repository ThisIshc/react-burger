import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./forgot-password.module.css"
import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, SyntheticEvent, useEffect, useRef, useState} from "react";
import {fetchPasswordReset} from "../../services/user-slice";
import {useDispatch, useSelector} from "react-redux";

type TResetData = {
	readonly success: boolean,
	readonly message: string
}

interface IResetData {
	user: {
		resetData: TResetData
	}
}

const ForgotPage = () => {
	const [state, setState] = useState('')
	const dispatch = useDispatch()
	const refForm = useRef<HTMLFormElement>(null)
	const resetData:TResetData = useSelector((data: IResetData) => data.user.resetData)
	const navigate = useNavigate()

	useEffect(() => {
		if (resetData && resetData.success) {
			navigate('/reset-password')
		}
	}, [resetData, navigate])

	const onChange = (e:ChangeEvent<HTMLInputElement>) => {
		setState(e.target.value)
	}
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault()
		dispatch<any>(fetchPasswordReset(state))
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