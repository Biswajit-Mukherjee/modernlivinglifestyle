import md from "maskdata";

export const emailMask2Options = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 2, // Set this to 2 to show the first three characters
  unmaskedEndCharactersAfterAt: 257, // Enter a large number which is always more than the characters after @
  maskAtTheRate: false, // Do not mask @ symbol
};

export const maskEmailAddress = md.maskEmail2;
