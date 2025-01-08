import { Plus } from "lucide-react";
import Image from "next/image";

type GameCardProps = {
  id: number;
  imgSrc: string;
  alt: string;
  title: string;
  genres: string[];
  release_date: string;
};

export function GameCard({
  id,
  imgSrc,
  alt,
  title,
  genres,
  release_date,
}: GameCardProps) {
  return (
    <div className="relative h-fit overflow-hidden rounded-lg">
      <div className="flex flex-col gap-4 bg-black-2/10 p-4 text-white-1 backdrop-blur-3xl duration-200 sm:flex-row">
        <Image
          src={imgSrc}
          alt={alt}
          width={460}
          height={215}
          priority={id === 1}
          className="size-full sm:h-[6.25rem] sm:w-[13.372rem]"
        />

        <div className="space-y-2">
          <h2 className="line-clamp-2 font-bold">{title}</h2>

          <div className="space-y-1">
            <div className="flex">
              <p className="text-sm">{genres.join(", ")}</p>
            </div>

            <p className="text-sm">
              {new Date(release_date).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 hidden size-9 items-center justify-center rounded-full bg-accent-1 duration-200 hover:bg-accent-2 sm:flex">
          <Plus className="size-6" />
        </div>
      </div>

      <div className="absolute left-0 top-0 -z-10 h-[50%] w-full bg-black-2" />
    </div>
  );
}
