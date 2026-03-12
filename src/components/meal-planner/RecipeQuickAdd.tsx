import type { Doc, Id } from "convex/_generated/dataModel";
import { ChefHat, Clock } from "lucide-react";

interface RecipeQuickAddProps {
	recipe: Doc<"recipes">;
	onAdd: (recipeId: Id<"recipes">) => void;
}

export function RecipeQuickAdd({
	recipe,
	onAdd,
}: RecipeQuickAddProps) {
	const totalTime =
		(recipe.prepTimeMinutes ?? 0) + (recipe.cookTimeMinutes ?? 0);

	return (
		<button
			type="button"
			onClick={() => onAdd(recipe._id)}
			className="flex items-center gap-3 p-3 bg-secondary rounded-xl hover:bg-muted border border-transparent hover:border-border transition-all cursor-pointer w-full text-left"
		>
			<div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center flex-shrink-0 overflow-hidden">
				{recipe.imageUrl ? (
					<img
						src={recipe.imageUrl}
						alt={recipe.name}
						className="w-full h-full object-cover"
					/>
				) : (
					<ChefHat className="w-6 h-6 text-sahani-tertiary" />
				)}
			</div>
			<div className="flex-1 min-w-0">
				<h4 className="font-bold text-sm text-foreground truncate">{recipe.name}</h4>
				<div className="flex items-center gap-2 mt-1">
					<span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
						{recipe.calories} kcal
					</span>
					{totalTime > 0 && (
						<span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
							<Clock className="w-3 h-3" />
							{totalTime}m
						</span>
					)}
				</div>
			</div>
		</button>
	);
}
