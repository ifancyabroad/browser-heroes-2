import { useCurrentUser } from "../features/auth";
import { useSocketConnection } from "../hooks/useSocketConnection";

export function SocketConnection() {
	const { data } = useCurrentUser();

	useSocketConnection(data?.user?.id);

	return null;
}
