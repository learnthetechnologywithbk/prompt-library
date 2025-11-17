"use client";

import { PromptProvider } from "@/context/prompt-context";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <PromptProvider>{children}</PromptProvider>;
};

export default Providers;

