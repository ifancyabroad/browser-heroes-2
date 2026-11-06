import type { Zone } from "@app/content";

import abyss from "../assets/images/backgrounds/bg_41.webp";
import castle from "../assets/images/backgrounds/bg_27.webp";
import citadel from "../assets/images/backgrounds/bg_43.webp";
import desert from "../assets/images/backgrounds/bg_09.webp";
import dungeon from "../assets/images/backgrounds/bg_50.webp";
import forest from "../assets/images/backgrounds/bg_12.webp";
import grove from "../assets/images/backgrounds/bg_33.webp";
import hell from "../assets/images/backgrounds/bg_30.webp";
import hills from "../assets/images/backgrounds/bg_22.webp";
import island from "../assets/images/backgrounds/bg_45.webp";
import mountain from "../assets/images/backgrounds/bg_21.webp";
import ocean from "../assets/images/backgrounds/bg_25.webp";
import outpost from "../assets/images/backgrounds/bg_14.webp";
import plains from "../assets/images/backgrounds/bg_46.webp";
import swamp from "../assets/images/backgrounds/bg_37.webp";
import temple from "../assets/images/backgrounds/bg_04.webp";
import tower from "../assets/images/backgrounds/bg_38.webp";
import tundra from "../assets/images/backgrounds/bg_05.webp";
import volcano from "../assets/images/backgrounds/bg_16.webp";

export const ZONE_BACKGROUNDS = {
	abyss,
	castle,
	citadel,
	desert,
	dungeon,
	forest,
	grove,
	hell,
	hills,
	island,
	mountain,
	ocean,
	outpost,
	plains,
	swamp,
	temple,
	tower,
	tundra,
	volcano,
} satisfies Record<Zone, string>;
