import type { Armour } from "../schemas/armour.schema";
import { armourSchema } from "../schemas/armour.schema";

export const buildArmour = (armour: Armour) => {
	const parsed = armourSchema.parse(armour);
	return parsed;
};
