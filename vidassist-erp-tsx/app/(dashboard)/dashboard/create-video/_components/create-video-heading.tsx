import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const CreateVideoHeading = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={"Create process video"}
          description={"Create a new process video"}
        />
      </div>
      <Separator />
    </>
  );
};

export default CreateVideoHeading;
