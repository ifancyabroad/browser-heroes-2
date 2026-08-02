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
			name: "Quarterstaff",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["armour", "sparks", "frost_arrow", "flame_arrow"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
