export const dynamic = "force-static";

export default function BlogPage() {
  return (
    <main>
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-2xl w-full border rounded-2xl bg-black/80 p-8 sm:p-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Blogs</h1>
          <p className="mt-4 text-white/80 text-lg">
            Blog business logic will be replaced later in the migration. This page is a temporary placeholder so the route exists in the Next.js app router.
          </p>
        </div>
      </div>
    </main>
  );
}