import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bear_clan_outrider",
	name: "Bear Clan Outrider",
	description:
		"A clan swordsman mounted on a great mountain ram, trained to charge across broken ground. The finest breeding herds are guarded as closely as grain stores.",
	portrait: "enemies/tundra/bear_clan_outrider.png",
	rank: "normal",
	threat: 21,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 18,
		intelligence: 10,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 16,
		initiative: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Exceptional Longsword",
			icon: "items/weapons/swords/Sword_35.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+3",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["charge", "double_strike", "leap_attack"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "tundra",
		weight: 1,
	},
	tags: [],
});
