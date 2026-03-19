import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TipDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const tip = await prisma.tip.findUnique({
    where: {
      slug,
    },
    include: {
      category: true,
    },
  });

  if (!tip) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-10">
      <Link
        href="/"
        className="inline-block rounded-lg border border-gray-200 px-4 py-2 text-sm transition hover:bg-gray-50"
      >
        ← Voltar para a home
      </Link>

      <article className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-gray-500">{tip.category.name}</p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">{tip.title}</h1>

        <div className="mt-6 space-y-4 text-base leading-7 text-gray-700">
          {tip.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}