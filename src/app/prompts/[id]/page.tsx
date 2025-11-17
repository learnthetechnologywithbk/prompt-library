import PromptDetailView from "@/components/prompt-detail-view";

const PromptDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <PromptDetailView id={id} />;
};

export default PromptDetailPage;

