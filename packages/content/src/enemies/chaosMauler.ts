import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "chaos_mauler",
	name: "Chaos Mauler",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC8tEGD00w4BfIFf7hV?alt=media&token=665ddd4f-b11c-424f-b563-fe646fc75542",
	rank: "normal",
	level: 19,
	threat: 19,
	attributes: {
		strength: 22,
		dexterity: 12,
		constitution: 20,
		intelligence: 10,
		wisdom: 14,
		charisma: 14,
	},
	combat: {
		maxHp: 200,
		armourClass: 18,
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
			attackBonus: 12,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["tenderise", "mighty_blow", "overpower"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
