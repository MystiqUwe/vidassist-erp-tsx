import BreadCrumb from "@/components/breadcrumb";
import CreateVideoHeading from "../_components/create-video-heading";
import CreateVideoForm from "../_components/create-video-form";
import { getCategories, getCourseData } from "../_actions";

const CreateVideoPage = async ({
  params,
}: {
  params: { chapterId: string };
}) => {
  const breadcrumbItems = [
    { title: "Create video", link: "/dashboard/create-video" },
  ];

  const categories = (await getCategories()) || [];
  const courses = (await getCourseData(params.chapterId)) || [];
  console.log("courses", courses);
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <CreateVideoHeading />
        <CreateVideoForm
          initialData={null}
          comboboxOptions={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
        <div>{params.chapterId}</div>
      </div>
    </>
  );
};

export default CreateVideoPage;
