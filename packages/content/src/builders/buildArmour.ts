import type { IArmour } from "../types/item";
import { ArmourSchema } from "../schemas/item.schema";

export const buildArmour = (armour: IArmour) => {
	const parsed = ArmourSchema.parse(armour);
	return parsed;
};
