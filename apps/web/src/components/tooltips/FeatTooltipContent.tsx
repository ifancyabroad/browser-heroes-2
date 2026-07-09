import type { Feat } from "@app/content";
import clsx from "clsx";
import { featCategoryLabels } from "../../game/displayLabels";
import { formatModifier, getModifierTextClassName } from "../../game/effectDisplay";
import { AttackRiderTooltipList } from "./AttackRiderTooltipList";
import { TooltipSection } from "./TooltipContentPrimitives";

type FeatTooltipContentProps = {
	feat: Feat;
};

export function FeatTooltipContent({ feat }: FeatTooltipContentProps) {
	return (
		<div className="grid gap-3">
			<header className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3">
				<span className="h-14 w-14 overflow-hidden border border-border bg-bg-base">
					<img
						src={feat.icon}
						alt=""
						loading="lazy"
						className="h-full w-full object-cover"
						aria-hidden
					/>
				</span>

				<div className="grid min-w-0 content-center gap-1">
					<p className="break-words text-text-bright">{feat.name}</p>
					<p className="text-text">{featCategoryLabels[feat.category]}</p>
				</div>
			</header>

			{feat.description && (
				<p className="border-t border-border pt-2 text-text">{feat.description}</p>
			)}

			{feat.modifiers.length > 0 && (
				<TooltipSection title="Bonuses">
					<ul className="grid gap-1">
						{feat.modifiers.map((modifier, index) => (
							<li
								key={`${modifier.type}-${index}`}
								className={clsx("break-words", getModifierTextClassName(modifier))}
							>
								{formatModifier(modifier)}
							</li>
						))}
					</ul>
				</TooltipSection>
			)}

			{feat.attackRiders.length > 0 && (
				<TooltipSection title="Attack Riders">
					<AttackRiderTooltipList riders={feat.attackRiders} />
				</TooltipSection>
			)}
		</div>
	);
}
