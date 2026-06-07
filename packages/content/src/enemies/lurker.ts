import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "lurker",
	name: "Lurker",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4d8dm_1E4j77WgLI5?alt=media&token=5172fe78-33df-4243-81cb-5f2697d2a3a7",
	rank: "normal",
	level: 16,
	threat: 16,
	attributes: {
		strength: 20,
		dexterity: 10,
		constitution: 20,
		intelligence: 5,
		wisdom: 12,
		charisma: 13,
	},
	combat: {
		maxHp: 170,
		armourClass: 16,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 10,
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "obliterate", "powerful_blow"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
