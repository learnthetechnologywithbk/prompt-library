"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="border-b border-white/5 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white"
        >
          Prompt Library
        </Link>
        <div className="flex flex-wrap gap-3 text-sm font-medium">
          {!isHomePage && (
            <Link
              href="/"
              className="rounded-full border border-white/20 px-4 py-2 text-white/80 transition hover:border-white/50 hover:text-white"
            >
              Browse prompts
            </Link>
          )}
          <Link
            href="/prompts/new"
            className="rounded-full bg-teal-400 px-4 py-2 text-slate-900 transition hover:bg-teal-300"
          >
            Add prompt
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

