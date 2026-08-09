import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "gremlin_cultist",
	name: "Gremlin Cultist",
	portrait: "enemies/dungeon/gremlin_cultist.png",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 12,
		intelligence: 10,
		wisdom: 16,
		charisma: 12,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Necrotic Staff",
			attackAttribute: "wisdom",
			damage: {
				dice: "1d8+4",
				type: "necrotic",
				attribute: "wisdom",
			},
		},
		skillIds: ["curse", "chosen_by_the_nameless", "drain_life", "power_word_confusion"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
