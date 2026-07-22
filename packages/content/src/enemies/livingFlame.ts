import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "living_flame",
	name: "Living Flame",
	portrait: "enemies/volcano/living_flame.png",
	rank: "normal",
	threat: 18,
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
			name: "Burning Touch",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d6",
				type: "fire",
				attribute: "intelligence",
			},
		},
		skillIds: ["engulf", "fireball"],
		featIds: ["arcane_penetration", "embrace_elements"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "constitution"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
