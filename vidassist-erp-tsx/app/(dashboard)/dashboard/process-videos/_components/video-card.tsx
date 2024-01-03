import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
}

export const VideoCard = ({ id, title, description }: VideoCardProps) => {
  return (
    <Link href={`/dashboard/process-videos/${id}`}>
      {/*`/courses/${id}`*/}
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
          {"Firma"}
        </div>
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={
              "https://www.techsmith.com/blog/wp-content/uploads/2021/02/TSC-thumbnail-example-1024x576.png"
            }
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{"Kategorie"}</p>
        </div>
      </div>
    </Link>
  );
};
