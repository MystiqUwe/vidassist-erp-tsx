import { Icons } from "@/components/icons";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export type Role = {
  value: string;
  label: string;
};

export type IPersmission = {
  id: string;
  created_at: string;
  role: "user" | "admin";
  user_id: string;
  user: IUser;
};

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

type IUser = {
  id: string;
  created_at: string;
  name: string;
  email: string;
};

export type CoursesAndVideos = {
  courses:
    | {
        categoryID: string;
        created_at: string;
        description: string;
        id: string;
        title: string;
        userId: string;
        videos: {
          courseId: string;
          assetId: string;
          playbackId: string;
        }[];
      }[]
    | null;
};

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
