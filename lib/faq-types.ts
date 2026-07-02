export type FaqItem = {
  question: string;
  answer: string;
};

export function parseFaqItems(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }
      const question = "question" in item && typeof item.question === "string" ? item.question.trim() : "";
      const answer = "answer" in item && typeof item.answer === "string" ? item.answer.trim() : "";
      if (!question || !answer) {
        return null;
      }
      return { question, answer };
    })
    .filter((item): item is FaqItem => item !== null);
}

export function serializeFaqItems(items: FaqItem[]): string {
  return JSON.stringify(parseFaqItems(items));
}

export function deserializeFaqItems(value: string | null | undefined): FaqItem[] {
  if (!value?.trim()) {
    return [];
  }

  try {
    return parseFaqItems(JSON.parse(value));
  } catch {
    return [];
  }
}
