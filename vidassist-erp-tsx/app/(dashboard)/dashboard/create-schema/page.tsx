import BreadCrumb from "@/components/breadcrumb";
import { Heading } from "@/components/ui/heading";
import RatingSchemaContainer from "./_components/rating-schema-container";
import { getRatingSchemas } from "./_actions";
import NewRatingSchema from "./_components/new-rating-schema";
import { getCategories } from "../create-video/_actions";

const breadcrumbItems = [
  { title: "Rating schema", link: "/dashboard/create-schema" },
];
export default async function CreateSchemaPage() {
  //Query alle Rating schemas + rating criterias

  const { ratingSchemas } = (await getRatingSchemas()) || [];
  console.log(ratingSchemas);
  const categories = (await getCategories()) || [];

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Rating schemas`}
            description="Manage your rating Schemas"
          />
          <NewRatingSchema
            categories={categories.map((categorie) => ({
              label: categorie.name,
              value: categorie.id,
            }))}
          />
        </div>
        <RatingSchemaContainer ratingSchemas={ratingSchemas} />
      </div>
    </>
  );
}
