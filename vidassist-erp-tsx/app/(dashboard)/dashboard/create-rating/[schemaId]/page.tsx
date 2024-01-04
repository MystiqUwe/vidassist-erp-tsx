import { LayoutTemplate } from "@/components/main-layout";
import { getRatingScales } from "../_actions";
import { getCategories } from "../../create-video/_actions";
import CreateRatingForm from "../_components/rating-create-form";

const CreateRatingWithSchemaPage = async ({
  params,
}: {
  params: { schemaId: string };
}) => {
  const breadcrumbItems = [
    { title: "Create rating", link: "/dashboard/create-rating" },
  ];

  const ratingScales = (await getRatingScales()) || [];
  const categories = (await getCategories()) || [];

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
          categories={categories.map((categorie) => ({
            label: categorie.name,
            value: categorie.id,
          }))}
          schemaId={params.schemaId}
        />
      </div>
    </>
  );
};

export default CreateRatingWithSchemaPage;
