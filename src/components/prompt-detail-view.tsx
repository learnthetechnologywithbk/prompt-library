"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { usePromptStore } from "@/context/prompt-context";
import { formatPromptDate } from "@/utils/format-date";

const badgeStyles =
  "rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/90";

const PromptDetailView = ({ id }: { id: string }) => {
  const router = useRouter();
  const { getPrompt, deletePrompt, isHydrated } = usePromptStore();
  
  // Wait for hydration before trying to access prompts
  if (!isHydrated) {
    return (
      <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-lg font-semibold text-white/80">Loading...</p>
      </div>
    );
  }

  const prompt = getPrompt(id);

  if (!prompt) {
    return (
      <div className="space-y-6 rounded-2xl border border-red-400/30 bg-red-500/5 p-10 text-center">
        <p className="text-lg font-semibold text-red-100">
          We couldn’t find that prompt.
        </p>
        <p className="text-sm text-red-100/70">
          It may have been deleted or never saved on this device.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40"
          >
            Go back
          </button>
          <Link
            href="/prompts/new"
            className="rounded-full bg-teal-400/90 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-teal-300"
          >
            Create a prompt
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-slate-900/40 backdrop-blur">
      <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
        <span>{prompt.category}</span>
        <span className="text-white/30">•</span>
        <span>{formatPromptDate(prompt.createdAt)}</span>
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">{prompt.title}</h1>
        <p className="text-base text-white/70">{prompt.description}</p>
      </div>
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50">
          Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag) => (
            <span key={tag} className={badgeStyles}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50">
          Prompt Text
        </h2>
        <pre className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm leading-relaxed text-slate-100">
          {prompt.content}
        </pre>
      </div>
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => router.back()}
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40"
        >
          Back
        </button>
        <button
          onClick={async () => {
            try {
              await navigator?.clipboard?.writeText(prompt.content);
            } catch {
              // ignore clipboard failures
            }
          }}
          className="rounded-full bg-teal-400/90 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-teal-300"
        >
          Copy prompt
        </button>
        <button
          onClick={() => {
            deletePrompt(prompt.id);
            router.push("/");
          }}
          className="rounded-full border border-red-400/50 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-200 transition hover:border-red-400/80 hover:bg-red-500/20"
        >
          Delete Prompt
        </button>
      </div>
    </article>
  );
};

export default PromptDetailView;

