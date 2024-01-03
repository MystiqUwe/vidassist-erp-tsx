"use client";

import * as z from "zod";
import axios from "axios";

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
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { FileUpload } from "@/components/file-upload";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Course name must be at least 3 characters long" })
    .max(50, { message: "Course name must be at most 50 characters long" }),
  description: z
    .string()
    .min(3, {
      message: "Course description must be at least 3 characters long",
    })
    .max(50, {
      message: "Course description must be at most 50 characters long",
    }),
  categoryId: z.string().min(1),
});

const defaultValues = {
  title: "",
  description: "",
  categoryId: "",
};

type CreateVideoFormValues = z.infer<typeof formSchema>;

interface CreateVideoForm {
  comboboxOptions: { label: string; value: string }[] | [];
}

const CreateVideoForm = ({ comboboxOptions }: CreateVideoForm) => {
  const form = useForm<CreateVideoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  console.log(comboboxOptions);

  const [isUploaded, setIsUploaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const router = useRouter();

  const onSubmit = async (values: CreateVideoFormValues) => {
    console.log(values);
    if (!isUploaded) {
      //isUploaded
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please upload a video file first.",
      });
      return;
    } else {
      const data = { ...values, videoUrl };
      console.log("data", data);
      const result = await axios.patch(`/api/process-videos`, data);
      console.log("result", result);
      if (result.status === 200 || result.status == 201) {
        router.push(`/dashboard/process-videos/${result.data[0]._id}`);
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Course name" />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
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
                  {form.formState.errors.description?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? comboboxOptions.find(
                              (option) => option.value === field.value
                            )?.label
                          : "Select category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search category..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {comboboxOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              form.setValue("categoryId", option.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                option.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {isUploaded ? (
            <div className="flex justify-center">
              <video controls className="w-full" src={videoUrl} />
            </div>
          ) : (
            <FileUpload
              endpoint="processVideo"
              onChange={(url) => {
                if (url) {
                  setVideoUrl(url);
                  setIsUploaded(true);
                }
              }}
            />
          )}
          <Button className="ml-auto" style={{ float: "right" }} type="submit">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateVideoForm;
