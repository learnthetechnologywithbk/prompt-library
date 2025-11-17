"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PromptCard } from "@/components/prompt-card";
import { usePromptStore } from "@/context/prompt-context";
import type { Prompt } from "@/types/prompt";

const categories = [
  "All",
  "Email",
  "Education",
  "Marketing",
  "Productivity",
  "Support",
  "Writing",
];

type SortOption = "recent" | "title";

export default function Home() {
  const { prompts, isHydrated } = usePromptStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const filteredAndSortedPrompts = useMemo(() => {
    let filtered: Prompt[] = prompts;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = prompts.filter((prompt) => prompt.category === selectedCategory);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return sorted;
  }, [prompts, selectedCategory, sortBy]);

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <div className="space-y-10">
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
            Prompt Library
          </p>
          <h1 className="text-4xl font-semibold text-white">
            Save, organize, and reuse your best prompts.
          </h1>
        </section>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-lg font-semibold text-white/80">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
          Prompt Library
        </p>
        <h1 className="text-4xl font-semibold text-white">
          Save, organize, and reuse your best prompts.
        </h1>
        <p className="text-white/70">
          Capture reusable prompts with categories, tags, and rich descriptions.
          Everything stays in your browser so you can experiment freely.
        </p>
      </section>

      {prompts.length > 0 ? (
        <>
          <section className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="category-filter"
                className="text-sm font-medium text-white/80"
              >
                Category:
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white focus:border-teal-300 focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort-by"
                className="text-sm font-medium text-white/80"
              >
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white focus:border-teal-300 focus:outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="title">Title</option>
              </select>
            </div>
          </section>

          {filteredAndSortedPrompts.length > 0 ? (
            <section className="grid gap-6 md:grid-cols-2">
              {filteredAndSortedPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </section>
          ) : (
            <section className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-12 text-center">
              <p className="text-lg font-semibold text-white">
                No prompts found in this category.
              </p>
              <p className="mt-2 text-sm text-white/70">
                Try selecting a different category or add a new prompt.
              </p>
            </section>
          )}
        </>
      ) : (
        <section className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-12 text-center">
          <p className="text-lg font-semibold text-white">
            No prompts yet—let’s add your first one.
          </p>
          <p className="mt-2 text-sm text-white/70">
            Save a prompt with a title, category, tags, and when to use it.
          </p>
          <div className="mt-6">
            <Link
              href="/prompts/new"
              className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-teal-300"
            >
              Add a prompt
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
