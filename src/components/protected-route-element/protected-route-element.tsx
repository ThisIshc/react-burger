import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {getCookie} from "../../utils/cookie";
import {IUserData, TUserResetData} from "../../types/user";
import {FunctionComponent, ReactElement} from "react";

type ProtectedRouteProps = {
	element: JSX.Element;
};

export const ProtectedRouteElement = ({element}: ProtectedRouteProps) => {
	const userData = useSelector((data:IUserData) => data.user.userData)
	const resetData = useSelector((data:IUserData) => data.user.resetData)
	const locationPathname = ['/login', '/register', '/reset-password', '/forgot-password'].indexOf(document.location.pathname)
	const location = useLocation()

	if (userData === null && !getCookie('accessToken')) {
		if (document.location.pathname === '/reset-password' && resetData !== null) {
			return element
		}
		return <Navigate to={"/login"} state={{form: location.pathname} } />
	} else {
		return locationPathname !== -1 ? <Navigate to={location?.state?.form || "/"} /> : element
	}
}