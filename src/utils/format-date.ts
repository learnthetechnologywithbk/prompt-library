export const formatPromptDate = (isoDate: string) => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
};

