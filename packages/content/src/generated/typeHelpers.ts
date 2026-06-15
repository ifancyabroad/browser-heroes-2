// Generated â€” do not edit by hand

export type WithGeneratedId<TDefinition extends { id: string }, TId extends string> = TDefinition extends unknown ? Omit<TDefinition, 'id'> & { id: TId } : never;

export type WithSkillRefId<TSkillRef extends { skillId: string }, TSkillId extends string> = Omit<TSkillRef, 'skillId'> & { skillId: TSkillId };

export type WithCombatContentIds<TCombat extends { skills: readonly { skillId: string }[]; featIds: readonly string[] }, TSkillId extends string, TFeatId extends string> = Omit<TCombat, 'skills' | 'featIds'> & {
  skills: readonly WithSkillRefId<TCombat['skills'][number], TSkillId>[];
  featIds: readonly TFeatId[];
};

export type WithEquipmentItemIds<TEquipment, TItemId extends string> = TEquipment extends object ? {
  [TSlot in keyof TEquipment]: TEquipment[TSlot] extends string | undefined ? TItemId | undefined : TEquipment[TSlot];
} : TEquipment;