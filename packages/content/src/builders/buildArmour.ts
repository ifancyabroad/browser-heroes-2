import type { IArmour } from "../types/item";
import { armourSchema } from "../schemas/item.schema";

export const buildArmour = (armour: IArmour) => {
	const parsed = armourSchema.parse(armour);
	return parsed;
};
