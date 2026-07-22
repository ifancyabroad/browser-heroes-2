import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wizard",
	name: "Wizard",
	portrait: "enemies/castle/wizard.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 10,
		dexterity: 12,
		constitution: 14,
		intelligence: 16,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 10,
		damageAffinities: {
			resistances: [],
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
		skillIds: ["sparks", "frost_arrow", "flame_arrow"],
		featIds: ["armour"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "constitution"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
