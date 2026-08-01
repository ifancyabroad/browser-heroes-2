import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const post = vi.hoisted(() => vi.fn());

vi.mock("../lib/api", () => ({
	api: { post },
}));

vi.mock("../features/auth", async (importOriginal) => ({
	...(await importOriginal<typeof import("../features/auth")>()),
	useAuth: () => ({ isRegistered: false }),
}));

import Contact from "./Contact";

function renderContact() {
	return render(
		<QueryClientProvider client={new QueryClient()}>
			<MemoryRouter>
				<Contact />
			</MemoryRouter>
		</QueryClientProvider>,
	);
}

describe("Contact", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("submits the contact details and confirms success", async () => {
		post.mockReturnValue({
			json: () => Promise.resolve({ message: "Thanks — your message has been sent." }),
		});
		renderContact();

		fireEvent.change(screen.getByLabelText("Email address"), {
			target: { value: "hero@example.com" },
		});
		fireEvent.change(screen.getByLabelText("Subject"), {
			target: { value: "A game question" },
		});
		fireEvent.change(screen.getByLabelText("Message"), {
			target: { value: "How do ghosts work?" },
		});
		fireEvent.click(screen.getByRole("button", { name: "SEND MESSAGE" }));

		await waitFor(() =>
			expect(post).toHaveBeenCalledWith("contact", {
				json: {
					email: "hero@example.com",
					subject: "A game question",
					message: "How do ghosts work?",
				},
			}),
		);
		expect(await screen.findByText("Thanks — your message has been sent.")).toBeInTheDocument();
	});

	it("does not render submission failures inline", async () => {
		post.mockReturnValue({ json: () => Promise.reject(new Error("Unavailable")) });
		renderContact();

		fireEvent.change(screen.getByLabelText("Email address"), {
			target: { value: "hero@example.com" },
		});
		fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Help" } });
		fireEvent.change(screen.getByLabelText("Message"), {
			target: { value: "Something went wrong." },
		});
		fireEvent.click(screen.getByRole("button", { name: "SEND MESSAGE" }));

		await waitFor(() => expect(post).toHaveBeenCalledOnce());
		expect(screen.queryByRole("alert")).not.toBeInTheDocument();
	});
});
