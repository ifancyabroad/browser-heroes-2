import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "goblin_witch_doctor",
	name: "Goblin Witch Doctor",
	description:
		"A keeper of tribal remedies who tends the outpost's wounded and binds its dead to service. His whispered rites mend goblin flesh and bring decay to intruders.",
	portrait: "enemies/outpost/goblin_witch_doctor.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 8,
		dexterity: 14,
		constitution: 14,
		intelligence: 10,
		wisdom: 16,
		charisma: 10,
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
			name: "Skull Staff",
			icon: "items/weapons/staves/staff_23.png",
			attackAttribute: "wisdom",
			damage: {
				dice: "1d8",
				type: "necrotic",
				damageClass: "magical",
				attribute: "wisdom",
			},
		},
		skillIds: ["inflict_wounds", "curse", "cure_minor_wounds"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["wisdom", "charisma"],
	},
	encounter: {
		zone: "outpost",
		weight: 1,
	},
	tags: [],
});
