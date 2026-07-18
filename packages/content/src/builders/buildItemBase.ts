import { itemBaseSchema, type ItemBaseDefinitionInput } from "../schemas";

export function buildItemBase(input: ItemBaseDefinitionInput) {
	return itemBaseSchema.parse(input);
}
