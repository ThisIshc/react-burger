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
import {IUserData} from "../../types/user";
import {IIngredient} from "../../types/ingredient";
import FeedPage from "../../pages/feed/feed";
import FeedDetailPage from "../../pages/feed-detail/feed-detail";
import ProfileOrdersPage from "../../pages/profile-orders/profile-orders";
import ProfileOrdersDetail from "../../pages/profile-orders-detail/profile-orders-detail";

const App = () => {
	const userData = useSelector((state:IUserData) => state.user.userData)
	const currentIngredient = useSelector((state:IIngredient) => state.ingredient)
	const currentFeed = useSelector((state:any) => state.feed)
	const dispatch = useDispatch()
	const location = useLocation();
	const navigate = useNavigate()
	let background = location.state && location.state.background;
	let backgroundFeed = location.state && location.state.backgroundFeed;
	let backgroundOrder = location.state && location.state.backgroundOrder;

	const closeModal = () => {
		dispatch(clearCurrentIngredient())
		navigate(-1);
	}

	useEffect(() => {
		dispatch<any>(fetchIngredients())
		if (!userData && getCookie('accessToken')) {
			dispatch<any>(fetchGetUser())
		} else if ((!getCookie('accessToken') && localStorage.getItem("refreshToken") !== null) || userData === null) {
			if (localStorage.getItem('refreshToken')) {
				dispatch<any>(fetchUpdateToken())
			}
		}
	}, [userData])

	return (
		<>
			<AppHeader />
			<main>
				<Routes>
					<Route path={"/"} element={<Home />} />
					{ userData && getCookie('accessToken') ? (
						<>
							<Route path={"/login"} element={<ProtectedRouteElement element={<LoginPage />} /> } />
							<Route path={"/register"} element={<ProtectedRouteElement element={<RegisterPage />} /> } />
							<Route path={"/forgot-password"} element={<ProtectedRouteElement element={<ForgotPage />} /> } />
							<Route path={"/reset-password"} element={<ProtectedRouteElement element={<ResetPage />} /> } />
							<Route path={"/profile"} element={<ProfilePage /> } />
							<Route path={"/profile/orders"} element={<ProfileOrdersPage /> } />
							<Route path={"/feed"} element={<FeedPage /> } />
						</>
					) : (
						<>
							<Route path={"/login"} element={<LoginPage />} />
							<Route path={"/register"} element={<RegisterPage /> } />
							<Route path={"/forgot-password"} element={<ForgotPage />} />
							<Route path={"/reset-password"} element={<ProtectedRouteElement element={<ResetPage />} />  } />
							<Route path={"/profile"} element={<ProtectedRouteElement element={<ProfilePage />} /> } />
							{/*<Route path={"/profile/orders"} element={<ProtectedRouteElement element={<ProfilePage />} /> } />*/}
							<Route path={"/feed"} element={<FeedPage /> } />
						</>
					)
					}

					{ backgroundFeed && currentFeed.feed ? (
						<Route path={"/feed/:id"} element={
							<Modal title={'Детали заказа'} onClose={closeModal} >
								<FeedDetailPage isModal={true} />
							</Modal>} />
					) : (
						<Route path={"/feed/:id"} element={<FeedDetailPage isModal={false} /> } />
					)
					}

					{ backgroundOrder && currentFeed.feed ? (
						<Route path={"/profile/orders/:id"} element={
							<Modal title={'Детали заказа'} onClose={closeModal} >
								<ProfileOrdersDetail isModal={true} />
							</Modal>} />
					) : (
						<Route path={"/profile/orders/:id"} element={<ProfileOrdersDetail isModal={false} /> } />
					)
					}

					{ background && currentIngredient.ingredient ? (
						<Route path={"/ingredients/:ingredientId"} element={
							<Modal title={'Детали ингредиента'} onClose={closeModal} >
								<IngredientDetails isModal={true} />
							</Modal>} />
					) : (
						<Route path={"/ingredients/:ingredientId"} element={<IngredientDetails isModal={false} />} />
					)
					}

					<Route path={"/ingredients/:ingredientId"} element={<IngredientDetails isModal={false} />} />
					<Route path={"*"} element={<NotFound404 />} />
				</Routes>
			</main>
		</>
	)
}

export default App;
