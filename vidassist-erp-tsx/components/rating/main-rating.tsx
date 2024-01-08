"use client";

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaTrigger,
} from "@/components/credenza";
import { useMultiplestepForm } from "../rating-test/useMultiplestepForm";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
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
  playbackId, //Needed for the sessionStorage
}: {
  items: RatingItems;
  isDisabled: boolean;
  playbackId: string;
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

  const [isFulfilled, setIsFulfilled] = useState(true);

  useEffect(() => {
    handleRating();
  }, [currentStepIndex]);

  const filterArrayByPosition = (position: number) => {
    return items?.rating_criteria?.filter((item) => item.position === position);
  };

  const isStepFulfilled = () => {
    const id = items?.rating_criteria?.[currentStepIndex]?.id;
    if (id) {
      const item = sessionStorage.getItem(`${id}-${playbackId}`);
      if (item !== null && parseInt(item) > 0) {
        return false;
      }
    }
    return true;
  };

  const handleRating = () => {
    setIsFulfilled(isStepFulfilled());
  };

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Button variant="outline" disabled={isDisabled}>
          Bewerten
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="max-w-md mx-auto shadow-md overflow-hidden md:max-w-2xl  rounded-lg">
        <CredenzaBody className={`w-full`}>
          <NewRatingContent
            criteria={filterArrayByPosition(currentStepIndex)}
            currentStepIndex={currentStepIndex}
            allSteps={steps}
            key={currentStepIndex}
            onNewRating={handleRating}
            playbackId={playbackId}
          />
          <div className="mt-4 flex justify-between mb-2">
            <Button
              onClick={previousStep}
              disabled={isFirstStep}
              variant="outline"
            >
              Previous
            </Button>
            {isLastStep ? (
              <Button disabled={isFulfilled}>Confirm</Button>
            ) : (
              <Button disabled={isFulfilled} onClick={nextStep}>
                Next
              </Button>
            )}
          </div>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
