"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  startTransition,
} from "react";

import type { CreatePromptPayload, Prompt } from "@/types/prompt";

const STORAGE_KEY = "prompt-library:prompts";

const samplePrompts: Prompt[] = [
  {
    id: "welcome-email",
    title: "Warm Welcome Email",
    description:
      "Send a thoughtful welcome email whenever someone joins your community or newsletter.",
    category: "Email",
    tags: ["friendly", "onboarding", "personal"],
    content: `Subject: Welcome aboard, {{first_name}}!

Hi {{first_name}},

I'm thrilled that you've joined us! Here's what to expect over the next week:
1. A quick-start guide tomorrow
2. A bonus resource on Thursday
3. A live Q&A invite on Friday

Reply and say hi—I'd love to hear what you're hoping to create.

Talk soon,
{{your_name}}`,
    createdAt: new Date("2024-09-10").toISOString(),
  },
  {
    id: "lesson-plan",
    title: "30-Minute Lesson Plan",
    description:
      "Rapidly outline a 30-minute lesson plan with objectives, activities, and assessments.",
    category: "Education",
    tags: ["lesson-plan", "structure", "teaching"],
    content: `Create a 30-minute lesson plan for {{topic}} aimed at {{audience}}.

Include:
- Clear learning objectives (3 max)
- A hook/introduction (<5 minutes)
- 2-3 learning activities with timing
- Formative assessment approach
- Homework or follow-up suggestion`,
    createdAt: new Date("2024-08-02").toISOString(),
  },
];

type PromptContextValue = {
  prompts: Prompt[];
  addPrompt: (prompt: CreatePromptPayload) => Prompt;
  getPrompt: (id: string) => Prompt | undefined;
  deletePrompt: (id: string) => void;
  isHydrated: boolean;
};

const PromptContext = createContext<PromptContextValue | undefined>(undefined);

const persistPrompts = (prompts: Prompt[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
};

const loadPrompts = () => {
  if (typeof window === "undefined") {
    return samplePrompts;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    persistPrompts(samplePrompts);
    return samplePrompts;
  }

  try {
    const parsed: Prompt[] = JSON.parse(stored);
    return parsed;
  } catch {
    persistPrompts(samplePrompts);
    return samplePrompts;
  }
};

export const PromptProvider = ({ children }: { children: ReactNode }) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Sync with localStorage on mount
  useEffect(() => {
    const loaded = loadPrompts();
    startTransition(() => {
      setPrompts(loaded);
      setIsHydrated(true);
    });
  }, []);

  const addPrompt = useCallback(
    (payload: CreatePromptPayload) => {
      const nextPrompt: Prompt = {
        ...payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };

      setPrompts((prev) => {
        const nextList = [nextPrompt, ...prev];
        persistPrompts(nextList);
        return nextList;
      });

      return nextPrompt;
    },
    [setPrompts],
  );

  const getPrompt = useCallback(
    (id: string) => prompts.find((prompt) => prompt.id === id),
    [prompts],
  );

  const deletePrompt = useCallback(
    (id: string) => {
      setPrompts((prev) => {
        const nextList = prev.filter((prompt) => prompt.id !== id);
        persistPrompts(nextList);
        return nextList;
      });
    },
    [setPrompts],
  );

  const value = useMemo(
    () => ({ prompts, addPrompt, getPrompt, deletePrompt, isHydrated }),
    [addPrompt, getPrompt, deletePrompt, prompts, isHydrated],
  );

  return (
    <PromptContext.Provider value={value}>{children}</PromptContext.Provider>
  );
};

export const usePromptStore = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error("usePromptStore must be used within a PromptProvider");
  }

  return context;
};

