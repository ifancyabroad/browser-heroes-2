import type { ItemInstance, RuntimeItem } from "../schemas";
import { getItemInstanceDefinition } from "../systems/items/getItemInstanceDefinition";

export function selectItemDefinition(
	instance: ItemInstance | null | undefined,
): RuntimeItem | null {
	return getItemInstanceDefinition(instance);
}
