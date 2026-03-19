import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold">Dica não encontrada</h1>
      <p className="mt-3 text-gray-600">
        A página que você tentou acessar não existe no momento.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-xl border border-gray-200 px-5 py-3 transition hover:bg-gray-50"
      >
        Voltar para a página inicial
      </Link>
    </main>
  );
}