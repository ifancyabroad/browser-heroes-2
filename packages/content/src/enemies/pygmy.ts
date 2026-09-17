import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "pygmy",
	name: "Pygmy",
	description:
		"Holds its patch of forest stubbornly. Larger creatures have learned to go around.",
	portrait: "enemies/forest/pygmy.png",
	rank: "normal",
	threat: 6,
	attributes: {
		strength: 13,
		dexterity: 11,
		constitution: 10,
		intelligence: 6,
		wisdom: 10,
		charisma: 7,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Hammer",
			icon: "items/weapons/hammers/Hammer_21.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "crushing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["heavy_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
