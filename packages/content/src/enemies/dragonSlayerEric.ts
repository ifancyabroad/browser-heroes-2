import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dragon_slayer_eric",
	name: "Dragon Slayer Eric",
	description:
		"A dragon hunter who fights by sound and instinct with paired blades. Clan apprentices seek his instruction, but few endure their first winter of training.",
	portrait: "enemies/tundra/dragon_slayer_eric.png",
	rank: "boss",
	threat: 26,
	attributes: {
		strength: 18,
		dexterity: 24,
		constitution: 20,
		intelligence: 12,
		wisdom: 18,
		charisma: 14,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 21,
		initiative: 18,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Masterwork Twin Scimitars",
			icon: "items/weapons/swords/Sword_v2_01.png",
			attackAttribute: "dexterity",
			damage: {
				dice: "2d6+4",
				type: "slashing",
				damageClass: "physical",
				attribute: "dexterity",
			},
		},
		skillIds: ["spiritual_guidance", "double_strike", "maim", "flurry"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution", "wisdom"],
	},
	encounter: {
		zone: "tundra",
		weight: 1,
	},
	tags: [],
});
