import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "monk",
	name: "Monk",
	portrait: "enemies/castle/monk.png",
	rank: "normal",
	threat: 10,
	attributes: {
		strength: 10,
		dexterity: 12,
		constitution: 14,
		intelligence: 10,
		wisdom: 16,
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
		skillIds: ["cure_minor_wounds", "holy_bolt"],
		featIds: ["runic_ward"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["wisdom", "constitution"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
