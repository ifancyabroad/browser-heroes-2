import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_rain",
	name: "Acid Rain",
	description: "Summon corrosive acid from the skies.",
	icon: "skills/mage/acid_rain.png",
	pool: "mage",
	category: "spell",
	maxUses: 12,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -4,
			durationTurns: 5,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "acid",
			dice: "1d10",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: {
					base: 8,
					attribute: "dexterity",
					includeProficiency: true,
					bonus: 0,
				},
			},
		},
	],
	tags: [],
});
