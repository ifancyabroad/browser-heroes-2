import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "stitched_ogre",
	name: "Stitched Ogre",
	description:
		"An ogre corpse rebuilt with grafted claws and driven by dark magic. Its unnatural speed suggests its maker found ordinary ogres too easy to escape.",
	portrait: "enemies/hills/stitched_ogre.png",
	rank: "normal",
	threat: 18,
	attributes: {
		strength: 19,
		dexterity: 16,
		constitution: 16,
		intelligence: 3,
		wisdom: 6,
		charisma: 5,
	},
	combat: {
		hitDie: "1d10",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Claws",
			icon: "skills/common/claw_strike.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["flurry", "expose_weakness", "shadow_strike"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
