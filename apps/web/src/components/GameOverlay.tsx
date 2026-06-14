import { useGameStore, GAME_DURATION } from "../stores/gameStore";

/**
 * Overlay component for game UI controls.
 * Renders different content based on game state:
 * - Idle: Start button
 * - Playing: Timer and score display
 * - Ended: Game over screen with score submission
 */
export default function GameOverlay() {
	const { score, isPlaying, timeLeft, startGame, resetGame } = useGameStore();

	const gameEnded = !isPlaying && score > 0;
	const gameIdle = !isPlaying && score === 0;

	const handlePlayAgain = () => {
		resetGame();
	};

	// Format time as MM:SS
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
			{/* Idle state: Start button */}
			{gameIdle && (
				<button
					onClick={startGame}
					className="pointer-events-auto rounded bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-lg transition-all hover:bg-neutral-100 active:scale-95"
				>
					Start
				</button>
			)}

			{/* Playing state: HUD */}
			{isPlaying && (
				<>
					{/* Timer - top center on mobile, top left on desktop */}
					<div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 md:left-4 md:translate-x-0 rounded bg-black/50 backdrop-blur-sm px-3 py-1.5 text-sm font-medium tabular-nums text-white">
						{formatTime(timeLeft)}
					</div>

					{/* Score - top right */}
					<div className="pointer-events-none absolute right-4 top-4 rounded bg-black/50 backdrop-blur-sm px-3 py-1.5 text-sm font-medium tabular-nums text-white">
						{score.toLocaleString()}
					</div>

					{/* Instructions - bottom center */}
					{timeLeft === GAME_DURATION && (
						<div className="pointer-events-none absolute bottom-6 left-4 right-4 text-center rounded bg-black/50 backdrop-blur-sm px-4 py-2 text-sm text-neutral-300 md:left-auto md:right-auto">
							Click the targets to score
						</div>
					)}
				</>
			)}

			{/* Game ended state */}
			{gameEnded && (
				<div className="pointer-events-auto w-full max-w-xs rounded-lg border border-neutral-800 bg-neutral-900/95 backdrop-blur-sm p-6 shadow-xl">
					<div className="text-center mb-5">
						<p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">
							Final Score
						</p>
						<p className="text-3xl font-semibold tabular-nums text-white">
							{score.toLocaleString()}
						</p>
					</div>

					<div className="space-y-3">
						<button
							onClick={handlePlayAgain}
							className="w-full rounded bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-all hover:bg-neutral-100"
						>
							Try Again
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
