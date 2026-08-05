import type { EngineResult, RunState, SetShopLockAction } from "../../schemas";

import { failureResult, successResult } from "../../core/result";

export function setShopLock(state: RunState, action: SetShopLockAction): EngineResult {
	if (state.phase !== "town" || !state.town) {
		return failureResult(state, "TOWN_NOT_AVAILABLE");
	}

	const shopSlot = state.town.shopSlots.find((slot) => slot.id === action.shopSlotId);

	if (!shopSlot) {
		return failureResult(state, "SHOP_SLOT_NOT_FOUND");
	}

	if (shopSlot.purchased) {
		return failureResult(state, "SHOP_SLOT_ALREADY_PURCHASED");
	}

	const isLocked = state.shopLocks.some((lock) => lock.id === shopSlot.id);

	if (isLocked === action.locked) {
		return successResult(state, []);
	}

	const shopLocks = action.locked
		? [...state.shopLocks, shopSlot]
		: state.shopLocks.filter((lock) => lock.id !== shopSlot.id);

	return successResult(
		{
			...state,
			shopLocks,
		},
		[
			{
				type: "SHOP_LOCK_CHANGED",
				shopSlotId: shopSlot.id,
				locked: action.locked,
			},
		],
	);
}
