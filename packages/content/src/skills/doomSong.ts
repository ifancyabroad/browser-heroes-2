import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "doom_song",
	name: "Doom Song",
	description:
		"Sing an omen of inevitable death that may sap the enemy's vitality and fighting spirit.",
	icon: "skills/unique/doom_song.png",
	pool: "unique",
	kind: "spell",
	category: "debuff",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "maxHpBonus",
			value: -30,
			durationTurns: 6,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma", bonus: 6 },
			},
		},
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.25,
			durationTurns: 6,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma", bonus: 6 },
			},
		},
	],
	tags: [],
});
