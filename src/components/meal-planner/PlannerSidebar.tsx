import { Loader2, Search } from "lucide-react";
import type { Doc, Id } from "convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { RecipeQuickAdd } from "@/components/meal-planner/RecipeQuickAdd";
import { EmptyRecipesState } from "@/components/meal-planner/EmptyRecipesState";
import { MacroBar } from "@/components/sahani/MacroBar";
import type { MealType } from "@/components/meal-planner/utils";

interface PlannerSidebarProps {
	selectedSlot: { date: string; mealType: MealType } | null;
	onClearSlot: () => void;
	searchQuery: string;
	onSearchChange: (q: string) => void;
	filterTab: string;
	onFilterTabChange: (tab: string) => void;
	recipes: Doc<"recipes">[] | undefined;
	filteredRecipes: Doc<"recipes">[];
	onAddRecipe: (recipeId: Id<"recipes">) => void;
	consumed: { calories: number; protein: number; carbs: number; fat: number };
	targets: { calories: number; protein: number; carbs: number; fat: number };
}

export function PlannerSidebar({
	selectedSlot,
	onClearSlot,
	searchQuery,
	onSearchChange,
	filterTab,
	onFilterTabChange,
	recipes,
	filteredRecipes,
	onAddRecipe,
	consumed,
	targets,
}: PlannerSidebarProps) {
	const caloriePercent = Math.min(
		100,
		Math.round((consumed.calories / targets.calories) * 100),
	);

	return (
		<aside className="w-80 bg-card border-l border-border fixed right-0 h-full overflow-y-auto z-20 shadow-[-4px_0_12px_rgba(0,0,0,0.02)]">
			<div className="p-6">
				<h2 className="text-xl font-black text-foreground mb-6 tracking-tight">
					{selectedSlot ? `Add to ${selectedSlot.mealType}` : "Quick Add"}
				</h2>

				{selectedSlot && (
					<button
						type="button"
						onClick={onClearSlot}
						className="text-xs font-bold text-primary hover:text-sahani-green-hover mb-6 flex items-center gap-1 transition-colors"
					>
						← Back to all recipes
					</button>
				)}

				<div className="relative mb-6">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sahani-tertiary" />
					<Input
						placeholder="Search recipes..."
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
						className="pl-10 bg-secondary border-border rounded-xl h-11 focus-visible:ring-primary/50"
					/>
				</div>

				<div className="flex gap-2 mb-6">
					{["All", "Favorites", "Recent"].map((tab) => (
						<button
							type="button"
							key={tab}
							onClick={() => onFilterTabChange(tab)}
							className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
								filterTab === tab
									? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
									: "bg-secondary text-muted-foreground hover:bg-border"
							}`}
						>
							{tab}
						</button>
					))}
				</div>

				<div className="space-y-3 mb-8">
					{recipes === undefined ? (
						<div className="flex justify-center py-8">
							<Loader2 className="w-6 h-6 text-primary animate-spin" />
						</div>
					) : filteredRecipes.length === 0 ? (
						<EmptyRecipesState />
					) : (
						filteredRecipes.map((recipe) => (
							<RecipeQuickAdd
								key={recipe._id}
								recipe={recipe}
								onAdd={selectedSlot ? onAddRecipe : () => {}}
							/>
						))
					)}
				</div>

				<div className="pt-6 border-t border-border">
					<h3 className="text-lg font-black text-foreground mb-6 tracking-tight">
						Daily Nutrition Target
					</h3>

					<div className="bg-secondary rounded-2xl p-5 mb-6 border border-border">
						<div className="flex items-center justify-between mb-3">
							<div>
								<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-wider">
									Calories
								</p>
								<p className="text-2xl font-black text-foreground">
									{consumed.calories.toLocaleString()}{" "}
									<span className="text-xs font-bold text-sahani-tertiary">
										/ {targets.calories.toLocaleString()}
									</span>
								</p>
							</div>
							<span className="text-sm font-black text-primary bg-primary/10 px-2 py-1 rounded-lg">
								{caloriePercent}%
							</span>
						</div>
						<div className="h-2.5 bg-border rounded-full overflow-hidden">
							<div
								className="h-full bg-primary rounded-full transition-all duration-500"
								style={{ width: `${caloriePercent}%` }}
							/>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-3">
						<div className="text-center bg-secondary p-3 rounded-xl border border-border">
							<MacroBar
								label="Protein"
								value={consumed.protein}
								target={targets.protein}
								color="blue"
								size="sm"
								showValues={false}
							/>
						</div>
						<div className="text-center bg-secondary p-3 rounded-xl border border-border">
							<MacroBar
								label="Carbs"
								value={consumed.carbs}
								target={targets.carbs}
								color="amber"
								size="sm"
								showValues={false}
							/>
						</div>
						<div className="text-center bg-secondary p-3 rounded-xl border border-border">
							<MacroBar
								label="Fat"
								value={consumed.fat}
								target={targets.fat}
								color="red"
								size="sm"
								showValues={false}
							/>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}
