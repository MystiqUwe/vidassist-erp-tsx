"use client";

import { RatingsSchemaList } from "./rating-schema-list";
import RatingSchemaCard from "./rating-schema-card";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { reorderRatingCriteria } from "../_actions";

interface RatingSchemaContainerProps {
  ratingSchemas:
    | {
        id: string;
        title: string;
        rating_criteria: {
          id: string;
          name: string;
          description: string;
        }[];
        categories: {
          id: string;
          name: string;
        } | null;
      }[]
    | null;
}
const RatingSchemaContainer = ({
  ratingSchemas,
}: RatingSchemaContainerProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const onEdit = async (id: string) => {
    console.log("onEdit", id);
    router.push(`/dashboard/create-rating/schema/${id}`);
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    console.log("onReorder", updateData);
    try {
      setIsUpdating(true);
      const { error } = await reorderRatingCriteria(updateData);
      if (!error) {
        router.refresh();
      } else {
        console.log("[onReorder-error] ", error);
      }
    } catch {
      console.log("Failed to reorder");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isUpdating && (
          <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
          </div>
        )}
        {ratingSchemas && ratingSchemas.length > 0 ? (
          ratingSchemas.map((ratingSchema) => (
            <RatingSchemaCard
              title={ratingSchema?.title || ""}
              category={ratingSchema?.categories?.name || ""}
              schemaId={ratingSchema.id}
              key={ratingSchema.id}
            >
              <RatingsSchemaList
                onEdit={onEdit}
                onReorder={onReorder}
                items={ratingSchema.rating_criteria || []}
              />
            </RatingSchemaCard>
          ))
        ) : (
          <div>no rating schema</div>
        )}
      </div>
    </>
  );
};

export default RatingSchemaContainer;
