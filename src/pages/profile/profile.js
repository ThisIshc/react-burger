import ProfileMenu from "../../components/profile-menu/profile-menu";
import style from "./profile.module.css"
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUpdateUser} from "../../services/user-slice";

function ProfilePage() {
	const [state, setState] = useState({
		email: {
			value: '',
			disabled: true,
			icon: "EditIcon"
		},
		password: {
			value: '',
			disabled: true,
			icon: "EditIcon"
		},
		name: {
			value: '',
			disabled: true,
			icon: "EditIcon"
		},
		changeData: false
	})
	const dispatch = useDispatch()
	const userData = useSelector(state => state.user.userData)

	useEffect(() => {
		if (userData) {
			setState({
				...state,
				email: {
					...state.email,
					value: userData.email
				},
				name: {
					...state.name,
					value: userData.name
				}
			})
		}
	}, [userData])

	const onChange = (e) => {
		setState({
			...state,
			[e.target.name]: {
				...state[e.target.name],
				value: e.target.value
			},
			changeData: true
		})
	}
	const onIconClick = (e) => {
		const input = e.target.closest('.input__container').querySelector('input')
		const inputName = e.target.closest('.input__container').querySelector('input').getAttribute('name')

		setState({
			...state,
			[inputName]: {
				...[inputName],
				icon: !state[inputName].disabled ? "EditIcon" : "CloseIcon",
				disabled: !state[inputName].disabled,
				value: state[inputName].value
			}
		})

		if (!state[inputName].disabled) {
			setTimeout(() => input.blur(), 0)
		} else {
			setTimeout(() => input.focus(), 0)
		}
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(fetchUpdateUser({
			email: state.email.value,
			name: state.name.value,
			password: state.password.value,
		}))
		setState({
			...state,
			changeData: false
		})
	}
	const cancelUpdate = () => {
		setState({
			...state,
			email: {
				...state.email,
				value: userData.email
			},
			name: {
				...state.name,
				value: userData.name
			},
			password: {
				...state.password,
				value: ''
			},
			changeData: false
		})
	}

	return (
		<div className={style.profile}>
			<div className={style.profile__container + " container"}>
				<div className={style.profile__menu + " mr-15"}>
					<ProfileMenu />
				</div>
				<div className={style.profile__content}>
					<form action={"/"} className="profile__form" onSubmit={handleSubmit}>
						<div className="profile__input mb-6">
							<Input
								type={'text'}
								placeholder={'Имя'}
								onChange={onChange}
								value={state.name.value}
								name={'name'}
								error={false}
								errorText={'Введите имя'}
								size={'default'}
								icon={state.name.icon}
								disabled={state.name.disabled}
								onIconClick={onIconClick}
							/>
						</div>
						<div className="profile__input mb-6">
							<EmailInput
								onChange={onChange}
								value={state.email.value}
								name={'email'}
								isIcon={true}
								disabled={state.email.disabled}
								onIconClick={onIconClick}
								icon={state.email.icon}
							/>
						</div>
						<div className="profile__input mb-6">
							<Input
								type={'password'}
								onChange={onChange}
								placeholder={'Пароль'}
								value={state.password.value}
								name={'password'}
								size={'default'}
								icon={state.password.icon}
								disabled={state.password.disabled}
								onIconClick={onIconClick}
							/>
						</div>
						{state.changeData &&
							<div className={style.profile__bottom}>
								<Button htmlType="button" type="secondary" size="medium" onClick={cancelUpdate}>
									Отмена
								</Button>
								<Button htmlType="submit" type="primary" size="medium">
									Сохранить
								</Button>
							</div>
						}
					</form>
				</div>
			</div>
		</div>
	)
}

export default ProfilePage