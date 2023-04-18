import ProfileMenu from "../../components/profile-menu/profile-menu";
import style from "./profile.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {ChangeEvent, FunctionComponent, SyntheticEvent, useEffect, useState} from "react";
import {fetchUpdateUser} from "../../services/user-slice";
import {useAppDispatch, useAppSelector} from "../../services/store";

type TInputProps = {
	value: string,
	disabled: boolean,
	edit: boolean
}

type TInputs = {
	email: TInputProps,
	password: TInputProps,
	name: TInputProps,
};

const ProfilePage:FunctionComponent = () => {
	const [state, setState] = useState({
		email: {
			value: '',
			disabled: true,
			edit: false
		},
		password: {
			value: '',
			disabled: true,
			edit: false
		},
		name: {
			value: '',
			disabled: true,
			edit: false
		},
		changeData: false
	})
	const dispatch = useAppDispatch()
	const userData = useAppSelector((state) => state.user.userData)

	useEffect(() => {
		if (userData) {
			setState({
				...state,
				email: {
					...state.email,
					value: userData.email ? userData.email : ''
				},
				name: {
					...state.name,
					value: userData.name
				}
			})
		}
	}, [userData])

	const onChange = (e:ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			[e.target.name]: {
				...state[e.target.name as keyof TInputs],
				value: e.target.value
			},
			changeData: true
		})
	}
	const onIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetElem = e.target as HTMLElement
		const input = targetElem.closest('.input__container')?.querySelector('input')
		const inputName:string = targetElem.closest('.input__container')?.querySelector('input')?.getAttribute('name') as string

		setState({
			...state,
			[inputName]: {
				...[inputName],
				edit: state[inputName as keyof TInputs].disabled,
				disabled: !state[inputName as keyof TInputs].disabled,
				value: state[inputName as keyof TInputs].value
			}
		})

		if (input) {
			if (!state[inputName as keyof TInputs].disabled) {
				setTimeout(() => input.blur(), 0)
			} else {
				setTimeout(() => input.focus(), 0)
			}
		}

	}
	const handleSubmit = (e: SyntheticEvent) => {
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
				},
				password: {
					...state.password,
					value: ''
				},
				changeData: false
			})
		}
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
								icon={state.name.edit ? "CloseIcon" : "EditIcon"}
								disabled={state.name.disabled}
								onIconClick={onIconClick}
							/>
						</div>
						<div className="profile__input mb-6">
							<Input
								onChange={onChange}
								placeholder={'E-mail'}
								value={state.email.value}
								name={'email'}
								type={"email"}
								disabled={state.email.disabled}
								onIconClick={onIconClick}
								icon={state.email.edit ? "CloseIcon" : "EditIcon"}
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
								icon={state.password.edit ? "CloseIcon" : "EditIcon"}
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