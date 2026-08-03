import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "finger_of_death",
	name: "Finger of Death",
	description: "Unleash a concentrated beam of deathly power that ravages the target's soul.",
	icon: "skills/warlock/finger_of_death.png",
	pool: "warlock",
	kind: "spell",
	category: "damage",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			dice: "8d8",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
