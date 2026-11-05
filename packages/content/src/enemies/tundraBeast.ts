import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "tundra_beast",
	name: "Tundra Beast",
	description:
		"A horned mountain predator that drags its kills beneath the snow. Hunters recognise its territory by abandoned carcasses from which only the richest meat is missing.",
	portrait: "enemies/tundra/tundra_beast.png",
	rank: "normal",
	threat: 20,
	attributes: {
		strength: 22,
		dexterity: 14,
		constitution: 20,
		intelligence: 6,
		wisdom: 12,
		charisma: 8,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 15,
		initiative: 11,
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
		skillIds: ["double_strike", "deafening_roar", "ravage"],
		featIds: [],
		tactic: "default",
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
