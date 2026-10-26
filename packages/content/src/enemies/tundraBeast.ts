import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "tundra_beast",
	name: "Tundra Beast",
	description:
		"A horned mountain predator that drags its kills beneath the snow. Hunters recognise its territory by abandoned carcasses from which only the richest meat is missing.",
	portrait: "enemies/tundra/N_10.PNG",
	rank: "normal",
	threat: 22,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 18,
		intelligence: 6,
		wisdom: 12,
		charisma: 8,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 15,
		damageAffinities: {
			resistances: ["cold"],
			immunities: [],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claws",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "deafening_roar", "knock_down"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "tundra",
		weight: 1,
	},
	tags: [],
});
