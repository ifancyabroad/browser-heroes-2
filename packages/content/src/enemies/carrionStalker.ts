import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "carrion_stalker",
	name: "Carrion Stalker",
	portrait: "enemies/abyss/carrion_stalker.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 14,
		dexterity: 16,
		constitution: 14,
		intelligence: 5,
		wisdom: 12,
		charisma: 7,
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
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["detect_blood", "leap_attack"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
