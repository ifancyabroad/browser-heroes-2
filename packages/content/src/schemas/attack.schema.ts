import { z } from "zod";

import { attributeSchema, damageTypeSchema, diceFormulaSchema } from "./common.schema";
import { attackRiderSchema } from "./effect.schema";

export const basicAttackSchema = z.object({
	name: z.string().nonempty(),
	attackAttribute: attributeSchema.optional(),
	damage: z.object({
		dice: diceFormulaSchema,
		type: damageTypeSchema,
		attribute: attributeSchema.optional(),
	}),
	attackRiders: z.array(attackRiderSchema).default([]),
});

export type BasicAttack = z.infer<typeof basicAttackSchema>;
