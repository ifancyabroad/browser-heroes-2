import type { TownView } from "@app/engine";
import type { ConsumableId } from "@app/content";
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
	availableConsumableIds: ReadonlySet<ConsumableId>;
	onRest: () => void;
	onBuyConsumable: (consumableType: ConsumableId) => void;
	onContinue: () => void;
};

const tileClassName =
	"group relative flex h-36 w-full flex-col overflow-hidden border-2 border-border bg-bg-panel text-text-bright enabled:cursor-pointer enabled:hover:border-border-bright disabled:cursor-not-allowed disabled:border-border-secondary disabled:text-text-muted focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function TownHub({
	town,
	isPending,
	canEnterCombat,
	canRest,
	availableConsumableIds,
	onRest,
	onBuyConsumable,
	onContinue,
}: TownHubProps) {
	const zoneName = formatTitle(town.zone);
	const potion = town.consumables.healingPotion;
	const potionsFull = potion.quantity >= potion.maxCarry;
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
			status: `${potion.quantity}/${potion.maxCarry}`,
			variant: potionsFull ? "success" : potion.quantity === 0 ? "error" : "warning",
			price: potion.price,
			canAfford: potion.canAfford,
			label: "Buy one healing potion",
			disabled: isPending || !availableConsumableIds.has("healingPotion"),
			onClick: () => onBuyConsumable("healingPotion"),
		},
	] as const;
	return (
		<div className="grid grid-cols-2 gap-3" aria-label="Town destinations">
			{services.map((service) => (
				<article key={service.id} aria-labelledby={`town-${service.id}`}>
					<button
						type="button"
						className={`${tileClassName} items-center justify-end gap-2 p-3`}
						aria-label={service.label}
						disabled={service.disabled}
						onClick={service.onClick}
					>
						<img
							src={service.icon}
							alt=""
							className="size-18 shrink-0 object-contain group-disabled:grayscale"
						/>
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
						<span id={`town-${service.id}`} className="shrink-0">
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
					<span className="relative flex min-h-0 flex-1 items-center justify-center group-disabled:grayscale">
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
					<span className="flex shrink-0 flex-wrap items-center justify-center gap-x-2 p-2">
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
