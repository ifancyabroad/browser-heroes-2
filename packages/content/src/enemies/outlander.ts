import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "outlander",
	name: "Outlander",
	shortName: "Outlander",
	description:
		"An armoured exile who survives by escorting travellers between isolated island settlements. The faded colours beneath his shield once belonged to a mainland company.",
	portrait: "enemies/island/outlander.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 16,
		dexterity: 12,
		constitution: 14,
		intelligence: 10,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 17,
		initiative: 10,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Scimitar",
			icon: "items/weapons/swords/Sword_v2_01.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6+1",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["mana_shield", "wind_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "island",
		weight: 1,
	},
	tags: [],
});
