import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "hydra_of_the_deep",
	name: "Hydra of the Deep",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dX2YZzneMSoTiBmYu?alt=media&token=16286262-5f50-4b25-ae8d-9eaefaa136f1",
	rank: "boss",
	level: 21,
	threat: 21,
	attributes: {
		strength: 24,
		dexterity: 10,
		constitution: 24,
		intelligence: 10,
		wisdom: 13,
		charisma: 14,
	},
	combat: {
		maxHp: 409,
		armourClass: 18,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: ["cold", "poison"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackBonus: 14,
			damage: {
				dice: "2d4+4",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["frost_breath", "deafening_roar", "dragon_focus", "multi_strike"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
