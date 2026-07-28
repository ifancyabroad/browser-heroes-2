import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const useCurrentUser = vi.hoisted(() => vi.fn());

vi.mock("./useCurrentUser", () => ({ useCurrentUser }));

import { useAuth } from "./useAuth";

describe("useAuth", () => {
	it.each([
		{
			user: null,
			expected: { hasSession: false, isRegistered: false, isGuest: false },
		},
		{
			user: { id: "guest", type: "guest" },
			expected: { hasSession: true, isRegistered: false, isGuest: true },
		},
		{
			user: { id: "registered", type: "registered" },
			expected: { hasSession: true, isRegistered: true, isGuest: false },
		},
	])("derives authentication state from $user.type", ({ user, expected }) => {
		useCurrentUser.mockReturnValue({
			data: { user },
			isPending: false,
		});

		const { result } = renderHook(() => useAuth());

		expect(result.current).toMatchObject({
			user,
			isPending: false,
			...expected,
		});
	});
});
