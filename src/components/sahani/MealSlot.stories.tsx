import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MealSlot } from "./MealSlot";

const meta = {
	title: "Sahani/MealSlot",
	component: MealSlot,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		onSlotClick: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: 200 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof MealSlot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	args: {
		state: "empty",
	},
};

export const Filled: Story = {
	args: {
		state: "filled",
		recipeName: "Kenyan Pilau",
		calories: 450,
	},
};

export const FilledWithImage: Story = {
	args: {
		state: "filled",
		recipeName: "Kenyan Pilau",
		recipeImage:
			"https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=200&fit=crop",
		calories: 450,
	},
};

export const Selected: Story = {
	args: {
		state: "selected",
		recipeName: "Githeri",
		calories: 320,
	},
};

export const Loading: Story = {
	args: {
		state: "loading",
	},
};
