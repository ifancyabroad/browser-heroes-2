import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "crown_prince_thalanor",
	name: "Crown Prince Thalanor",
	description:
		"The grove's crown prince, trained to fight from the saddle of a royal griffon. Their bond began before either was permitted beyond the palace grounds.",
	portrait: "enemies/grove/crown_prince_thalanor.png",
	rank: "boss",
	threat: 23,
	attributes: {
		strength: 20,
		dexterity: 18,
		constitution: 20,
		intelligence: 14,
		wisdom: 16,
		charisma: 20,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 19,
		initiative: 15,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Sunspire",
			icon: "items/weapons/spears/Spear_30.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+3",
				type: "piercing",
				damageClass: "physical",
				attribute: "strength",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "radiant",
							damageClass: "magical",
							dice: "3d6",
							requiresAttackRoll: false,
						},
					],
				},
			],
		},
		skillIds: ["light_of_elandria", "double_strike", "impale", "drop_from_above", "last_stand"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "charisma"],
	},
	encounter: {
		zone: "grove",
		weight: 1,
	},
	tags: [],
});
