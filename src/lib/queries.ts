/** Prisma queries */

import { Subscriber } from "@prisma/client";
import prisma from "./prisma";

/** Check if subscriber exists */
export async function checkIfSubscriberExists(
  email: string
): Promise<string | null> {
  const res = await prisma.subscriber.findUnique({
    where: { email },
  });

  return res?.id ?? null;
}

/** Check if subscriber is verified */
export async function checkIfSubscriberIsVerified(
  id: string
): Promise<string | null> {
  const res = await prisma.subscriber.findUnique({
    where: { id, verified: true },
  });

  return res?.id ?? null;
}

/** Check if subscriber is subscribed */
export async function checkIfSubscriberIsSubscribed(
  id: string
): Promise<string | null> {
  const res = await prisma.subscriber.findUnique({
    where: { id, subscribed: true },
  });

  return res?.id ?? null;
}

/** Create subscriber */
export async function createSubscriber(
  email: string,
  token: string
): Promise<Subscriber | null> {
  return prisma.subscriber.create({
    data: { email, token },
  });
}

/** Get subscriber by id */
export async function getSubscriberById(id: string): Promise<string | null> {
  const user = await prisma.subscriber.findUnique({
    where: { id },
  });

  return user?.id ?? null;
}

/** Get subscriber by token */
export async function getSubscriberByToken(
  token: string
): Promise<string | null> {
  const user = await prisma.subscriber.findUnique({
    where: { token },
  });

  return user?.id ?? null;
}

/** Get subscriber by email */
export async function getSubscriberByEmail(
  email: string
): Promise<Subscriber | null> {
  return await prisma.subscriber.findUnique({
    where: { email },
  });
}

/** Get subscriber firstname and lastname */
export async function getSubscriberName(
  id: string
): Promise<Subscriber | null> {
  const user = await prisma.subscriber.findUnique({
    where: { id },
  });

  return user;
}

/** Update subscriber full name */
export async function updateSubscriberFullName(
  id: string,
  firstName: string,
  lastName: string
): Promise<void> {
  await prisma.subscriber.update({
    where: { id },
    data: { firstName, lastName },
  });
}

/** Update subscriber to verified */
export async function updateSubscriberToVerified(id: string): Promise<void> {
  await prisma.subscriber.update({
    where: { id },
    data: { verified: true, token: null },
  });
}

/** Update subscriber to subscribed */
export async function updateSubscriberToSubscribed(id: string): Promise<void> {
  await prisma.subscriber.update({
    where: { id },
    data: { subscribed: true },
  });
}
