import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_infernal_horseman",
	name: "The Infernal Horseman",
	shortName: "Horseman",
	description:
		"A mounted enforcer who pursues fugitives with a burning scythe. Its passage marks the roads claimed by Brutalus, where even rival fiends travel under tribute.",
	portrait: "enemies/hell/the_infernal_horseman.png",
	rank: "boss",
	threat: 29,
	attributes: {
		strength: 22,
		dexterity: 14,
		constitution: 22,
		intelligence: 14,
		wisdom: 16,
		charisma: 18,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 21,
		initiative: 16,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Masterwork Scythe",
			icon: "items/weapons/spears/Spear_v2_02.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+5",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["condemn", "charge", "double_strike", "fire_strike", "maim"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "hell",
		weight: 1,
	},
	tags: [],
});
