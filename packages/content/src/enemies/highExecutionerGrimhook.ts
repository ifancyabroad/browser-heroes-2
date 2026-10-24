import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "high_executioner_grimhook",
	name: "High Executioner Grimhook",
	description:
		"The outpost's executioner, mounted on a giant rat trained to pursue fleeing prisoners. His hooked polearm tears at enemies caught beneath the beast's pounce.",
	portrait: "enemies/outpost/10_Gb.PNG",
	rank: "boss",
	threat: 15,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 16,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Fine Hooked Polearm",
			icon: "items/weapons/spears/Spear_v2_02.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+1",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["leap_attack", "rend"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "outpost",
		weight: 1,
	},
	tags: [],
});
