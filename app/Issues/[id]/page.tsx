import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import prisma from "@/prisma/client";
import { Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }}>
      <IssueDetails issue={issue} />
      <EditIssueButton issueId={issue.id} />
    </Grid>
  );
};

export default IssueDetailPage;
