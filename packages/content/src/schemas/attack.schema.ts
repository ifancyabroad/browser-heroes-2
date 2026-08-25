import { z } from "zod";

import {
	attackRangeSchema,
	attributeSchema,
	damageClassSchema,
	damageTypeSchema,
	diceFormulaSchema,
} from "./common.schema";
import { attackRiderSchema } from "./effect.schema";

export const basicAttackSchema = z.object({
	name: z.string().nonempty(),
	attackRange: attackRangeSchema,
	attackAttribute: attributeSchema.optional(),
	damage: z.object({
		dice: diceFormulaSchema,
		type: damageTypeSchema,
		damageClass: damageClassSchema,
		attribute: attributeSchema.optional(),
	}),
	attackRiders: z.array(attackRiderSchema).default([]),
});

export type BasicAttack = z.infer<typeof basicAttackSchema>;
