import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "squib",
	name: "Squib",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dIirSbCPjrRRGen8U?alt=media&token=916c42e0-7972-46a7-b065-8a1bd5ec88b8",
	rank: "normal",
	level: 7,
	threat: 7,
	attributes: {
		strength: 13,
		dexterity: 10,
		constitution: 11,
		intelligence: 11,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		hitDice: "7d8+13",
		armourClass: 11,
		proficiencyBonus: 3,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skills: [
			{
				skillId: "doom_song",
				rank: 1,
			},
		],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
