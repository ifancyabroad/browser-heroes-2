import { buildConsumable } from "../builders/buildConsumable";

export default buildConsumable({
	id: "healingPotion",
	name: "Healing Potion",
	description: "Restore 50% of maximum HP, adjusted by healing modifiers.",
	icon: "consumables/Res_49_health.png",
	basePrice: 20,
	maxCarry: 3,
	effect: {
		type: "healPercent",
		target: "self",
		percent: 0.5,
	},
});
