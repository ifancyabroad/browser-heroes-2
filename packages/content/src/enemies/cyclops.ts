import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "cyclops",
	name: "Cyclops",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4XNLlQk-tb-D9BMAJ?alt=media&token=e1e9e459-1a43-4c74-8c41-57c817289468",
	rank: "normal",
	level: 16,
	threat: 16,
	attributes: {
		strength: 22,
		dexterity: 11,
		constitution: 20,
		intelligence: 8,
		wisdom: 6,
		charisma: 10,
	},
	combat: {
		hitDice: "16d8+98",
		armourClass: 14,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+2",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "tenderise",
				rank: 2,
			},
			{
				skillId: "double_strike",
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
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
