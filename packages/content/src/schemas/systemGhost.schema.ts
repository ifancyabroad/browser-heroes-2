import { z } from "zod";

import { equipmentSlotSchema } from "./common.schema";
import { generatedItemRaritySchema } from "./rarity.schema";

const systemGhostEquipmentRecipeSchema = z.object({
	baseId: z.string().nonempty(),
	rarity: generatedItemRaritySchema,
});

export const systemGhostEquipmentSchema = z.partialRecord(
	equipmentSlotSchema,
	systemGhostEquipmentRecipeSchema,
);

export const systemGhostSchema = z.object({
	id: z.string().nonempty(),
	encounterLevel: z.number().int().min(2).max(10),
	name: z.string().nonempty(),
	classId: z.string().nonempty(),
	additionalSkillIds: z.array(z.string().nonempty()).default([]),
	featIds: z.array(z.string().nonempty()).default([]),
	equipment: systemGhostEquipmentSchema.default({}),
});

export type SystemGhostDefinition = z.infer<typeof systemGhostSchema>;
export type SystemGhostDefinitionInput = z.input<typeof systemGhostSchema>;
