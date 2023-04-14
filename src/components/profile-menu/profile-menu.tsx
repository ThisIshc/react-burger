import style from "./profile-menu.module.css"
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchLogout} from "../../services/user-slice";
import {FunctionComponent, SyntheticEvent} from "react";

const ProfileMenu:FunctionComponent = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleLogout = (e:SyntheticEvent) => {
		e.preventDefault()
		dispatch<any>(fetchLogout())
		navigate('/')
	}

	return (
		<div className="menu">
			<div className={style.menu__links + " text text_type_main-medium mb-20"}>
				<div className={style.menu__link}>
					<NavLink to={{pathname: '/profile/'}} className={({ isActive }) => isActive ? style.active : ''}>Профиль</NavLink>
				</div>
				<div className={style.menu__link}>
					<NavLink to={{pathname: '/profile/orders'}} className={({ isActive }) => isActive ? style.active : ''}>История заказов</NavLink>
				</div>
				<div className={style.menu__link}>
					<NavLink to={{pathname: '/logout'}} className={({ isActive }) => isActive ? style.active : ''} onClick={handleLogout}>Выход</NavLink>
				</div>
			</div>
			<div className={style.menu__bottom + " text text_type_main-default"}>
				<span>В этом разделе вы можете изменить свои персональные данные</span>
			</div>
		</div>
	)
}
export default ProfileMenu