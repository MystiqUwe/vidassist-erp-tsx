"use client";

import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
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
  const [rating, setRating] = useState(0);
  //ToDo: Man braucht hier noch die VideoID um es eindeutig zu machen
  //ToDo: Wenn bewertung erstellt -> dann muss der sessionStorage mit dem jeweiligen rating gelöscht werden

  //Mark: Is a bit unperformant
  useLayoutEffect(() => {
    if (sessionStorage.getItem(`${criteria?.[0]?.id}`)) {
      setRating(parseInt(sessionStorage.getItem(`${criteria?.[0]?.id}`) ?? ""));
    } else {
      sessionStorage.setItem(`${criteria?.[0]?.id}`, rating.toString());
    }
  }, []);

  const handleRating = (rate: number) => {
    sessionStorage.setItem(`${criteria?.[0]?.id}`, rate.toString());
  };

  return (
    //Create a condional rendering
    <div className="flex flex-col gap-5">
      {criteria &&
        criteria.map((item) => (
          <FormWrapper
            title={item.name}
            description={item.description}
            key={item.id}
          >
            <div className="w-full flex flex-row">
              <Rating
                onClick={handleRating}
                SVGstyle={{ display: "inline" }}
                initialValue={rating}
                /* Available Props */
              />
            </div>
          </FormWrapper>
        ))}
    </div>
  );
};

export default RatingFormContent;
