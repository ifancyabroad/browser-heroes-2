import { useEffect } from "react";
import { socket } from "../lib/socket";

export function useSocketConnection() {
	useEffect(() => {
		socket.connect();

		return () => {
			socket.disconnect();
		};
	}, []);
}
