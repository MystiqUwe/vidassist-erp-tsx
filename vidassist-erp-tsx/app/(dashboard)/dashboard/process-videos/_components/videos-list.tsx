import { VideoCard } from "./video-card";

type IVideos = {
  id: string;
  title: string;
  description: string;
};

interface VideosListProps {
  items: IVideos[];
}

export const VideosList = ({ items }: VideosListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <VideoCard
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            // category={item?.category!}
            // producer={item?.producer!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No process videos found
        </div>
      )}
    </div>
  );
};
