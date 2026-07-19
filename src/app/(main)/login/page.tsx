import { Login } from "@/components/auth/login"

export default function LoginPage() {
  return (
    <main>
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-xl w-full border rounded-2xl bg-black/80 p-8 sm:p-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold">Login</h1>
          <Login />
        </div>
      </div>
    </main>
  );
}