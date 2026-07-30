import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

const sendContactEmail = vi.hoisted(() => vi.fn());

vi.mock("../services/email.service", () => ({
	sendContactEmail,
}));

describe("contact routes", () => {
	let buildApp: typeof import("../app").buildApp;

	beforeAll(async () => {
		({ buildApp } = await import("../app"));
	});

	beforeEach(() => {
		vi.clearAllMocks();
		sendContactEmail.mockResolvedValue(undefined);
	});

	it("sends a validated contact message", async () => {
		const body = {
			email: "hero@example.com",
			subject: "A game question",
			message: "How do ghosts work?",
		};

		const response = await request(buildApp()).post("/api/contact").send(body).expect(202);

		expect(sendContactEmail).toHaveBeenCalledWith(body);
		expect(response.body).toEqual({ message: "Thanks — your message has been sent." });
	});

	it("rejects invalid contact details", async () => {
		await request(buildApp())
			.post("/api/contact")
			.send({ email: "not-an-email", subject: "", message: "" })
			.expect(400);

		expect(sendContactEmail).not.toHaveBeenCalled();
	});
});
