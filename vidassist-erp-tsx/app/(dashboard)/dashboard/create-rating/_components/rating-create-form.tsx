"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

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
import { redirect, useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(4, {
    message: "Rating name must be at least 4 characters long",
  }),
  description: z.string().min(4, {
    message: "Decription must be at least 4 characters long",
  }),
  rating_scale_id: z.string().min(1),
});

const defaultValues = {
  name: "",
  description: "",
  rating_scale_id: "",
};

type CreateRatingFormValues = z.infer<typeof formSchema>;

interface CreateRatingForm {
  ratingOptions: { label: string; value: string }[] | [];
  categories: { label: string; value: string }[] | [];
  schemaId: string;
}

const CreateRatingForm = ({
  ratingOptions,
  categories,
  schemaId,
}: CreateRatingForm) => {
  const router = useRouter();

  const form = useForm<CreateRatingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: CreateRatingFormValues) => {
    const newValues = { ...values, rating_schema_id: schemaId };
    const result = await axios.patch(`/api/create-rating-criteria`, newValues);
    console.log("result: ", result);
    if (result.status >= 200 && result.status <= 300) {
      if (result?.data) {
        router.push(`/dashboard/create-schema`);
        router.refresh();
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 'Usabilaty'" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                    placeholder="Rating description"
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
            name="rating_scale_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Rating system</FormLabel>
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
                          ? ratingOptions.find(
                              (option) => option.value === field.value
                            )?.label
                          : "Select rating system"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search rating system..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {ratingOptions.map((option) => (
                          <CommandItem
                            value={option.label}
                            key={option.value}
                            onSelect={() => {
                              form.setValue("rating_scale_id", option.value);
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
          <Button className="ml-auto" style={{ float: "right" }} type="submit">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateRatingForm;
