import { beforeEach, describe, expect, it } from "vitest";
import { useErrorModalStore } from "../stores/errorModalStore";
import { queryClient } from "./queryClient";

describe("queryClient error presentation", () => {
	beforeEach(() => {
		queryClient.clear();
		useErrorModalStore.getState().hideError();
	});

	it("shows configured query errors through the global modal store", async () => {
		await expect(
			queryClient.fetchQuery({
				queryKey: ["failing-query"],
				queryFn: () => Promise.reject(new Error("Unavailable")),
				retry: false,
				meta: { errorMessage: "Unable to load data." },
			}),
		).rejects.toThrow("Unavailable");

		expect(useErrorModalStore.getState().message).toBe("Unable to load data.");
	});

	it("shows configured mutation errors through the global modal store", async () => {
		const mutation = queryClient.getMutationCache().build(queryClient, {
			mutationFn: () => Promise.reject(new Error("Unavailable")),
			meta: { errorMessage: "Unable to save data." },
		});

		await expect(mutation.execute(undefined)).rejects.toThrow("Unavailable");

		expect(useErrorModalStore.getState().message).toBe("Unable to save data.");
	});

	it("ignores expected errors without presentation metadata", async () => {
		await expect(
			queryClient.fetchQuery({
				queryKey: ["expected-error"],
				queryFn: () => Promise.reject(new Error("Invalid credentials")),
				retry: false,
			}),
		).rejects.toThrow("Invalid credentials");

		expect(useErrorModalStore.getState().message).toBeNull();
	});
});
