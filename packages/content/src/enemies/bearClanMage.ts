import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bear_clan_mage",
	name: "Bear Clan Mage",
	description:
		"A clan hedge mage who binds winter winds into destructive spells. His knowledge passes from master to apprentice in stories outsiders mistake for fireside superstition.",
	portrait: "enemies/tundra/N_03.PNG",
	rank: "normal",
	threat: 21,
	attributes: {
		strength: 12,
		dexterity: 12,
		constitution: 14,
		intelligence: 22,
		wisdom: 14,
		charisma: 12,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Exceptional Winter Staff",
			icon: "items/weapons/staves/Staff_v2_02.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8+3",
				type: "cold",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["cone_of_cold", "lightning_bolt", "iron_skin", "power_word_shield"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom"],
	},
	encounter: {
		zone: "tundra",
		weight: 1,
	},
	tags: [],
});
