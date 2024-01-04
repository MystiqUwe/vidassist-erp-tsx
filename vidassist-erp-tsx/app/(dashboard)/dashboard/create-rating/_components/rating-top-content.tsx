"use client";

import { Button } from "@/components/ui/button";

const RatingTopContent = () => {
  const createRating = () => {
    console.log("create rating");
  };

  return (
    <div className="flex justify-end ">
      <Button onClick={createRating} variant="default">
        Create Rating
      </Button>
    </div>
  );
};

export default RatingTopContent;
