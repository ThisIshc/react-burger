import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import AppHeader from "../app-header/app-header";
import RegisterPage from "../../pages/register/register";
import ForgotPage from "../../pages/forgot-password/forgot-password";
import ResetPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import {useDispatch, useSelector} from "react-redux";
import NotFound404 from "../../pages/not-found-404/not-found-404";
import {fetchGetUser, fetchUpdateToken} from "../../services/user-slice";
import {getCookie} from "../../utils/cookie";
import {ProtectedRouteElement} from "../protected-route-element/protected-route-element";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {fetchIngredients} from "../../services/burger-slice";
import {clearCurrentIngredient} from "../../services/ingredient-slice";
import Modal from "../modal/modal";

function App() {
	const userData = useSelector(state => state.user.userData)
	const currentIngredient = useSelector(state => state.ingredient)
	const dispatch = useDispatch()
	const location = useLocation();
	const navigate = useNavigate()
	let background = location.state && location.state.background;

	const closeModal = (e) => {
		dispatch(clearCurrentIngredient({ingredient: null}))
		navigate(-1);
	}

	useEffect(() => {
		dispatch(fetchIngredients())
		if (!userData && getCookie('accessToken')) {
			dispatch(fetchGetUser())
		} else if (!getCookie('accessToken') && localStorage.getItem("refreshToken") !== null) {
			dispatch(fetchUpdateToken())
		}
	}, [])

	return (
		<>
			<AppHeader />
			<Routes>
				<Route path={"/"} element={<Home />} />
				{ userData && getCookie('accessToken') ? (
					<>
						<Route path={"/login"} element={<ProtectedRouteElement element={<LoginPage />} /> } />
						<Route path={"/register"} element={<ProtectedRouteElement element={<RegisterPage />} /> } />
						<Route path={"/forgot-password"} element={<ProtectedRouteElement element={<ForgotPage />} /> } />
						<Route path={"/reset-password"} element={<ProtectedRouteElement element={<ResetPage />} /> } />
						<Route path={"/profile"} element={<ProfilePage /> } />
						<Route path={"/profile/orders"} element={<ProfilePage /> } />
					</>
				) : (
					<>
						<Route path={"/login"} element={<LoginPage />} />
						<Route path={"/register"} element={<RegisterPage /> } />
						<Route path={"/forgot-password"} element={<ForgotPage />} />
						<Route path={"/reset-password"} element={<ProtectedRouteElement element={<ResetPage />} />  } />
						<Route path={"/profile"} element={<ProtectedRouteElement element={<ProfilePage />} /> } />
						<Route path={"/profile/orders"} element={<ProtectedRouteElement element={<ProfilePage />} /> } />
					</>
				)
				}
				{ background && currentIngredient.ingredient ? (
					<Route path={"/ingredients/:ingredientId"} element={
						<Modal title={'Детали ингредиента'} onClose={closeModal} >
						<IngredientDetails isModal={true} />
					</Modal>} />
				) : (
					<Route path={"/ingredients/:ingredientId"} element={<IngredientDetails />} />
				)
				}
				<Route path={"/ingredients/:ingredientId"} element={<IngredientDetails />} />
				<Route path={"*"} element={<NotFound404 />} />
			</Routes>
		</>
	)
}

export default App;
