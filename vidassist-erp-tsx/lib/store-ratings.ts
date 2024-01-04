import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist } from "zustand/middleware";
import { Column } from "@/components/rating-board/board-column";
import { UniqueIdentifier } from "@dnd-kit/core";

export type ColumnId = {
  id: string;
  title: string;
};

export type Rating = {
  id: string;
  title: string;
  description?: string;
};

export type State = {
  ratings: Rating[];
  columns: Column[];
  draggedRating: string | null;
};

export type Actions = {
  addRating: (title: string, description?: string) => void;
  addCol: (title: string) => void;
  dragRating: (id: string | null) => void;
  removeRating: (title: string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  setRatings: (upatedRating: Rating[]) => void;
  setCols: (cols: Column[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
};

export const useRatingsStore = create<State & Actions>()(
  persist(
    (set) => ({
      ratings: [],
      columns: [],
      draggedRating: null,
      addRating: (title: string, description?: string) =>
        set((state) => ({
          ratings: [...state.ratings, { id: uuid(), title, description }],
        })),
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName } : col
          ),
        })),
      addCol: (title: string) =>
        set((state) => ({
          columns: [...state.columns, { id: uuid(), title }],
        })),
      dragRating: (id: string | null) => set({ draggedRating: id }),
      removeRating: (id: string) =>
        set((state) => ({
          ratings: state.ratings.filter((rating) => rating.id !== id),
        })),
      removeCol: (id: UniqueIdentifier) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id),
        })),
      setRatings: (newRatings: Rating[]) => set({ ratings: newRatings }),
      setCols: (newCols: Column[]) => set({ columns: newCols }),
    }),
    { name: "rating-store", skipHydration: true }
  )
);
