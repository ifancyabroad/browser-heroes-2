import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { io, type Socket } from "socket.io-client";
import { HTTPError } from "ky";
import {
	ADMIN_ACTIVITY_EVENT,
	ADMIN_REALTIME_NAMESPACE,
	type AdminActivityEntry,
	type AdminActiveHeroesResponse,
	type RunMode,
} from "@app/shared";
import { authKeys } from "../../auth/api/authKeys";
import { getActivity } from "../api/getActivity";
import { realtimeKeys } from "../api/realtimeKeys";
import { mergeActivity } from "../utils/mergeActivity";
import { useActiveHeroes } from "./useActiveHeroes";

const activityKey = realtimeKeys.activity();

export function useRealtime(mode: RunMode | "all") {
	const client = useQueryClient();
	const [status, setStatus] = useState("Connecting");
	const connection = useRef<Socket | null>(null);
	const heroes = useActiveHeroes(mode);

	// Register socket listeners before the activity query starts fetching.
	useEffect(() => {
		const base = import.meta.env.VITE_SOCKET_URL ?? window.location.origin;
		const socket = io(`${base.replace(/\/$/, "")}${ADMIN_REALTIME_NAMESPACE}`, {
			withCredentials: true,
			autoConnect: false,
			forceNew: true,
		});
		connection.current = socket;
		function receive(entry: AdminActivityEntry) {
			client.setQueryData<AdminActivityEntry[]>(activityKey, (current = []) =>
				mergeActivity(current, [entry]),
			);
		}
		function refresh() {
			void client.invalidateQueries({ queryKey: realtimeKeys.all });
		}
		function connected() {
			setStatus("Connected");
			refresh();
		}
		function disconnected(reason: string) {
			setStatus(reason === "io server disconnect" ? "Disconnected" : "Reconnecting");
			if (reason === "io server disconnect") {
				void client.cancelQueries({ queryKey: realtimeKeys.all });
				client.setQueryData(activityKey, []);
				client.setQueriesData<AdminActiveHeroesResponse>(
					{ queryKey: realtimeKeys.heroes() },
					{ heroes: [] },
				);
				void client.invalidateQueries({ queryKey: authKeys.currentUser() });
			}
		}
		function visibility() {
			if (document.visibilityState === "visible") {
				refresh();
			}
		}
		socket
			.on(ADMIN_ACTIVITY_EVENT, receive)
			.on("connect", connected)
			.on("disconnect", disconnected)
			.on("connect_error", () => setStatus("Reconnecting"));
		document.addEventListener("visibilitychange", visibility);
		socket.connect();
		return () => {
			document.removeEventListener("visibilitychange", visibility);
			socket.removeAllListeners();
			socket.disconnect();
			connection.current = null;
		};
	}, [client]);

	const activity = useQuery({
		queryKey: activityKey,
		queryFn: async ({ signal }) => {
			const { entries } = await getActivity(signal);
			return mergeActivity(
				entries,
				client.getQueryData<AdminActivityEntry[]>(activityKey) ?? [],
			);
		},
		refetchOnMount: "always",
		gcTime: 0,
	});

	const failure = activity.error ?? heroes.error;
	useEffect(() => {
		if (failure instanceof HTTPError && [401, 403].includes(failure.response.status)) {
			connection.current?.disconnect();
			client.removeQueries({ queryKey: realtimeKeys.all });
			void client.invalidateQueries({ queryKey: authKeys.currentUser() });
		}
	}, [client, failure]);

	function retry() {
		connection.current?.connect();
		void client.invalidateQueries({ queryKey: realtimeKeys.all });
	}
	return {
		entries: activity.data ?? [],
		status,
		pending: activity.isPending,
		error: activity.isError,
		retry,
		heroes,
	};
}
