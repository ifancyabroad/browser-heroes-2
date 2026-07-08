export type WithGeneratedId<
	TDefinition extends { id: string },
	TId extends string,
> = TDefinition extends unknown ? Omit<TDefinition, "id"> & { id: TId } : never;

export type WithCombatContentIds<
	TCombat extends {
		skillIds: readonly string[];
		featIds: readonly string[];
	},
	TSkillId extends string,
	TFeatId extends string,
> = Omit<TCombat, "skillIds" | "featIds"> & {
	skillIds: readonly TSkillId[];
	featIds: readonly TFeatId[];
};

export type WithEquipmentItemIds<TEquipment, TItemId extends string> = TEquipment extends object
	? {
			[TSlot in keyof TEquipment]: TEquipment[TSlot] extends string | undefined
				? TItemId | undefined
				: TEquipment[TSlot];
		}
	: TEquipment;
