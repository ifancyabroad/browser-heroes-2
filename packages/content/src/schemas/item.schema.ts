import { z } from "zod";

import { generatedArmourSchema, legendaryArmourSchema } from "./armour.schema";
import { generatedWeaponSchema, legendaryWeaponSchema } from "./weapon.schema";

export const itemSchema = z.union([legendaryArmourSchema, legendaryWeaponSchema]);

export const generatedItemDefinitionSchema = z.union([
	generatedArmourSchema,
	generatedWeaponSchema,
]);

export type ItemDefinition = z.infer<typeof itemSchema>;
export type ItemDefinitionInput = z.input<typeof itemSchema>;

export type GeneratedItemDefinition = z.infer<typeof generatedItemDefinitionSchema>;
