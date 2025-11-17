import Link from "next/link";

import type { Prompt } from "@/types/prompt";
import { formatPromptDate } from "@/utils/format-date";

type PromptCardProps = {
  prompt: Prompt;
};

const badgeStyles =
  "rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/90";

export const PromptCard = ({ prompt }: PromptCardProps) => {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm shadow-slate-900/40 backdrop-blur transition hover:border-white/30 hover:bg-white/10">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/60">
          <span>{prompt.category}</span>
          <span className="text-white/30">•</span>
          <span>{formatPromptDate(prompt.createdAt)}</span>
        </div>
        <h2 className="text-xl font-semibold text-white">{prompt.title}</h2>
        <p className="text-sm text-white/70">{prompt.description}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {prompt.tags.map((tag) => (
          <span key={tag} className={badgeStyles}>
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6">
        <Link
          href={`/prompts/${prompt.id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-200 transition hover:text-white"
        >
          View prompt
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
};

