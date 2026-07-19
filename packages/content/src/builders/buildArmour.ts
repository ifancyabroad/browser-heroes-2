import {
	legendaryArmourSchema,
	type LegendaryArmour,
	type LegendaryArmourInput,
} from "../schemas/armour.schema";

export const buildArmour = (armour: LegendaryArmourInput): LegendaryArmour => {
	return legendaryArmourSchema.parse(armour);
};
