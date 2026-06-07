import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_elder_squid",
	name: "The Elder Squid",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9dSO4fdChwx6OrOCx5?alt=media&token=6fda1fb4-5d7e-4f7a-b4e0-f4678f13a835",
	rank: "boss",
	level: 22,
	threat: 22,
	attributes: {
		strength: 18,
		dexterity: 15,
		constitution: 18,
		intelligence: 25,
		wisdom: 22,
		charisma: 18,
	},
	combat: {
		maxHp: 362,
		armourClass: 17,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 11,
			damage: {
				dice: "2d4+2",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: [
			"globe_of_invulnerability",
			"drain_energy",
			"tentacle_wrap",
			"psionic_blast",
			"drain_life",
		],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "ocean",
		weight: 1,
	},
	tags: [],
});
