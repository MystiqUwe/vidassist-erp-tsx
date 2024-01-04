import { Icons } from "@/components/icons";
import { Column, NavItem, SidebarNavItem } from "@/types";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type Test = {
  categoryID: string;
  created_at: string;
  description: string;
  id: string;
  title: string;
  userId: string;
};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Users",
    href: "/dashboard/user",
    icon: "users",
    label: "users",
  },
  {
    title: "Process videos",
    href: "/dashboard/process-videos",
    icon: "video",
    label: "video",
  },
  {
    title: "Create video",
    href: "/dashboard/create-video",
    icon: "upload",
    label: "upload",
  },
  {
    title: "Producer videos",
    href: "/dashboard/producer-videos",
    icon: "table",
    label: "table",
  },
  {
    title: "Create Schema",
    href: "/dashboard/create-schema",
    icon: "network",
    label: "network",
  },
  {
    title: "Create Rating",
    href: "/dashboard/create-rating",
    icon: "star",
    label: "star",
  },
];

const defaultCols = [
  {
    id: "TODO" as const,
    title: "todo",
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];
