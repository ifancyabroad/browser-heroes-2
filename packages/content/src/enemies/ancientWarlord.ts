import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ancient_warlord",
	name: "Ancient Warlord",
	description:
		"The reanimated commander of a forgotten army, still directing battles from behind his shield. His soldiers carry standards belonging to a kingdom absent from surviving maps.",
	portrait: "enemies/citadel/04.PNG",
	rank: "normal",
	threat: 23,
	attributes: {
		strength: 18,
		dexterity: 14,
		constitution: 18,
		intelligence: 12,
		wisdom: 14,
		charisma: 16,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 19,
		damageAffinities: {
			resistances: ["acid", "cold", "fire", "lightning", "necrotic", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Exceptional Longsword",
			icon: "items/weapons/swords/Sword_17.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+3",
				type: "slashing",
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
							damageType: "necrotic",
							damageClass: "magical",
							dice: "1d6",
						},
					],
				},
			],
		},
		skillIds: ["double_strike", "battle_cry", "armour_break"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom"],
	},
	encounter: {
		zone: "citadel",
		weight: 1,
	},
	tags: [],
});
