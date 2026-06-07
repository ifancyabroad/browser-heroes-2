import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "abyss_armour",
	name: "Abyss Armour",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4_cpdJr5yvR4b9FM4?alt=media&token=73d7fb9b-114e-4373-b327-6e8c0dfa74d9",
	rank: "normal",
	level: 16,
	threat: 16,
	attributes: {
		strength: 18,
		dexterity: 10,
		constitution: 18,
		intelligence: 10,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		maxHp: 154,
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
			attackBonus: 9,
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["armour_break", "disarm", "wind_strike"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
