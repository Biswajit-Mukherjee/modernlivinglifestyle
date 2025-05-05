/** This is a repository of server actions related to user */

"use server";

import {
  checkIfSubscriberExists,
  checkIfSubscriberIsSubscribed,
  checkIfSubscriberIsVerified,
  getSubscriberName,
} from "@/lib/queries";

export async function checkIfUserExists(email: string) {
  return checkIfSubscriberExists(email);
}

export async function checkIfUserIsVerified(id: string) {
  return checkIfSubscriberIsVerified(id);
}

export async function checkIfUserIsSubscribed(id: string) {
  return checkIfSubscriberIsSubscribed(id);
}

export async function getUserName(id: string) {
  return getSubscriberName(id);
}
