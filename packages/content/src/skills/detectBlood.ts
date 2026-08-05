import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "detect_blood",
	name: "Detect Blood",
	description: "Scent exposed blood and pursue the wounded target with predatory precision.",
	icon: "skills/common/detect_blood.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "piercing",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
