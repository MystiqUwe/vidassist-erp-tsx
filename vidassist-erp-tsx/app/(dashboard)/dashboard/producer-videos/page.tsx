import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import { ProducerVideoTable } from "./_components/video-table";
import { getProducerCourses } from "./_actions";

const ProducerVideoList = async () => {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect("/auth");
  }
  const courses = (await getProducerCourses(userSession.session.user.id)) || [];
  /*const courses = [
    {
      categoryID: "1",
      created_at: "2021-08-04T16:06:26.000Z",
      description: "test",
      id: "1",
      title: "test",
      userId: "1",
    },
  ];*/
  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <ProducerVideoTable data={courses} />
    </div>
  );
};

export default ProducerVideoList;
