import type { BuyItemAction, EngineResult, RunState, TownState } from "../../schemas";

import { failureResult, successResult } from "../../core/result";
import { equipItem } from "../equipment/equipItem";
import { createItemEventPayload } from "../items/createItemEventPayload";
import { deriveHeroStats } from "../hero/deriveHeroStats";
import { calculateTownItemPrice } from "./townPricing";

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

	const effectiveCharisma = deriveHeroStats(state.hero).effectiveAttributes.charisma;

	const price = calculateTownItemPrice(shopSlot.price, effectiveCharisma);

	if (state.gold < price) {
		return failureResult(state, "NOT_ENOUGH_GOLD");
	}

	const eventItem = createItemEventPayload(shopSlot.item);

	if (!eventItem) {
		return failureResult(state, "ITEM_DEFINITION_NOT_FOUND");
	}

	const equipResult = equipItem({
		hero: state.hero,
		item: shopSlot.item,
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
			gold: state.gold - price,
			hero: equipResult.hero,
			town,
			shopLocks: state.shopLocks.filter((slot) => slot.id !== shopSlot.id),
		},
		[
			{
				type: "ITEM_BOUGHT",
				item: eventItem,
				equipmentSlot: equipResult.equipmentSlot,
				price,
			},
		],
	);
}
