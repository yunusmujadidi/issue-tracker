import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { PatchIssueSchema } from "@/app/validationSchema";

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const validation = PatchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: body.assignedToUserId,
      },
    });
    if (!user) {
      return NextResponse.json({ error: "invalid user" }, { status: 400 });
    }
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "invalid issue" }, { status: 404 });
  }
  const updateIssue = await prisma.issue.update({
    where: {
      id: issue.id,
    },
    data: {
      title: body.title,
      description: body.description,
      assignedToUserId: body.assignedToUserId,
    },
  });
  return NextResponse.json(updateIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) {
    return NextResponse.json({ error: "invalid issue" }, { status: 404 });
  }
  await prisma.issue.delete({
    where: {
      id: issue.id,
    },
  });
  return NextResponse.json({ status: 200 });
}
