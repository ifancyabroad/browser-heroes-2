import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { WorldLogEntry } from "@app/shared";
import { socket } from "../../../lib/socket";
import { getWorldLog } from "../api/getWorldLog";
import { worldLogKeys } from "../api/worldLogKeys";
import { mergeWorldLogEntries } from "../utils/mergeWorldLogEntries";

const queryKey = worldLogKeys.all;

export function useWorldLog() {
	const client = useQueryClient();

	useEffect(() => {
		function receive(entry: WorldLogEntry) {
			client.setQueryData<WorldLogEntry[]>(queryKey, (current = []) =>
				mergeWorldLogEntries(current, [entry]),
			);
		}

		function reconnect() {
			void client.invalidateQueries({ queryKey });
		}

		socket.on("world-log:entry", receive).on("connect", reconnect);

		return () => {
			socket.off("world-log:entry", receive).off("connect", reconnect);
		};
	}, [client]);

	const query = useQuery({
		queryKey,
		queryFn: async ({ signal }) => {
			const { entries } = await getWorldLog(signal);

			return mergeWorldLogEntries(
				entries,
				client.getQueryData<WorldLogEntry[]>(queryKey) ?? [],
			);
		},
		refetchOnMount: "always",
	});

	return {
		entries: query.data ?? [],
		pending: query.isPending,
		error: query.isError,
	};
}
