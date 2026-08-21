import {
  Coins,
  Eraser,
  Expand,
  House,
  ImagePlus,
  Palette,
  ScanSearch,
  UserRound,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

export type DashboardNavItem = {
  label: string;
  route: string;
  icon: LucideIcon;
  description?: string;
};

export type DashboardNavGroup = {
  label: string;
  items: DashboardNavItem[];
};

export const dashboardNavGroups: DashboardNavGroup[] = [
  {
    label: "Workspace",
    items: [
      {
        label: "Studio",
        route: "/studio",
        icon: House,
        description: "Your creative home",
      },
    ],
  },
  {
    label: "Create",
    items: [
      {
        label: "Image restore",
        route: "/transformations/add/restore",
        icon: ImagePlus,
      },
      {
        label: "Generative fill",
        route: "/transformations/add/fill",
        icon: Expand,
      },
      {
        label: "Object remove",
        route: "/transformations/add/remove",
        icon: ScanSearch,
      },
      {
        label: "Object recolor",
        route: "/transformations/add/recolor",
        icon: Palette,
      },
      {
        label: "Remove background",
        route: "/transformations/add/removeBackground",
        icon: Eraser,
      },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", route: "/profile", icon: UserRound },
      { label: "Credits", route: "/credits", icon: Coins },
    ],
  },
];

export const studioTools = dashboardNavGroups[1].items;

export function getDashboardPageTitle(pathname: string) {
  const exactItem = dashboardNavGroups
    .flatMap((group) => group.items)
    .find((item) => item.route === pathname);

  if (exactItem) return exactItem.label;
  if (/^\/transformations\/[^/]+\/update$/.test(pathname)) return "Update image";
  if (/^\/transformations\/[^/]+$/.test(pathname)) return "Image details";

  return "Creative workspace";
}

export const workspaceAccent = WandSparkles;
