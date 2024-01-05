import FormWrapper from "./FormWrapper";
import { Rating } from "react-simple-star-rating";

type Criteria =
  | {
      id: string;
      name: string;
      description: string;
      position: number;
    }[]
  | undefined;

const RatingFormContent = ({ criteria }: { criteria: Criteria }) => {
  console.log("criteria", criteria);
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);
  const handleRating = (rate: number) => {
    console.log("rating", rate);
  };
  return (
    //Create a condional rendering
    <div className="flex flex-col gap-5">
      {criteria &&
        criteria.map((item) => (
          <FormWrapper title={item.name} description={item.description}>
            <div className="w-full flex flex-row">
              <Rating
                onClick={handleRating}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                SVGstyle={{ display: "inline" }}
                /* Available Props */
              />
            </div>
          </FormWrapper>
        ))}
    </div>
  );
};

export default RatingFormContent;
