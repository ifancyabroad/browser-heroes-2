import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bog_witch",
	name: "Bog Witch",
	description:
		"A reclusive witch who brews poisons and trades in stolen vitality. Marsh villagers leave payment outside her dwelling rather than risk being invited inside.",
	portrait: "enemies/swamp/09.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 10,
		dexterity: 14,
		constitution: 14,
		intelligence: 18,
		wisdom: 16,
		charisma: 14,
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
				dice: "1d8",
				type: "necrotic",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["cursing_bolt", "venom_bolt", "drain_life"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "charisma"],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});
