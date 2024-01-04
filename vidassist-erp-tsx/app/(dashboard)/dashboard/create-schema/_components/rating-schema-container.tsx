"use client";

import { RatingsSchemaList } from "./rating-schema-list";
import RatingSchemaCard from "./rating-schema-card";

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
  const onEdit = (id: string) => {
    console.log("onEdit", id);
    // router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    console.log("onReorder", updateData);
    /*  try {
          setIsUpdating(true);
    
          await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
            list: updateData
          });
          toast.success("Chapters reordered");
          router.refresh();
        } catch {
          toast.error("Something went wrong");
        } finally {
          setIsUpdating(false);
        }*/
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ratingSchemas && ratingSchemas.length > 0 ? (
          //Create for each ratingSchemas a card
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
