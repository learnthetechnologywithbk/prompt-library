"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { usePromptStore } from "@/context/prompt-context";

const categories = [
  "Email",
  "Education",
  "Marketing",
  "Productivity",
  "Support",
  "Writing",
];

const NewPromptPage = () => {
  const router = useRouter();
  const { addPrompt } = usePromptStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(() => {
    return title.trim() && content.trim() && description.trim();
  }, [content, description, title]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    addPrompt({
      title: title.trim(),
      description: description.trim(),
      category,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      content: content.trim(),
    });

    router.push("/");
    router.refresh();
  };

  return (
    <section className="space-y-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-slate-900/40 backdrop-blur">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
          New Prompt
        </p>
        <h1 className="text-3xl font-semibold text-white">Add a prompt</h1>
        <p className="text-white/70">
          Describe when to use it, choose a category, and add helpful tags. The
          more context you add, the easier it’ll be to reuse later.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-white/80">
              Title<span className="text-teal-200">*</span>
            </span>
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Rewrite a friendly welcome email"
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-teal-300 focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-white/80">
              Category<span className="text-teal-200">*</span>
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white focus:border-teal-300 focus:outline-none"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-white/80">
            Short description<span className="text-teal-200">*</span>
          </span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="When someone joins your program, send this friendly welcome email with a bonus resource."
            className="min-h-28 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-teal-300 focus:outline-none"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-white/80">Tags</span>
          <input
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="friendly, onboarding, rewrite"
            className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-teal-300 focus:outline-none"
          />
          <span className="text-xs text-white/40">
            Separate tags with commas. Use them to describe tone or workflow.
          </span>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-white/80">
            Prompt text<span className="text-teal-200">*</span>
          </span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write the full prompt you want to reuse..."
            className="min-h-48 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-teal-300 focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-900 transition enabled:hover:bg-teal-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/50"
          >
            {isSubmitting ? "Saving…" : "Save prompt"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/50 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewPromptPage;

