import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "living_flame",
	name: "Living Flame",
	description:
		"An intelligent fire spirit drawn to the heat rising from the mountain’s depths. Smiths once bargained with these beings to kindle furnaces that never cooled.",
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
		initiative: 14,
		damageAffinities: {
			resistances: [],
			immunities: ["fire", "poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Burning Touch",
			icon: "skills/barbarian/fire_strike.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8",
				type: "fire",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["engulf", "fireball", "embrace_elements"],
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
