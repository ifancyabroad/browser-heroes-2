import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "savage_yeti",
	name: "Savage Yeti",
	description:
		"A brown-furred alpine predator that hunts across scree slopes and sheltered valleys. Broken branches mark the places where it drags larger kills beneath the trees.",
	portrait: "enemies/mountain/savage_yeti.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 18,
		dexterity: 13,
		constitution: 16,
		intelligence: 8,
		wisdom: 12,
		charisma: 7,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 14,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
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
		zone: "mountain",
		weight: 1,
	},
	tags: [],
});
