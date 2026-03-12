import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./textarea";

const meta = {
	title: "UI/Textarea",
	component: Textarea,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithPlaceholder: Story = { args: { placeholder: "Write your recipe instructions..." } };
export const Disabled: Story = { args: { placeholder: "Disabled", disabled: true } };
