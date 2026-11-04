import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "bear_clan_raider",
	name: "Bear Clan Raider",
	description:
		"A Bear Clan warrior who carries axe and shield on the winter raids. His share of the spoils must feed the household until the thaw.",
	portrait: "enemies/tundra/bear_clan_raider.png",
	rank: "normal",
	threat: 19,
	attributes: {
		strength: 20,
		dexterity: 14,
		constitution: 18,
		intelligence: 10,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 16,
		initiative: 12,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Exceptional Battleaxe",
			icon: "items/weapons/axes/Axe_01.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+3",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["powerful_blow", "berserk"],
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
