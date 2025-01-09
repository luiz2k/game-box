import { LucideIcon } from "lucide-react";
import Image from "next/image";

type GameCardProps = {
  id: number;
  imgSrc: string;
  alt: string;
  title: string;
  genres: string[];
  release_date: string;

  action?: () => void;
  actionIcon?: LucideIcon;
};

export function GameCard({
  id,
  imgSrc,
  alt,
  title,
  genres,
  release_date,

  action,
  actionIcon: Icon,
}: GameCardProps) {
  // Faz a formatação da data para pt-BR
  release_date = new Date(release_date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl bg-black-2 duration-200 hover:bg-black-3">
      <Image
        src={imgSrc}
        width={330.67}
        height={154.55}
        alt={alt}
        quality={100}
        priority={id === 1}
        className="w-full overflow-hidden rounded-2xl"
      />

      <div className="grid grid-cols-[1fr,auto] gap-4 p-4">
        <div className="space-y-4">
          <h2 className="line-clamp-1 font-bold">{title}</h2>

          <div className="space-y-1 text-sm">
            <p>{genres.join(", ")}</p>
            <p>{release_date}</p>
          </div>
        </div>

        {action && Icon && (
          <div className="flex items-end">
            <button
              type="button"
              className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-accent-1 duration-200 hover:bg-accent-2"
              onClick={action}
            >
              <Icon className="size-6 text-white-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
