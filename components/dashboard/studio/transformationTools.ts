import {
  Eraser,
  Expand,
  Layers,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type StudioTool = {
  type: TransformationTypeKey;
  label: string;
  description: string;
  route: string;
  icon: LucideIcon;
};

export const studioTools: StudioTool[] = [
  {
    type: "restore",
    label: "Image restore",
    description: "Repair noise, scratches, and faded details.",
    route: "/transformations/add/restore",
    icon: Sparkles,
  },
  {
    type: "fill",
    label: "Generative fill",
    description: "Extend a canvas beyond its original frame.",
    route: "/transformations/add/fill",
    icon: Expand,
  },
  {
    type: "remove",
    label: "Object remove",
    description: "Erase distractions while preserving the scene.",
    route: "/transformations/add/remove",
    icon: Eraser,
  },
  {
    type: "recolor",
    label: "Object recolor",
    description: "Shift product and subject colors precisely.",
    route: "/transformations/add/recolor",
    icon: Palette,
  },
  {
    type: "removeBackground",
    label: "Background remove",
    description: "Isolate subjects with a clean transparent cutout.",
    route: "/transformations/add/removeBackground",
    icon: Layers,
  },
];

export function getStudioTool(type: string) {
  return studioTools.find((tool) => tool.type === type);
}
