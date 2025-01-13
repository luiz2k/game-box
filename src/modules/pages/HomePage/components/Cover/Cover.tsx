import Image from "next/image";

export function Cover() {
  return (
    <section className="relative overflow-hidden rounded-2xl">
      <Image src={"/cover.png"} alt="Capa" width={1024} height={699} />

      <div className="absolute left-[50%] top-5 w-full max-w-[25rem] -translate-x-[50%] space-y-2 text-center md:left-auto md:right-20 md:top-[9.375rem] md:translate-x-0 md:text-start">
        <div>
          <h1 className="text-5xl font-bold uppercase md:text-6xl">Game Box</h1>
          <p className="text-lg md:text-xl">
            Organize Seus Jogos, Do Seu Jeito! 🕹️
          </p>
        </div>

        <p className="text-sm md:text-base">
          Categorize à vontade! Monte caixas customizadas, organize por gênero,
          hype ou nostalgia. Você escolhe!
        </p>
      </div>
    </section>
  );
}
