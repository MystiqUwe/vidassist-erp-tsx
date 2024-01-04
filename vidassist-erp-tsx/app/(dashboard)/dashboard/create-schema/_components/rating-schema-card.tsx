import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { DeleteSchemaAlert } from "./delete-schema";

const RatingSchemaCard = ({
  children,
  title,
  category,
  schemaId,
}: {
  children: JSX.Element;
  title: string;
  category: string;
  schemaId: string;
}) => {
  const router = useRouter();

  const createCriteria = () => {
    if (schemaId) {
      router.push(`/dashboard/create-rating/${schemaId}`);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">{children}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <DeleteSchemaAlert schemaId={schemaId} />
        <Button onClick={createCriteria}>Add criteria</Button>
      </CardFooter>
    </Card>
  );
};

export default RatingSchemaCard;
