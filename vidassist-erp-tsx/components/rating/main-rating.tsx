"use client";

import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaTrigger,
} from "@/components/credenza";
import { useMultiplestepForm } from "../rating-test/useMultiplestepForm";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import NewRatingContent from "./new-rating-content";
import { createRatings } from "./_actions";
import { readUserSession } from "@/lib/actions";
import { toast } from "../ui/use-toast";

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
  courseId, //Need to create the ratings
}: {
  items: RatingItems;
  isDisabled: boolean;
  playbackId: string;
  courseId: string;
}) {
  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
    resetCurrentStepIndex,
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

  const createValues = async () => {
    const values = Object.values(sessionStorage);
    const keys = Object.keys(sessionStorage);
    const { data: userSession } = await readUserSession();
    const ratingCriteria = keys.map((key, index) => {
      return {
        courseId: courseId,
        rating_value: parseInt(values[index]),
        comment: "",
        userId: userSession.session?.user.id || "",
      };
    });
    return ratingCriteria;
  };

  const onConfirm = useCallback(async () => {
    const values = await createValues();
    const { ratings, error } = await createRatings(values);
    if (!error) {
      //Clear the sessionStorage for the current video
      Object.keys(sessionStorage).forEach((key) => {
        if (key.includes(playbackId)) {
          sessionStorage.removeItem(key);
        }
      });
      resetCurrentStepIndex();
      toast({
        variant: "default",
        title: "Success",
        description: "Ratings created!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not create ratings.",
      });
      console.log("[create-ratings] error: ", error);
    }
  }, []);

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
              <Button onClick={onConfirm} disabled={isFulfilled}>
                Confirm
              </Button>
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
