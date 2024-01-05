import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import { getRatingCriterias } from "./_actions";
import { RatingTable } from "./_components/rating-table";
import { MainRating } from "@/components/rating/main-rating";

const MyRatingList = async () => {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect("/auth");
  }
  const rating_criteria = (await getRatingCriterias()) || [];
  console.log("rating_criteria", rating_criteria);
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <RatingTable data={rating_criteria} />
      </div>
    </>
  );
};

export default MyRatingList;
