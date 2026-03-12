import * as React from "react";
import { ChefHat, Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface MealSlotProps extends React.HTMLAttributes<HTMLDivElement> {
	state?: "empty" | "filled" | "selected" | "loading";
	recipeName?: string;
	recipeImage?: string;
	calories?: number;
	onSlotClick?: () => void;
}

function MealSlot({
	state = "empty",
	recipeName,
	recipeImage,
	calories,
	onSlotClick,
	className,
	...props
}: MealSlotProps) {
	if (state === "loading") {
		return (
			<div
				className={cn(
					"bg-card rounded-2xl p-4 min-h-[140px] flex items-center justify-center border border-border",
					className,
				)}
				{...props}
			>
				<Loader2 className="w-6 h-6 text-primary animate-spin" />
			</div>
		);
	}

	if (state === "empty" || (!recipeName && state !== "selected")) {
		return (
			<button
				type="button"
				onClick={onSlotClick}
				className={cn(
					"bg-card rounded-2xl p-4 min-h-[140px] flex items-center justify-center border-2 border-dashed transition-all cursor-pointer group w-full",
					state === "selected"
						? "border-primary bg-primary/10 shadow-md ring-2 ring-primary/20"
						: "border-border hover:border-primary hover:bg-primary/5",
					className,
				)}
				{...props}
			>
				<Plus
					className={cn(
						"w-6 h-6 transition-colors",
						state === "selected"
							? "text-primary"
							: "text-sahani-tertiary group-hover:text-primary",
					)}
				/>
			</button>
		);
	}

	return (
		<div
			onClick={onSlotClick}
			className={cn(
				"bg-card rounded-2xl p-3 border transition-all cursor-pointer group",
				state === "selected"
					? "border-primary shadow-lg ring-2 ring-primary/20 bg-primary/5"
					: "border-border hover:shadow-md",
				className,
			)}
			{...props}
		>
			<div className="w-full h-24 rounded-xl bg-secondary mb-3 flex items-center justify-center overflow-hidden border border-border">
				{recipeImage ? (
					<img
						src={recipeImage}
						alt={recipeName}
						className={cn(
							"w-full h-full object-cover transition-transform",
							state === "selected"
								? "scale-110"
								: "group-hover:scale-105",
						)}
					/>
				) : (
					<ChefHat
						className={cn(
							"w-8 h-8 transition-colors",
							state === "selected"
								? "text-primary"
								: "text-sahani-tertiary",
						)}
					/>
				)}
			</div>
			<h4 className="font-bold text-sm text-foreground truncate">
				{recipeName}
			</h4>
			{calories !== undefined && (
				<p className="text-xs text-muted-foreground mt-1 font-medium">
					{calories} kcal
				</p>
			)}
		</div>
	);
}

export { MealSlot };
export type { MealSlotProps };
