import { CONSUMABLES_BY_ID, consumableIdSchema, consumableIds } from "@app/content";
import { z } from "zod";

export const consumableInventorySchema = z
	.record(consumableIdSchema, z.number().int().nonnegative())
	.superRefine((inventory, ctx) => {
		for (const id of consumableIds) {
			if (inventory[id] > CONSUMABLES_BY_ID[id].maxCarry) {
				ctx.addIssue({
					code: "custom",
					path: [id],
					message: "Consumable carrying limit exceeded",
				});
			}
		}
	});

export type ConsumableInventory = z.infer<typeof consumableInventorySchema>;
