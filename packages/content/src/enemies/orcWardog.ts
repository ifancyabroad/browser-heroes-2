import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_wardog",
	name: "Orc Wardog",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC-qmwsnK79o4q1bnpz?alt=media&token=02dfb855-a10f-4e34-b880-39ce3cded52b",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 18,
		dexterity: 16,
		constitution: 18,
		intelligence: 10,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
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
		skillIds: ["charge", "berserk", "leap_attack"],
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
