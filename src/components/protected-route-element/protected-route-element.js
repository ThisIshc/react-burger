import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {getCookie} from "../../utils/cookie";

export const ProtectedRouteElement = ({element}) => {
	const userData = useSelector(data => data.user.userData)
	const resetData = useSelector(data => data.user.resetData)
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