import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./reset-password.module.css"
import {Link, useNavigate} from "react-router-dom";
import {fetchResetPassword} from "../../services/user-slice";
import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../services/store";


function ResetPage() {
	const [state, setState] = useState({
		password: '',
		token: '',
	})
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const resetPassword = useAppSelector((data) => data.user.resetPassword)

	useEffect(() => {
		if (resetPassword) {
			navigate('/login')
		}
	})

	const onChange = (e:ChangeEvent<HTMLInputElement>) => {
		setState({...state, [e.target.name]: e.target.value})
	}
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault()
		dispatch(fetchResetPassword(state))
	}

	return (
		<div className={style.page}>
			<div className={style.page__wrapper}>
				<div className={style.title + ' text text_type_main-medium mb-6'}>
					Восстановление пароля
				</div>
				<form action="/reset-password" className={"form mb-20"} onSubmit={handleSubmit}>
					<div className="form__wrapper">
						<div className="form__input mb-6">
							<PasswordInput
								onChange={onChange}
								value={state.password}
								name={'password'}
								placeholder={'Введите новый пароль'}
							/>
						</div>
						<div className="form__input mb-6">
							<Input
								type={'text'}
								placeholder={'Введите код из письма'}
								onChange={onChange}
								value={state.token}
								name={'token'}
								error={false}
								errorText={'Введите код'}
								size={'default'}
							/>
						</div>
					</div>
					<div className={style.form__bottom}>
						<Button htmlType="submit" type="primary" size="large">
							Сохранить
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

export default ResetPage