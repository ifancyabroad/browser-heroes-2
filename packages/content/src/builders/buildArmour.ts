import type { Armour, ArmourInput } from "../schemas/armour.schema";
import { armourSchema } from "../schemas/armour.schema";

export const buildArmour = (armour: ArmourInput): Armour => {
	const parsed = armourSchema.parse(armour);
	return parsed;
};
