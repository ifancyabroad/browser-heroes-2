import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bog_witch",
	name: "Bog Witch",
	description:
		"A reclusive witch who brews poisons and trades in stolen vitality. Marsh villagers leave payment outside her dwelling rather than risk being invited inside.",
	portrait: "enemies/swamp/bog_witch.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 10,
		dexterity: 12,
		constitution: 12,
		intelligence: 16,
		wisdom: 14,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		initiative: 10,
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
		skillIds: ["shadow_bolt", "venom_bolt", "drain_life"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "wisdom"],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});
