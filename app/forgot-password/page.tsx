import Link from "next/link";
import AuthWrapper from "@/components/auth/AuthWrapper";

export default function ForgotPasswordPage() {
  return (
    <AuthWrapper title="Reset password">
      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-sm mb-2 text-(--soft-text)">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl bg-(--input-bg) border border-(--input-border) px-4 py-2 outline-none transition text-sm"
          />
        </div>

        <button className="w-full bg-(--foreground) text-(--background) py-2 rounded-xl md:rounded-2xl lg:rounded-full font-semibold hover:opacity-90 transition mt-2">
          Send Reset Link
        </button>

        <p className="text-sm text-(--muted-text)">
          Remember your password?{" "}
          <Link href="/signin" className="text-(--foreground) hover:underline">
            Back to login →
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
}
