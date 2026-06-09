import { ReactNode } from "react";

type AuthWrapperProps = {
  title: string;
  children: ReactNode;
};

export default function AuthWrapper({ title, children }: AuthWrapperProps) {
  return (
    <main className="min-h-[calc(100vh-65px)] py-10 bg-(--background) text-(--foreground) flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-(--secondary) p-8 rounded-3xl border border-(--border-color)">
        <h1 className="text-3xl font-bold mb-8 text-center">{title}</h1>

        {children}
      </div>
    </main>
  );
}
