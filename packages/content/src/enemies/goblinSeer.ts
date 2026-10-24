import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_seer",
	name: "Goblin Seer",
	description:
		"A goblin diviner who reads omens in the dark orb of his staff. He turns those visions against intruders through apparitions and bursts of elemental magic.",
	portrait: "enemies/outpost/05_Gb.PNG",
	rank: "normal",
	threat: 11,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 12,
		intelligence: 16,
		wisdom: 12,
		charisma: 14,
	},
	combat: {
		hitDie: "1d6",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Omen Staff",
			icon: "items/weapons/staves/Staff_v2_35.png",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8",
				type: "necrotic",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["flame_arrow", "shocking_grasp", "spook"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "charisma"],
	},
	encounter: {
		zone: "outpost",
		weight: 1,
	},
	tags: [],
});
