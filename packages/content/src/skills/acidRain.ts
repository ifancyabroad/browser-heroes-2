import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "acid_rain",
	name: "Acid Rain",
	description: "Summon corrosive acid from the skies.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3z5D4In6VQLtKZxrV?alt=media&token=88adbc86-f012-43b3-b304-45ba2281e9fe",
	pool: "mage",
	category: "spell",
	maxUses: 12,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			operation: "add",
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
