import { LayoutTemplate } from "@/components/main-layout";
import CreateRatingForm from "./_components/rating-create-form";
import { getRatingScales } from "./_actions";

const CreateRatingPage = async () => {
  const breadcrumbItems = [
    { title: "Create rating", link: "/dashboard/create-rating" },
  ];

  const ratingScales = (await getRatingScales()) || [];

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
        />
      </div>
    </>
  );
};

export default CreateRatingPage;
