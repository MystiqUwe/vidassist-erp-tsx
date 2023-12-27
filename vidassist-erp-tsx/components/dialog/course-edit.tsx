"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CourseForm from "../forms/course-form"

function handleSubmit() {
  console.log("submitted", arguments)
}

export default function DialogEditCourse() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>
            Make changes to your Course here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <CourseForm />
      </DialogContent>
    </Dialog>
  )
}
