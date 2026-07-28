import { describe, expect, it } from "vitest";
import { planGuestCleanup } from "./guestCleanup.service";

const baseInput = {
	userIds: [] as string[],
	eligibleRuns: [] as Array<{
		id: string;
		userId: string;
		status: "active" | "abandoned";
	}>,
	eligibleActionCount: 0,
	allRunUserIds: [] as string[],
	allActionUserIds: [] as string[],
	retainedRunUserIds: [] as string[],
	retainedActionUserIds: [] as string[],
	ghostUserIds: [] as string[],
};

describe("planGuestCleanup", () => {
	it("deletes an empty guest", () => {
		const plan = planGuestCleanup({ ...baseInput, userIds: ["empty"] });

		expect(plan.emptyGuestIds).toEqual(["empty"]);
		expect(plan.deletableGuestIds).toEqual(["empty"]);
		expect(plan.retainedGuests).toBe(0);
	});

	it("deletes inactive active and abandoned runs with their actions", () => {
		const plan = planGuestCleanup({
			...baseInput,
			userIds: ["inactive"],
			eligibleRuns: [
				{ id: "active-run", userId: "inactive", status: "active" },
				{ id: "abandoned-run", userId: "inactive", status: "abandoned" },
			],
			eligibleActionCount: 12,
			allRunUserIds: ["inactive"],
			allActionUserIds: ["inactive"],
		});

		expect(plan.emptyGuestIds).toEqual([]);
		expect(plan.deletableGuestIds).toEqual(["inactive"]);
		expect(plan.eligibleRunIds).toEqual(["active-run", "abandoned-run"]);
		expect(plan.activeRuns).toBe(1);
		expect(plan.abandonedRuns).toBe(1);
		expect(plan.runActions).toBe(12);
	});

	it("retains a guest and actions referenced by terminal history", () => {
		const plan = planGuestCleanup({
			...baseInput,
			userIds: ["terminal"],
			allRunUserIds: ["terminal"],
			allActionUserIds: ["terminal"],
			retainedRunUserIds: ["terminal"],
			retainedActionUserIds: ["terminal"],
		});

		expect(plan.deletableGuestIds).toEqual([]);
		expect(plan.eligibleRunIds).toEqual([]);
		expect(plan.retainedGuests).toBe(1);
	});

	it("deletes old resumable history but retains the owner of terminal history", () => {
		const plan = planGuestCleanup({
			...baseInput,
			userIds: ["mixed"],
			eligibleRuns: [{ id: "abandoned-run", userId: "mixed", status: "abandoned" }],
			eligibleActionCount: 4,
			allRunUserIds: ["mixed"],
			allActionUserIds: ["mixed"],
			retainedRunUserIds: ["mixed"],
			retainedActionUserIds: ["mixed"],
		});

		expect(plan.eligibleRunIds).toEqual(["abandoned-run"]);
		expect(plan.deletableGuestIds).toEqual([]);
		expect(plan.retainedGuests).toBe(1);
	});

	it("retains any guest referenced by a published ghost", () => {
		const plan = planGuestCleanup({
			...baseInput,
			userIds: ["ghost-owner"],
			allRunUserIds: ["ghost-owner"],
			ghostUserIds: ["ghost-owner"],
			retainedRunUserIds: ["ghost-owner"],
		});

		expect(plan.deletableGuestIds).toEqual([]);
		expect(plan.retainedGuests).toBe(1);
	});

	it("does not consider a guest empty when orphaned actions still reference it", () => {
		const plan = planGuestCleanup({
			...baseInput,
			userIds: ["action-owner"],
			allActionUserIds: ["action-owner"],
			retainedActionUserIds: ["action-owner"],
		});

		expect(plan.emptyGuestIds).toEqual([]);
		expect(plan.deletableGuestIds).toEqual([]);
	});
});
