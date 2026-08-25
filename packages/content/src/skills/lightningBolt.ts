import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "lightning_bolt",
	name: "Lightning Bolt",
	description: "Hurl a powerful bolt of lightning that can be partially avoided.",
	icon: "skills/wizard/lightning_bolt.png",
	pool: "wizard",
	kind: "spell",
	category: "damage",
	rarity: "uncommon",
	maxUses: 6,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			damageClass: "magical",
			dice: "2d10",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
