import type { Meta, StoryObj } from "@storybook/react-vite";
import { RecipeCard } from "./RecipeCard";

const meta = {
	title: "Sahani/RecipeCard",
	component: RecipeCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: 260 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
	args: {
		name: "Kenyan Pilau",
		imageUrl:
			"https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop",
		calories: 450,
		rating: 4.9,
	},
};

export const WithoutImage: Story = {
	args: {
		name: "Githeri Stew",
		calories: 320,
	},
};

export const WithRating: Story = {
	args: {
		name: "Kaimati",
		imageUrl:
			"https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=200&fit=crop",
		calories: 280,
		rating: 4.7,
	},
};

export const LongName: Story = {
	args: {
		name: "Traditional Kenyan Nyama Choma with Kachumbari and Ugali",
		calories: 650,
		rating: 5.0,
	},
};
