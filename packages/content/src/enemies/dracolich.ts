import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dracolich",
	name: "Dracolich",
	description:
		"A dragon preserved in undeath by necromancy, its breath now carrying the same decay that consumes its body. It still guards a hoard accumulated across several lifetimes.",
	portrait: "enemies/dungeon/dracolich.png",
	rank: "normal",
	threat: 26,
	attributes: {
		strength: 22,
		dexterity: 14,
		constitution: 18,
		intelligence: 16,
		wisdom: 14,
		charisma: 20,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 18,
		damageAffinities: {
			resistances: ["acid", "cold", "fire", "lightning", "necrotic", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claw",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d8",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["tail_swipe", "double_strike", "necro_breath", "dragon_focus"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution", "wisdom", "charisma"],
	},
	encounter: {
		zone: "dungeon",
		weight: 1,
	},
	tags: [],
});
