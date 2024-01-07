import { getProcessVideos } from "./_actions/index.";
import { VideosList } from "./_components/videos-list";

const ProccesVideos = async () => {
  /*const testItems = [
    {
      category: "Tutorial",
      title: "How to make a video",
      id: "id",
      producer: "FIRMA",
      imageUrl:
        "https://www.techsmith.com/blog/wp-content/uploads/2021/02/TSC-thumbnail-example-1024x576.png",
    },
    {
      category: "category",
      title: "title",
      id: "id1",
      producer: "FIRMA",
      imageUrl:
        "https://www.techsmith.com/blog/wp-content/uploads/2021/02/TSC-thumbnail-example-1024x576.png",
    },
    {
      category: "category",
      title: "title",
      id: "id2",
      producer: "FIRMA",
      imageUrl:
        "https://www.techsmith.com/blog/wp-content/uploads/2021/02/TSC-thumbnail-example-1024x576.png",
    },
    {
      category: "category",
      title: "title",
      id: "id3",
      producer: "FIRMA",
      imageUrl:
        "https://www.techsmith.com/blog/wp-content/uploads/2021/02/TSC-thumbnail-example-1024x576.png",
    },
  ];*/

  const items = await getProcessVideos();

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
      <VideosList items={items} />
    </div>
  );
};

export default ProccesVideos;
