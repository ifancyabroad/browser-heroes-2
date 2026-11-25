import { buildConsumable } from "../builders/buildConsumable";

export default buildConsumable({
	id: "invisibilityPotion",
	name: "Potion of Invisibility",
	description: "Become untargetable by your opponent for 4 turns or until you act.",
	icon: "consumables/Alchemy_35_invisibility_flask.png",
	basePrice: 500,
	maxCarry: 1,
	effect: {
		type: "applyStatus",
		target: "self",
		statusId: "invisible",
		duration: { unit: "turns", value: 4 },
	},
});
