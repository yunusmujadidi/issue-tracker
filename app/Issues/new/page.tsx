import React from "react";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Heading } from "@radix-ui/themes";

const IssueForm = dynamic(async () => import("@/app/components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return (
    <>
      <Heading>New Issue</Heading>
      <IssueForm />
    </>
  );
};

export default NewIssuePage;
