import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "living_flame",
	name: "Living Flame",
	portrait: "enemies/volcano/living_flame.png",
	rank: "normal",
	threat: 21,
	attributes: {
		strength: 9,
		dexterity: 14,
		constitution: 16,
		intelligence: 20,
		wisdom: 16,
		charisma: 14,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: ["fire", "poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Burning Touch",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8",
				type: "fire",
				damageClass: "magical",
				attribute: "dexterity",
			},
		},
		skillIds: ["engulf", "fireball", "piercing_magic", "embrace_elements"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
