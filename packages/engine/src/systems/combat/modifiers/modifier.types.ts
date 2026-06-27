import type {
	ClassId,
	DamageType,
	FeatId,
	ItemId,
	ModifierOperation,
	PassiveModifier,
} from "@app/content";

export type ModifierSource =
	| {
			type: "item";
			itemId: ItemId;
			instanceId: string;
	  }
	| {
			type: "feat";
			featId: FeatId;
	  }
	| {
			type: "class";
			classId: ClassId;
	  };

export type ResolvedModifier = {
	modifier: PassiveModifier;
	source: ModifierSource;
};

export type ModifierContribution = {
	source: ModifierSource;
	operation: ModifierOperation;
	modifierValue: number;
	previousValue: number;
	resultingValue: number;
};

export type DerivedValue = {
	baseValue: number;
	value: number;
	contributions: ModifierContribution[];
};

export type DamageAffinityOperation = "add" | "remove";

export type DamageAffinityContribution = {
	source: ModifierSource;
	operation: DamageAffinityOperation;
	previousValue: boolean;
	resultingValue: boolean;
};

export type DerivedDamageAffinity = {
	damageType: DamageType;
	baseValue: boolean;
	value: boolean;
	contributions: DamageAffinityContribution[];
};

export type DerivedDamageAffinities = {
	resistances: DerivedDamageAffinity[];
	immunities: DerivedDamageAffinity[];
	vulnerabilities: DerivedDamageAffinity[];
};
