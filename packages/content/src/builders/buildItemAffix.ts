import { itemAffixSchema, type ItemAffixDefinitionInput } from "../schemas";

export function buildItemAffix(input: ItemAffixDefinitionInput) {
	return itemAffixSchema.parse(input);
}
