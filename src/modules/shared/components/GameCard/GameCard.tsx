import { Plus } from "lucide-react";
import Image from "next/image";

type GameCardProps = {
  imgSrc: string;
  alt: string;
  title: string;
  genres: string[];
  release_date: string;
};

export function GameCard({
  imgSrc,
  alt,
  title,
  genres,
  release_date,
}: GameCardProps) {
  return (
    <div className="relative h-fit w-fit overflow-hidden rounded-lg">
      <div className="flex w-fit flex-col gap-4 bg-black-2/10 p-4 text-white-1 backdrop-blur-3xl duration-200 sm:w-[31.5rem] sm:flex-row">
        <div>
          <Image src={imgSrc} alt={alt} width={213.95} height={100} />
        </div>

        <div className="space-y-2">
          <h2 className="font-bold">{title}</h2>

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
