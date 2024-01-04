"use client";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { BoardColumn, BoardContainer } from "./board-column";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  KeyboardSensor,
  Announcements,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { RatingCard } from "./rating-card";
import type { Column } from "./board-column";
import { hasDraggableData } from "@/lib/utils";
import NewSectionDialog from "./new-section-dialog";
import { ColumnId, Rating, useRatingsStore } from "@/lib/store-ratings";
// import { coordinateGetter } from "./multipleContainersKeyboardPreset";

export function RatingBoard() {
  //Columns === Alle rating_schemas
  // const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columns = useRatingsStore((state) => state.columns);
  const setColumns = useRatingsStore((state) => state.setCols);
  const pickedUpTaskColumn = useRef<ColumnId | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  //initialRatings === Alle ratings die zu einem Schema gehören
  // const [ratings, setRatings] = useState<Rating[]>(initialRatings);
  const ratings = useRatingsStore((state) => state.ratings);
  const setRatings = useRatingsStore((state) => state.setRatings);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [isMounted, setIsMounted] = useState<Boolean>(false);

  const [activeRating, setActiveRating] = useState<Rating | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: coordinateGetter,
    // }),
  );

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  useEffect(() => {
    useRatingsStore.persist.rehydrate();
  }, []);
  if (!isMounted) return;

  function getDraggingRatingData(
    ratingId: UniqueIdentifier,
    columnId: ColumnId
  ) {
    /* const ratingsInColumn = ratings.filter((rating) => rating.status === columnId);
    const ratingPosition = ratingsInColumn.findIndex((task) => task.id === taskId);
    const column = columns.find((col) => col.id === columnId);
    return {
      tasksInColumn,
      taskPosition,
      column,
    };*/
    console.log("arguments", arguments);
  }

  /* const announcements: Announcements = {
    onDragStart({ active }) {
        if (!hasDraggableData(active)) return;
        if (active.data.current?.type === "Column") {
          const startColumnIdx = columnsId.findIndex((id) => id === active.id);
          const startColumn = columns[startColumnIdx];
          return `Picked up Column ${startColumn?.title} at position: ${
            startColumnIdx + 1
          } of ${columnsId.length}`;
        } else if (active.data.current?.type === "Rating") {
          pickedUpTaskColumn.current = active.data.current.task.status;
          const { tasksInColumn, taskPosition, column } = getDraggingTaskData(
            active.id,
            pickedUpTaskColumn.current,
          );
          return `Picked up Rating ${active.data.current.rating.title} at position: ${
            taskPosition + 1
          } of ${tasksInColumn.length} in column ${column?.title}`;
        }
      },
  }*/

  return (
    <div>
      <h1>Rating Board</h1>
    </div>
  );
}
