import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_hero",
	name: "Goblin Hero",
	shortName: "Hero",
	description:
		"A veteran raider who fights with sword, shield, and prepared poisons. Younger goblins follow his example, though few survive long enough to earn his standing.",
	portrait: "enemies/outpost/goblin_hero.png",
	rank: "normal",
	threat: 9,
	attributes: {
		strength: 12,
		dexterity: 15,
		constitution: 12,
		intelligence: 10,
		wisdom: 8,
		charisma: 10,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 15,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Scimitar",
			icon: "items/weapons/swords/Sword_v2_01.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["poison_jab", "kick"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "outpost",
		weight: 1,
	},
	tags: [],
});
