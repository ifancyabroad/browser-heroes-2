import type { ClassId, Item } from "@app/content";

export function isItemAvailableToClass(item: Item, classId: ClassId): boolean {
	return item.restrictedToClassIds?.includes(classId) ?? true;
}
