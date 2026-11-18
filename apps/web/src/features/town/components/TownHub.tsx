import type { TownView } from "@app/engine";
import { IconSwords } from "@tabler/icons-react";
import { Badge } from "../../../components/Badge";
import { formatTitle } from "../../../presentation/effects";
import { ZONE_BACKGROUNDS } from "../../../presentation/zones";
import tavernIcon from "../../../assets/images/town/tavern.png";
import healingPotionIcon from "../../../assets/images/actions/Res_49_health.png";

type TownHubProps = {
	town: TownView;
	isPending: boolean;
	canEnterCombat: boolean;
	canRest: boolean;
	canBuyPotion: boolean;
	onRest: () => void;
	onBuyPotion: () => void;
	onContinue: () => void;
};

const tileClassName =
	"relative flex h-36 w-full flex-col overflow-hidden border-2 border-border bg-bg-panel text-text-bright enabled:cursor-pointer enabled:hover:border-border-bright disabled:cursor-not-allowed disabled:text-text-muted disabled:opacity-60 focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const artClassName = "relative flex min-h-0 flex-1 items-center justify-center";
const captionClassName = "flex shrink-0 items-center justify-center bg-bg-base p-2";

export function TownHub({
	town,
	isPending,
	canEnterCombat,
	canRest,
	canBuyPotion,
	onRest,
	onBuyPotion,
	onContinue,
}: TownHubProps) {
	const zoneName = formatTitle(town.zone);
	const potionsFull = town.healingPotions >= town.maxHealingPotions;
	const services = [
		{
			id: "tavern",
			name: "Tavern",
			icon: tavernIcon,
			status: town.isFullyRested ? "Rested" : "Weary",
			variant: town.isFullyRested ? "success" : "warning",
			price: town.restCost,
			canAfford: town.canAffordRest,
			label: "Rest at tavern",
			disabled: isPending || !canRest,
			onClick: onRest,
		},
		{
			id: "alchemist",
			name: "Alchemist",
			icon: healingPotionIcon,
			status: `${town.healingPotions}/${town.maxHealingPotions}`,
			variant: potionsFull ? "success" : town.healingPotions === 0 ? "error" : "warning",
			price: town.healingPotionCost,
			canAfford: town.canAffordHealingPotion,
			label: "Buy one healing potion",
			disabled: isPending || !canBuyPotion,
			onClick: onBuyPotion,
		},
	] as const;
	return (
		<div className="grid grid-cols-2 gap-3" aria-label="Town destinations">
			{services.map((service) => (
				<article key={service.id} aria-labelledby={`town-${service.id}`}>
					<button
						type="button"
						className={tileClassName}
						aria-label={service.label}
						disabled={service.disabled}
						onClick={service.onClick}
					>
						<span className={artClassName}>
							<img
								src={service.icon}
								alt=""
								className="size-full object-contain p-3"
							/>
						</span>
						<span
							className={`absolute left-2 top-2 tabular-nums ${service.canAfford ? "text-text-bright" : "text-error"}`}
						>
							{service.price}g
						</span>
						<Badge
							label={service.status}
							variant={service.variant}
							textTone="bright"
							className="absolute right-2 top-2 bg-bg-panel"
						/>
						<span id={`town-${service.id}`} className={captionClassName}>
							{service.name}
						</span>
					</button>
				</article>
			))}
			<section aria-label="Next battle" className="col-span-2">
				<button
					type="button"
					className={tileClassName}
					aria-label={`Battle in ${zoneName}`}
					disabled={isPending || !canEnterCombat}
					onClick={onContinue}
				>
					<span className={artClassName}>
						<img
							src={ZONE_BACKGROUNDS[town.zone]}
							alt=""
							className="absolute inset-0 size-full object-cover"
						/>
						<span className="relative size-12" aria-hidden="true">
							<IconSwords
								strokeWidth={4}
								className="absolute inset-0 size-full text-black"
							/>
							<IconSwords
								strokeWidth={2}
								className="absolute inset-0 size-full text-text-bright"
							/>
						</span>
					</span>
					<span className={`${captionClassName} flex-wrap gap-x-2`}>
						<span>{zoneName}</span>
						<span className="text-text tabular-nums">
							{town.zoneBattleNumber}/{town.battlesPerZone}
						</span>
					</span>
				</button>
			</section>
		</div>
	);
}
