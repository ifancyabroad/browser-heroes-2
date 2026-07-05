import { ITEMS_BY_ID } from "@app/content";

import type { BuyItemAction, EngineResult, RunState, TownState } from "../../schemas";

import { createShopItemInstanceId } from "../../core/ids";
import { failureResult, successResult } from "../../core/result";
import { equipItem } from "../equipment/equipItem";

export function buyItem(state: RunState, action: BuyItemAction): EngineResult {
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

	if (state.gold < shopSlot.price) {
		return failureResult(state, "NOT_ENOUGH_GOLD");
	}

	const item = ITEMS_BY_ID[shopSlot.itemId];

	if (!item) {
		return failureResult(state, "ITEM_DEFINITION_NOT_FOUND");
	}

	const equipResult = equipItem({
		hero: state.hero,
		item,
		instanceId: createShopItemInstanceId(state.id, shopSlot.id, item.id),
		requestedSlot: action.equipmentSlot,
	});

	if (!equipResult.ok) {
		return failureResult(state, equipResult.error);
	}

	const town: TownState = {
		...state.town,
		shopSlots: state.town.shopSlots.map((slot) =>
			slot.id === shopSlot.id
				? {
						...slot,
						purchased: true,
					}
				: slot,
		),
	};

	return successResult(
		{
			...state,
			gold: state.gold - shopSlot.price,
			hero: equipResult.hero,
			town,
		},
		[
			{
				type: "ITEM_BOUGHT",
				itemId: item.id,
				equipmentSlot: equipResult.equipmentSlot,
				price: shopSlot.price,
			},
		],
	);
}
