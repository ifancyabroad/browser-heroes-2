import type {
	ClassId,
	AttackRange,
	DamageClass,
	DamageType,
	FeatId,
	ItemId,
	PassiveDamageModifier,
	PassiveModifier,
} from "@app/content";

export type ModifierSource =
	| {
			type: "item";
			instanceId: string;
			sourceName: string;
			staticItemId?: ItemId;
	  }
	| {
			type: "feat";
			featId: FeatId;
			sourceName: string;
	  }
	| {
			type: "class";
			classId: ClassId;
			sourceName: string;
	  };

export type ResolvedModifier = {
	modifier: PassiveModifier;
	source: ModifierSource;
};

export type ModifierContribution = {
	source: ModifierSource;
	operation: "add" | "multiply";
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

export type DerivedDamageModifierContribution = {
	source: ModifierSource;
	modifierValue: number;
	order: number;
};

export type DerivedDamageModifier = {
	damageType?: DamageType;
	damageClass?: DamageClass;
	attackRange?: AttackRange;
	operation: PassiveDamageModifier["operation"];
	value: number;
	contributions: DerivedDamageModifierContribution[];
};
