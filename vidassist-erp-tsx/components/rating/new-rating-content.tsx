"use client";

import { Rating } from "react-simple-star-rating";
import { Progress } from "../ui/progress";
import { useLayoutEffect, useState } from "react";

type Criteria =
  | {
      id: string;
      name: string;
      description: string;
      position: number;
    }[]
  | undefined;

const NewRatingContent = ({
  criteria,
  currentStepIndex,
  allSteps,
}: {
  criteria: Criteria;
  currentStepIndex: number;
  allSteps: number;
}) => {
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
    <>
      {criteria &&
        criteria.map((item) => (
          <div className="md:flex">
            <div className="p-8 w-full">
              <div className="uppercase tracking-wide text-sm text-indigo-500 ">
                Step {currentStepIndex + 1} of {allSteps}
              </div>
              <Progress className="h-1 w-full mt-2" value={33} />
              <h2 className="block mt-4 text-lg leading-tight">{item.name}</h2>
              <h1 className="block mt-2 text-m text-neutral-400 leading-tight">
                {item.description}
              </h1>
              <div className="mt-4">
                <Rating
                  onClick={handleRating}
                  SVGstyle={{ display: "inline" }}
                  initialValue={rating}
                  /* Available Props */
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default NewRatingContent;
