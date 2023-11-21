import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(3, "Title is required.").max(100),
  description: z.string().min(1, "Description is required."),
});
