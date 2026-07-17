import { useEffect } from "react";
import { socket } from "../lib/socket";

export function useSocketConnection(connectionKey?: string) {
	useEffect(() => {
		if (!connectionKey) {
			return;
		}

		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, [connectionKey]);
}
