import clsx from "clsx";

type BattlefieldProps = {
	enemyPortrait: string | null;
	enemyName: string;
};

export function Battlefield({ enemyPortrait, enemyName }: BattlefieldProps) {
	return (
		<section
			className="flex min-h-0 flex-1 items-center justify-center"
			aria-label="Battlefield"
		>
			<PortraitStage
				image={enemyPortrait}
				alt={enemyName}
				className="aspect-[4/3] w-full max-w-full md:h-full md:max-h-[min(48vh,32rem)] md:w-auto"
			/>
		</section>
	);
}

type PortraitStageProps = {
	image: string | null;
	alt: string;
	className?: string;
	imageClassName?: string;
};

function PortraitStage({ image, alt, className, imageClassName }: PortraitStageProps) {
	return (
		<div className={clsx("relative min-h-0 min-w-0 overflow-hidden bg-bg-base", className)}>
			{image && (
				<img
					src={image}
					alt={alt}
					loading="lazy"
					className={clsx(
						"absolute inset-0 h-full w-full object-contain",
						imageClassName,
					)}
				/>
			)}
		</div>
	);
}
