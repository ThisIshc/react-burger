import {Navigate, useLocation} from "react-router-dom";
import {getCookie} from "../../utils/cookie";
import {useAppSelector} from "../../services/store";

type ProtectedRouteProps = {
	element: JSX.Element;
};

export const ProtectedRouteElement = ({element}: ProtectedRouteProps) => {
	const userData = useAppSelector((data) => data.user.userData)
	const resetData = useAppSelector((data) => data.user.resetData)
	const locationPathname = ['/login', '/register', '/reset-password', '/forgot-password'].indexOf(document.location.pathname)
	const authPathname = ['/profile'].indexOf(document.location.pathname)
	const location = useLocation()

	if (userData === null && !getCookie('accessToken')) {
		if (document.location.pathname === '/reset-password' && resetData !== null) {
			return element
		}
		if (document.location.pathname === '/login') {
			return element
		}
		return authPathname !== -1 ? <Navigate to={"/login"} state={{form: location.pathname} } /> : element
	} else {
		return locationPathname !== -1 ? <Navigate to={location?.state?.form || "/"} /> : element
	}
}