import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "binkus_the_all_knowing",
	name: "Binkus the All Knowing",
	portrait: "enemies/dungeon/binkus_the_all_knowing.png",
	rank: "boss",
	threat: 25,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 16,
		intelligence: 24,
		wisdom: 18,
		charisma: 16,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 21,
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
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["finger_of_death", "chain_lightning", "dragon_breath", "binkus_deathray"],
		featIds: ["arcane_warding", "arcane_penetration"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom", "constitution"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
