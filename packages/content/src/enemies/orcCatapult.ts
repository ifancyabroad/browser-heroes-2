import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_catapult",
	name: "Orc Catapult",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-nWLztbFpJO85EUGY?alt=media&token=f1fb0a85-0153-424f-98b5-cfcacb9173da",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 16,
		intelligence: 10,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDice: "15d8+62",
		armourClass: 14,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "reposition",
				rank: 2,
			},
			{
				skillId: "head_shot",
				rank: 2,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
