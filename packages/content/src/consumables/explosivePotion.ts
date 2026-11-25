import { buildConsumable } from "../builders/buildConsumable";

export default buildConsumable({
	id: "explosivePotion",
	name: "Explosive Potion",
	description: "Deal 3d6 fire damage to the enemy. Always hits and cannot critically hit.",
	icon: "consumables/Alchemy_34_bigenergy_flask.png",
	basePrice: 10,
	maxCarry: 3,
	effect: {
		type: "damage",
		target: "enemy",
		dice: "3d6",
		damageType: "fire",
		damageClass: "other",
	},
});
