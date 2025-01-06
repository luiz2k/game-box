type ListCardProps = {
  title: string;
};

export function ListCard({ title }: ListCardProps) {
  return (
    <div className="group w-56 space-y-2 text-white-1">
      <div className="group-[&:hover]:bg-black-3 flex h-[18.75rem] items-center justify-center rounded-2xl bg-black-2 text-6xl duration-200">
        {title[0].toUpperCase()}
      </div>

      <h2 className="text-center">{title}</h2>
    </div>
  );
}
