import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback";
import { LoginModal, RegisterModal, SessionGate } from "./features/auth";
import { ErrorModal } from "./components/ErrorModal";
import { SocketConnection } from "./components/SocketConnection";
import { TooltipProvider } from "./components/Tooltip";
import { AchievementToasts } from "./features/achievements";
import { HoldingPage } from "./pages/HoldingPage";
import { canAccessGame } from "./utils/holdingPageAccess";

const application = canAccessGame() ? (
	<ErrorBoundary
		FallbackComponent={ErrorFallback}
		onError={(error, info) => {
			console.error("ErrorBoundary caught an error:", error, info);
		}}
	>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<TooltipProvider>
					<SessionGate>
						<SocketConnection />
						<App />
						<LoginModal />
						<RegisterModal />
						<ErrorModal />
						<AchievementToasts />
					</SessionGate>
				</TooltipProvider>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</ErrorBoundary>
) : (
	<HoldingPage />
);

createRoot(document.getElementById("root")!).render(<StrictMode>{application}</StrictMode>);
