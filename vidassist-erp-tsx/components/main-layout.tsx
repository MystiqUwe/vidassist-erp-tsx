import BreadCrumb from "./breadcrumb";
import { Heading } from "./ui/heading";
import { Separator } from "./ui/separator";

type breadcrumbItemProps = {
  title: string;
  link: string;
}[];

type LayoutTemplatePropts = {
  breadcrumbItems: breadcrumbItemProps;
  title: string;
  description?: string;
};

export function LayoutTemplate({
  breadcrumbItems,
  title,
  description,
}: LayoutTemplatePropts) {
  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description || ""} />
      </div>
      <Separator />
    </>
  );
}
