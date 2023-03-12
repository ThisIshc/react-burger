import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./login.module.css"
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserAuth} from "../../services/user-slice";

function LoginPage() {
	const [state, setState] = useState({
		email: '',
		password: '',
	})
	const dispatch = useDispatch()
	const userData = useSelector(data => data.user)

	const onChange = (e) => {
		setState({...state, [e.target.name]: e.target.value})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(fetchUserAuth(state))
	}

	return (
		<div className={style.page}>
			<div className={style.page__wrapper}>
				<div className={style.title + ' text text_type_main-medium mb-6'}>
					Вход
				</div>
				<form action={"/"} className={"form mb-20"} onSubmit={handleSubmit}>
					<div className="form__wrapper">
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
							Войти
						</Button>
					</div>
				</form>
				<div className={style.bottom}>
					<div className={'text text_type_main-default mb-4'}>
						Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
					</div>
					<div className={'text text_type_main-default'}>
						Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage