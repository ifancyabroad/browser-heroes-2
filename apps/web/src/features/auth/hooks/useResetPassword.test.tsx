import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";
import { authKeys } from "../api/authKeys";

const resetPassword = vi.hoisted(() => vi.fn());

vi.mock("../api/resetPassword", () => ({ resetPassword }));

import { useResetPassword } from "./useResetPassword";

describe("useResetPassword", () => {
	it("clears the current identity after a successful reset", async () => {
		const queryClient = new QueryClient();
		queryClient.setQueryData(authKeys.currentUser(), {
			user: {
				id: "user-id",
				type: "registered",
				displayName: "Player",
				email: "player@example.com",
			},
		});
		resetPassword.mockResolvedValue({ message: "Password reset." });

		function wrapper({ children }: PropsWithChildren) {
			return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
		}

		const { result } = renderHook(() => useResetPassword(), { wrapper });

		act(() => {
			result.current.mutate({ token: "reset-token", password: "long-password" });
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(queryClient.getQueryData(authKeys.currentUser())).toEqual({ user: null });
	});
});
