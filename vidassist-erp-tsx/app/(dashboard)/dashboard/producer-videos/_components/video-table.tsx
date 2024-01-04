"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./video-columns";

interface ProductsVideoTableProps {
  data: {
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
  }[];
}

export const ProducerVideoTable: React.FC<ProductsVideoTableProps> = ({
  data,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Courses (${data?.length})`}
          description="Manage your courses"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
