import type { Doc } from "convex/_generated/dataModel";
import { ChefHat, Loader2, Plus } from "lucide-react";

interface MealCardProps {
	meal: Doc<"mealPlans"> | null;
	recipe: Doc<"recipes"> | null;
	onAdd: () => void;
	isLoading?: boolean;
	isSelected?: boolean;
}

export function MealCard({
	meal,
	recipe,
	onAdd,
	isLoading,
	isSelected,
}: MealCardProps) {
	if (isLoading) {
		return (
			<div className="bg-card rounded-2xl p-4 min-h-[140px] flex items-center justify-center border border-border">
				<Loader2 className="w-6 h-6 text-primary animate-spin" />
			</div>
		);
	}

	if (!meal || !recipe) {
		return (
			<button
				type="button"
				onClick={onAdd}
				className={`bg-card rounded-2xl p-4 min-h-[140px] flex items-center justify-center border-2 border-dashed transition-all cursor-pointer group w-full ${
					isSelected 
						? "border-primary bg-primary/10 shadow-md ring-2 ring-primary/20" 
						: "border-border hover:border-primary hover:bg-primary/5"
				}`}
			>
				<Plus className={`w-6 h-6 transition-colors ${isSelected ? "text-primary" : "text-sahani-tertiary group-hover:text-primary"}`} />
			</button>
		);
	}

	return (
		<div 
			onClick={onAdd}
			className={`bg-card rounded-2xl p-3 border transition-all cursor-pointer group ${
				isSelected 
					? "border-primary shadow-lg ring-2 ring-primary/20 bg-primary/5" 
					: "border-border hover:shadow-md"
			}`}
		>
			<div className="w-full h-24 rounded-xl bg-secondary mb-3 flex items-center justify-center overflow-hidden border border-border">
				{recipe.imageUrl ? (
					<img
						src={recipe.imageUrl}
						alt={recipe.name}
						className={`w-full h-full object-cover transition-transform ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}
					/>
				) : (
					<ChefHat className={`w-8 h-8 transition-colors ${isSelected ? 'text-primary' : 'text-sahani-tertiary'}`} />
				)}
			</div>
			<h4 className="font-bold text-sm text-foreground truncate">
				{recipe.name}
			</h4>
			<p className="text-xs text-muted-foreground mt-1 font-medium">{recipe.calories} kcal</p>
		</div>
	);
}
