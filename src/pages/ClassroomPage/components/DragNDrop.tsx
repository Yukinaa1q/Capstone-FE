import React from "react";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ClassSection } from "@/interfaces/IClassroom";

const DragNDrop = ({
  items,
  setItems,
  children,
}: {
  items: (Omit<ClassSection, "contents"> & { isEdit: boolean })[];
  setItems: React.Dispatch<
    React.SetStateAction<
      (Omit<ClassSection, "contents"> & { isEdit: boolean })[]
    >
  >;
  children: React.ReactNode;
}) => {
  const adaptItems = items.map((item) => ({ id: item.sectionId, ...item }));

  const getPost = (searchValue: string) =>
    items.findIndex((ele) => ele.sectionId === searchValue);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      keyboardCodes: {
        start: [],
        cancel: [],
        end: [],
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      if (active.id === over.id) return;
      setItems((items) =>
        arrayMove(
          items,
          getPost(active.id.toString()),
          getPost(over.id.toString())
        )
      );
    }
  };
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <SortableContext
        items={adaptItems}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default DragNDrop;
