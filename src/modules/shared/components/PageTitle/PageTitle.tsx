type PageTitleProps = {
  title: string;
  desc: string | React.ReactNode;
};

export function PageTitle({ title, desc }: PageTitleProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-center text-4xl font-bold">{title}</h1>
      <p className="text-center text-white-1/50">{desc}</p>
    </div>
  );
}
