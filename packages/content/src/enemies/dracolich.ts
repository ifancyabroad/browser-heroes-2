import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dracolich",
	name: "Dracolich",
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
			resistances: ["acid", "cold", "fire", "lightning", "piercing", "slashing"],
			immunities: ["necrotic", "poison"],
			vulnerabilities: ["crushing", "radiant"],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "strength",
			damage: {
				dice: "2d8",
				type: "slashing",
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
