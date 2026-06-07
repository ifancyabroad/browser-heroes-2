import type { Armour } from "../schemas/item.schema";
import { armourSchema } from "../schemas/item.schema";

export const buildArmour = (armour: Armour) => {
	const parsed = armourSchema.parse(armour);
	return parsed;
};
