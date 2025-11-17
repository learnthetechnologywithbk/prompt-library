export type Prompt = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
  createdAt: string;
};

export type CreatePromptPayload = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  content: string;
};

