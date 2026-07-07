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
			{enemyPortrait && (
				<img
					src={enemyPortrait}
					alt={enemyName}
					loading="lazy"
					className="h-full w-full object-contain"
				/>
			)}
		</section>
	);
}
