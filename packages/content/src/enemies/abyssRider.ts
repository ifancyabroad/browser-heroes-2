import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "abyss_rider",
	name: "Abyss Rider",
	portrait: "enemies/abyss/abyss_rider.png",
	rank: "normal",
	threat: 17,
	attributes: {
		strength: 18,
		dexterity: 16,
		constitution: 16,
		intelligence: 12,
		wisdom: 14,
		charisma: 18,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
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
			name: "Fine Spear",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+1",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["armour_break", "deafening_roar", "leap_attack", "wind_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "charisma"],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
