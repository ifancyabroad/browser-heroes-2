import type {
	ApplyStatusEffect,
	DamageOverTimeEffect,
	DamageType,
	HealOverTimeEffect,
	ModifyDamageAffinityEffect,
	ModifyDamageEffect,
	ModifyDamageTakenEffect,
	ModifyHealingEffect,
	ModifyRollEffect,
	ModifyStatEffect,
	ShieldEffect,
} from "@app/content";

import type { CombatState } from "../../../schemas";
import type { DamageAffinity } from "../damage/damageAffinity";

export type ActionOutcome =
	| {
			type: "damage";
			targetName: string;
			damageType: DamageType;
			hpDamage: number;
			absorbedDamage: number;
			affinity: DamageAffinity;
			critical: boolean;
			halfDamageSave: boolean;
	  }
	| { type: "miss"; targetName: string }
	| { type: "resisted"; targetName: string; subject: string }
	| { type: "healing"; targetName: string; amount: number }
	| {
			type: "modifier";
			targetName: string;
			effect:
				| ModifyStatEffect
				| ModifyHealingEffect
				| ModifyDamageEffect
				| ModifyDamageTakenEffect
				| ModifyDamageAffinityEffect
				| ModifyRollEffect;
			refreshed: boolean;
	  }
	| {
			type: "status";
			targetName: string;
			effect: ApplyStatusEffect;
			refreshed: boolean;
	  }
	| {
			type: "recurring";
			targetName: string;
			effect: DamageOverTimeEffect | HealOverTimeEffect | ShieldEffect;
			refreshed: boolean;
	  };

export type ActionResolution = {
	combat: CombatState;
	outcomes: ActionOutcome[];
};
