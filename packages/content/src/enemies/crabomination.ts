import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "crabomination",
	name: "Crabomination",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dO9Hor_-bf7V_xgzs?alt=media&token=db1ccc0d-5411-4124-af9b-9af25e3f4cfc",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 20,
		dexterity: 10,
		constitution: 22,
		intelligence: 6,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
		damageAffinities: {
			resistances: ["cold"],
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
		skillIds: ["crab_hammer", "powerful_blow", "skull_bash"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution", "strength"],
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
