import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "pierce_magic",
	name: "Pierce Magic",
	description:
		"Focus your magic to pierce enemy defenses and make your effects harder to resist.",
	icon: "skills/mage/pierce_magic.png",
	pool: "mage",
	kind: "spell",
	category: "buff",
	maxUses: 4,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "saveDcBonus",
			value: 3,
			durationTurns: 6,
		},
	],
	tags: [],
});
