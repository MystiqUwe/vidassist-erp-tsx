"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  courseName: z
    .string()
    .min(3, { message: "Course name must be at least 3 characters long" })
    .max(50, { message: "Course name must be at most 50 characters long" }),
  courseDescription: z
    .string()
    .min(3, {
      message: "Course description must be at least 3 characters long",
    })
    .max(50, {
      message: "Course description must be at most 50 characters long",
    }),
  courseVideo: z.string().url({ message: "Course video must be a valid URL" }),
});

const defaultValues = {
  courseName: "",
  courseDescription: "",
  courseVideo: "",
};

type CreateVideoFormValues = z.infer<typeof formSchema>;

const CreateVideoForm = () => {
  const form = useForm<CreateVideoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <>
      <Form {...form}>
        <form className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Course name" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.courseName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="courseDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                    placeholder="Course description"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.courseName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button className="ml-auto" type="submit">
            Create process
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateVideoForm;
