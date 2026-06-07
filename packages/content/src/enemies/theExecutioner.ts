import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_executioner",
	name: "The Executioner",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkVOZVy5W_2PPD1vjr?alt=media&token=89a6ef6d-e141-4b2c-b6cf-f5fe2f0ae051",
	rank: "boss",
	level: 19,
	threat: 19,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 18,
		intelligence: 6,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		maxHp: 314,
		armourClass: 16,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing", "radiant"],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 12,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["knock_down", "execute", "powerful_blow"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
