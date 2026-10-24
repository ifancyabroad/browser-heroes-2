import type { Zone } from "@app/content";

import abyss from "../assets/images/backgrounds/bg_41.png";
import castle from "../assets/images/backgrounds/bg_27.png";
import citadel from "../assets/images/backgrounds/bg_43.png";
import desert from "../assets/images/backgrounds/bg_09.png";
import dungeon from "../assets/images/backgrounds/bg_50.png";
import forest from "../assets/images/backgrounds/bg_12.png";
import grove from "../assets/images/backgrounds/bg_33.png";
import hell from "../assets/images/backgrounds/bg_30.png";
import hills from "../assets/images/backgrounds/bg_22.png";
import ocean from "../assets/images/backgrounds/bg_25.png";
import outpost from "../assets/images/backgrounds/bg_14.png";
import plains from "../assets/images/backgrounds/bg_46.png";
import swamp from "../assets/images/backgrounds/bg_37.png";
import temple from "../assets/images/backgrounds/bg_04.png";
import tower from "../assets/images/backgrounds/bg_38.png";
import tundra from "../assets/images/backgrounds/bg_05.png";
import volcano from "../assets/images/backgrounds/bg_16.png";

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
	ocean,
	outpost,
	plains,
	swamp,
	temple,
	tower,
	tundra,
	volcano,
} satisfies Record<Zone, string>;
