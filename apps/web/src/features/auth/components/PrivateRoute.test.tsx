import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

const auth = vi.hoisted(() => ({
	useAuth: vi.fn(),
}));

vi.mock("../hooks/useAuth", () => ({
	useAuth: auth.useAuth,
}));

import { PrivateRoute } from "./PrivateRoute";

function renderRoute() {
	return render(
		<MemoryRouter initialEntries={["/account"]}>
			<Routes>
				<Route path="/" element={<p>Home</p>} />
				<Route element={<PrivateRoute />}>
					<Route path="/account" element={<p>Account</p>} />
				</Route>
			</Routes>
		</MemoryRouter>,
	);
}

describe("PrivateRoute", () => {
	it("renders its route for registered users", () => {
		auth.useAuth.mockReturnValue({ isRegistered: true });

		renderRoute();

		expect(screen.getByText("Account")).toBeInTheDocument();
	});

	it.each(["without a session", "with a guest session"])(
		"redirects non-registered users %s",
		() => {
			auth.useAuth.mockReturnValue({ isRegistered: false });

			renderRoute();

			expect(screen.getByText("Home")).toBeInTheDocument();
		},
	);
});
