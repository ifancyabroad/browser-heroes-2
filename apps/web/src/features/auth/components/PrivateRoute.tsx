import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute() {
	const { isRegistered } = useAuth();

	if (!isRegistered) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
