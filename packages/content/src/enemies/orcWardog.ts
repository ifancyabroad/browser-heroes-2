import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_wardog",
	name: "Orc Wardog",
	description:
		"A great hunting hound ridden into battle by an orc raider. Rider and beast train together to pursue enemies across the open grasslands.",
	portrait: "enemies/plains/orc_wardog.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 18,
		dexterity: 16,
		constitution: 18,
		intelligence: 10,
		wisdom: 12,
		charisma: 10,
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
			name: "Fine Handaxe",
			icon: "items/weapons/axes/Axe_03.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6+1",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["charge", "berserk", "leap_attack"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
