import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./register.module.css"
import {Link, useNavigate} from "react-router-dom";
import {useRef, useState, useEffect, ChangeEvent, SyntheticEvent} from "react";
import {useSelector} from "react-redux";
import { fetchUserRegister} from "../../services/user-slice";
import {getCookie} from "../../utils/cookie";
import {IUserData} from "../../types/user";
import {useAppDispatch} from "../../services/store";

function RegisterPage() {
	const [state, setState] = useState({
		email: '',
		password: '',
		name: ''
	})
	const dispatch = useAppDispatch()
	const refForm = useRef<HTMLFormElement>(null)
	const userData = useSelector((data: IUserData) => data.user)
	const navigate = useNavigate();

	useEffect(() => {
		if (getCookie('accessToken')) {
			navigate('/')
		}
	}, [userData, navigate])

	const onChange = (e:ChangeEvent<HTMLInputElement>) => {
		setState({...state, [e.target.name]: e.target.value})
	}

	function handleSubmit(e: SyntheticEvent) {
		e.preventDefault()
		dispatch(fetchUserRegister(state))
	}

	return (
		<div className={style.page}>
			<div className={style.page__wrapper}>
				<div className={style.title + ' text text_type_main-medium mb-6'}>
					Регистрация
				</div>
				<form action="#" className={"form mb-20"} ref={refForm} onSubmit={handleSubmit}>
					<div className="form__wrapper">
						<div className="form__input mb-6">
							<Input
								type={'text'}
								placeholder={'Имя'}
								onChange={onChange}
								value={state.name}
								name={'name'}
								error={false}
								errorText={'Введите имя'}
								size={'default'}
							/>
						</div>
						<div className="form__input mb-6">
							<EmailInput
								onChange={onChange}
								value={state.email}
								name={'email'}
								isIcon={false}
							/>
						</div>
						<div className="form__input mb-6">
							<PasswordInput
								onChange={onChange}
								value={state.password}
								name={'password'}
							/>
						</div>
						{userData.errorMessage &&
							<div className={'text text_type_main-small mt-3 mb-6'}>{userData.errorMessage}</div>
						}
					</div>
					<div className={style.form__bottom}>
						<Button htmlType="submit" type="primary" size="large">
							Зарегистрироваться
						</Button>
					</div>
				</form>
				<div className={style.bottom}>
					<div className={'text text_type_main-default'}>
						Уже зарегистрированы? <Link to="/login">Войти</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage