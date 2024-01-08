"use client";

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaTrigger,
} from "@/components/credenza";
import { useMultiplestepForm } from "../rating-test/useMultiplestepForm";
import { Button } from "../ui/button";
import { useState } from "react";
import NewRatingContent from "./new-rating-content";

type RatingItems = {
  categoryId: string;
  created_at: string;
  createdBy: string;
  id: string;
  title: string;
  rating_criteria: {
    id: string;
    name: string;
    description: string;
    position: number;
  }[];
} | null;

export default function MainRating({
  items,
  isDisabled,
}: {
  items: RatingItems;
  isDisabled: boolean;
}) {
  const [rating, setRating] = useState(0);
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(items?.rating_criteria?.length ?? 0);

  const handleOnSubmit = () => {
    console.log("submit");
  };

  const filterArrayByPosition = (position: number) => {
    return items?.rating_criteria?.filter((item) => item.position === position);
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button variant="outline" disabled={isDisabled}>
          Bewerten
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="max-w-md mx-auto shadow-md overflow-hidden md:max-w-2xl  rounded-lg">
        <CredenzaBody className={`  w-full`}>
          <NewRatingContent
            criteria={filterArrayByPosition(currentStepIndex)}
            currentStepIndex={currentStepIndex}
            allSteps={steps}
            key={currentStepIndex}
          />
          <div className="mt-4 flex justify-between">
            <Button
              onClick={previousStep}
              disabled={isFirstStep}
              variant="outline"
            >
              Previous
            </Button>
            {isLastStep ? (
              <Button>Confirm</Button>
            ) : (
              <Button onClick={nextStep}>Next</Button>
            )}
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
