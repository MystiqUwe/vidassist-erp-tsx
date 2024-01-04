import { LayoutTemplate } from "@/components/main-layout";
import { getRatingCriteria, getRatingScales } from "../../_actions";
import { getCategories } from "../../../create-video/_actions";
import CreateRatingForm from "../../_components/rating-create-form";

const CreateRatingWithSchemaPage = async ({
  params,
}: {
  params: { criteriaId: string };
}) => {
  const breadcrumbItems = [
    { title: "Create rating", link: "/dashboard/create-rating" },
  ];

  const ratingScales = (await getRatingScales()) || [];
  const { ratingCriteria: initialData } =
    (await getRatingCriteria(params.criteriaId)) || [];

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <LayoutTemplate
          breadcrumbItems={breadcrumbItems}
          title="Create rating"
          description="Create a new rating"
        />
        <CreateRatingForm
          ratingOptions={ratingScales.map((rating) => ({
            label: rating.name,
            value: rating.id,
          }))}
          initialData={initialData}
        />
      </div>
    </>
  );
};

export default CreateRatingWithSchemaPage;
