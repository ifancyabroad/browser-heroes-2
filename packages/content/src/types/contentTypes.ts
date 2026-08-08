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

export type WithEquipmentIds<TEquipment, TId extends string> = TEquipment extends object
	? {
			[TSlot in keyof TEquipment]: TEquipment[TSlot] extends string | undefined
				? TId | undefined
				: TEquipment[TSlot];
		}
	: TEquipment;

export type WithRestrictedClassIds<
	TDefinition,
	TClassId extends string,
> = TDefinition extends unknown
	? Omit<TDefinition, "restrictedToClassIds"> & {
			restrictedToClassIds?: TClassId[];
		}
	: never;
