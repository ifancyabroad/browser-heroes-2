import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "greyhorn_the_caged",
	name: "Greyhorn the Caged",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NgTpSKiIRPOLlAMwvOl?alt=media&token=5d394a14-cf9a-4dc5-8469-c095a7701a74",
	rank: "boss",
	level: 14,
	threat: 14,
	attributes: {
		strength: 18,
		dexterity: 11,
		constitution: 16,
		intelligence: 6,
		wisdom: 16,
		charisma: 9,
	},
	combat: {
		maxHp: 220,
		armourClass: 11,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 9,
			damage: {
				dice: "1d6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["cleave", "minotaur_charge", "frenzy"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
