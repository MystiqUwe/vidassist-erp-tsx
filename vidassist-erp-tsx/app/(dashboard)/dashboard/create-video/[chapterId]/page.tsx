import BreadCrumb from "@/components/breadcrumb";
import CreateVideoHeading from "../_components/create-video-heading";
import CreateVideoForm from "../_components/create-video-form";

const CreateVideoPage = ({ params }: { params: { chapterId: string } }) => {
  const breadcrumbItems = [
    { title: "Create video", link: "/dashboard/create-video" },
  ];
  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <CreateVideoHeading />
        <CreateVideoForm />
        <div>{params.chapterId}</div>
      </div>
    </>
  );
};

export default CreateVideoPage;
