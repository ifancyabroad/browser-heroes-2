import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "high_executioner_grimhook",
	name: "High Executioner Grimhook",
	description:
		"The outpost's executioner, mounted on a giant rat trained to pursue fleeing prisoners. His hooked polearm tears at enemies caught beneath the beast's pounce.",
	portrait: "enemies/outpost/high_executioner_grimhook.png",
	rank: "boss",
	threat: 13,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 16,
		intelligence: 10,
		wisdom: 8,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		initiative: 12,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Hooked Polearm",
			icon: "items/weapons/spears/Spear_v2_02.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["leap_attack", "rend", "on_the_hook"],
		featIds: [],
		tactic: "default",
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
