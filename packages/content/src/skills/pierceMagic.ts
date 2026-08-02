import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "pierce_magic",
	name: "Pierce Magic",
	description: "Unravel the enemy's magical defenses, hindering their saving throws.",
	icon: "skills/mage/pierce_magic.png",
	pool: "mage",
	kind: "spell",
	category: "debuff",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "savingThrow",
			mode: "disadvantage",
			durationTurns: 6,
		},
	],
	tags: [],
});
