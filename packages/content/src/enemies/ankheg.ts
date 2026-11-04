import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ankheg",
	name: "Ankheg",
	description:
		"A burrowing insect whose colony undermines the marsh banks. Abandoned nests leave hollow ground that can swallow livestock long after the colony moves.",
	portrait: "enemies/swamp/ankheg.png",
	rank: "normal",
	threat: 13,
	attributes: {
		strength: 17,
		dexterity: 11,
		constitution: 13,
		intelligence: 1,
		wisdom: 13,
		charisma: 6,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 14,
		initiative: 9,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Mandibles",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["acid_spray"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});
