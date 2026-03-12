import { Loader2 } from "lucide-react";

export function LoadingState() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-secondary">
			<div className="text-center">
				<Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
				<p className="text-muted-foreground font-medium">Loading your sahani planner...</p>
			</div>
		</div>
	);
}
