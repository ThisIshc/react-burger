import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {getCookie} from "../../utils/cookie";

export const ProtectedRouteElement = ({element}) => {
	const userData = useSelector(data => data.user.userData)
	const resetData = useSelector(data => data.user.resetData)
	const location = ['/login', '/register', '/reset-password', '/forgot-password'].indexOf(document.location.pathname)

	if (userData === null && !getCookie('accessToken')) {
		if (document.location.pathname === '/reset-password' && resetData !== null) {
			return element
		}
		return <Navigate to={"/login"} replace />
	} else {
		return location !== -1 ? <Navigate to={"/"} replace /> : element
	}
}