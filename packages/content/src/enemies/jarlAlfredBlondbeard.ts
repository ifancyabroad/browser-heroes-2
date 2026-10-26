import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "jarl_alfred_blondbeard",
	name: "Jarl Alfred Blondbeard",
	description:
		"The Bear Clan's war leader, whose paired blades have settled challenges from rival chiefs. His hall shelters every household that answers his summons before winter.",
	portrait: "enemies/tundra/N_06.PNG",
	rank: "boss",
	threat: 26,
	attributes: {
		strength: 24,
		dexterity: 16,
		constitution: 22,
		intelligence: 12,
		wisdom: 16,
		charisma: 20,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 20,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Masterwork Twin Scimitars",
			icon: "items/weapons/swords/Sword_35.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6+4",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "battle_cry", "rage", "overpower"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "tundra",
		weight: 1,
	},
	tags: [],
});
