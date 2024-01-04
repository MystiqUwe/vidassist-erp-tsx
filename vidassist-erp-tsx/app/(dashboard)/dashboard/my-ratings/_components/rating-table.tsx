"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./rating-columns";
import { DataTable } from "@/components/ui/data-table";

interface RatingTableProps {
  data: {
    description: string;
    id: string;
    name: string;
  }[];
}

export const RatingTable: React.FC<RatingTableProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Rating criterias (${data?.length})`}
          description="Manage your rating criterias"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data || []} />
    </>
  );
};
