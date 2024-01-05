"use client";

import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/credenza";
import CreateSteps from "../rating-test/create-steps";
import { useMultiplestepForm } from "../rating-test/useMultiplestepForm";
import { Button } from "../ui/button";
import RatingFormContent from "../rating-test/rating-form-content";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";

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

export default function MainRating({ items }: { items: RatingItems }) {
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
  } = useMultiplestepForm(4);

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
        <button>Open modal</button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Credenza</CredenzaTitle>
          <CredenzaDescription>
            A responsive modal component for shadcn/ui.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <div
            className={`flex justify-between h-[500px] w-11/12 max-w-4xl relative m-1 rounded-lg border border-neutral-700 bg-[#262626] p-4`}
          >
            <CreateSteps
              ratingCriteria={items?.rating_criteria}
              currentStepIndex={currentStepIndex}
              goTo={goTo}
            />
            <main className={"w-full md:mt-5 md:w-[65%]"}>
              <form
                onSubmit={handleOnSubmit}
                className="w-full flex flex-col justify-between h-full"
              >
                {
                  <RatingFormContent
                    criteria={filterArrayByPosition(currentStepIndex)}
                  />
                }

                <div className="w-full items-center flex justify-between">
                  <div className="">
                    <Button
                      onClick={previousStep}
                      type="button"
                      variant="ghost"
                      className={`${
                        isFirstStep
                          ? "invisible"
                          : "visible p-0 text-neutral-200 hover:text-white"
                      }`}
                    >
                      Go Back
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                      <Button
                        type="submit"
                        className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white"
                      >
                        {isLastStep ? "Confirm" : "Next Step"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </main>
          </div>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <button>Close</button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
