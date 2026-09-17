import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_warlock",
	name: "Orc Warlock",
	description:
		"The other orcs lower their voices when it passes, even the ones who claim to fear nothing.",
	portrait: "enemies/plains/orc_warlock.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 14,
		dexterity: 12,
		constitution: 16,
		intelligence: 18,
		wisdom: 14,
		charisma: 10,
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
			name: "Necrotic Staff",
			icon: "items/weapons/staves/staff_23.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8+1",
				type: "necrotic",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["fireball", "iron_skin", "embrace_shadows", "cursing_bolt"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "charisma"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
