import {
	consumableSchema,
	type ConsumableDefinition,
	type ConsumableDefinitionInput,
} from "../schemas/consumable.schema";

export const buildConsumable = (consumable: ConsumableDefinitionInput): ConsumableDefinition => {
	return consumableSchema.parse(consumable);
};

export default buildConsumable;
