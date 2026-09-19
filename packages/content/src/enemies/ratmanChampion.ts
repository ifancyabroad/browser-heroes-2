import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_champion",
	name: "Ratman Champion",
	description:
		"An armoured clan warrior who leads raids and defends his rank in single combat. First choice of the plunder ensures a steady supply of challengers.",
	portrait: "enemies/desert/ratman_champion.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 16,
		dexterity: 16,
		constitution: 14,
		intelligence: 10,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Longsword",
			icon: "items/weapons/swords/Sword_17.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+1",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["shield_wall", "rend"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
