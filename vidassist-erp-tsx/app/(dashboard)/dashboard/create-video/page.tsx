import BreadCrumb from "@/components/breadcrumb";
import CreateVideoHeading from "./_components/create-video-heading";
import CreateVideoForm from "./_components/create-video-form";
import { getCategories } from "./_actions";

const CreateCourse = async () => {
  const breadcrumbItems = [
    { title: "Create video", link: "/dashboard/create-video" },
  ];

  const categories = (await getCategories()) || [];

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
      </div>
    </>
  );
};

export default CreateCourse;
