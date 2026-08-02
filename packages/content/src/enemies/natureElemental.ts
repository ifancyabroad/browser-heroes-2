import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "nature_elemental",
	name: "Nature Elemental",
	portrait: "enemies/tower/nature_elemental.png",
	rank: "normal",
	threat: 18,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 20,
		intelligence: 8,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
		damageAffinities: {
			resistances: ["acid", "cold", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Venomous Bite",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "poison",
				attribute: "strength",
			},
		},
		skillIds: ["natures_blessing", "poison_cloud"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["constitution", "wisdom"],
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
