"use client";

import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUpload } from "../file-upload";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

const HeaderCreate = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("data", data);
    try {
      await axios.patch(`/api/process-videos`, data);
      toast({
        variant: "default",
        title: "Success!",
        description: "Video uploaded successfully.",
      });
      setOpen(false);
      router.push("/dashboard/create-video");
    } catch {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Video</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload new Video</DialogTitle>
          <DialogDescription>
            After you uploaded the video you can add all important informations.
          </DialogDescription>
        </DialogHeader>
        <FileUpload
          endpoint="processVideo"
          onChange={(url) => {
            if (url) {
              onSubmit({ videoUrl: url });
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default HeaderCreate;
