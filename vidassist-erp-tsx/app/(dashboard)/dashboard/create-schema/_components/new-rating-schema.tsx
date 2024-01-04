"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { createRatingSchema } from "../_actions";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters long",
  }),
  categoryId: z.string().min(1),
});

const defaultValues = {
  title: "",
  categoryId: "",
};

type NewRatingSchemasFormValues = z.infer<typeof formSchema>;

interface NewRatingSchemasProps {
  categories: { label: string; value: string }[] | [];
}

export default function NewRatingSchemas({
  categories,
}: NewRatingSchemasProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<NewRatingSchemasFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: NewRatingSchemasFormValues) => {
    console.log("submit");
    const { ratingSchema, error } = await createRatingSchema(values);
    if (!error) {
      console.log(ratingSchema);

      toast({
        variant: "default",
        title: "Success",
        description: "Rating schema created!",
      });
      setOpen(false);
      //Path revalidate
      router.refresh();
    } else {
      console.log("[create-rating-schema] error: ", error);
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "Could not create rating schema.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          ＋ New Schema
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new rating schema</DialogTitle>
          <DialogDescription>
            Create a new rating schema for a category!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schema title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. 'Warenwirtschaft rating'"
                    />
                  </FormControl>
                  <FormMessage />
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
                            "w-100 justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
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
                          {categories.map((option) => (
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
            <Button
              size="sm"
              className="ml-auto"
              style={{ float: "right" }}
              type="submit"
            >
              Add Schema
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
