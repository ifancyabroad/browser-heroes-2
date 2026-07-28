import { useAuth } from "../features/auth";
import { useSocketConnection } from "../hooks/useSocketConnection";

export function SocketConnection() {
	const { user } = useAuth();

	useSocketConnection(user?.id);

	return null;
}
