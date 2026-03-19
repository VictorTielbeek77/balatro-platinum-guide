import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const tips = await prisma.tip.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <header className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Balatro Platinum Guide
        </h1>
        <p className="mt-3 text-base text-gray-600">
          Guia com dicas para conquistar a platina de Balatro.
        </p>
      </header>

      {tips.length === 0 ? (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Nenhuma dica cadastrada</h2>
          <p className="mt-2 text-sm text-gray-600">
            O banco está conectado, mas ainda não existem dicas salvas.
          </p>
        </section>
      ) : (
        <section className="grid gap-4">
          {tips.map((tip) => (
            <Link
              key={tip.id}
              href={`/tips/${tip.slug}`}
              className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">{tip.title}</h2>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {tip.category.name}
                </span>
              </div>

              <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                {tip.content}
              </p>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}