"use client";

import type { FaqItem } from "@/lib/faq-types";

type FaqEditorProps = {
  value: FaqItem[];
  onChange: (items: FaqItem[]) => void;
};

const emptyFaq = (): FaqItem => ({ question: "", answer: "" });

export default function FaqEditor({ value, onChange }: FaqEditorProps) {
  const items = value.length > 0 ? value : [emptyFaq()];

  function updateItem(index: number, field: keyof FaqItem, fieldValue: string) {
    const next = items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [field]: fieldValue } : item,
    );
    onChange(next);
  }

  function addItem() {
    onChange([...items, emptyFaq()]);
  }

  function removeItem(index: number) {
    const next = items.filter((_, itemIndex) => itemIndex !== index);
    onChange(next.length > 0 ? next : [emptyFaq()]);
  }

  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-gray-800">FAQs</h4>
          <p className="text-xs text-gray-500">Add questions and answers shown on the blog post page.</p>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-700"
        >
          Add FAQ
        </button>
      </div>

      {items.map((item, index) => (
        <div key={index} className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wide text-gray-500">FAQ {index + 1}</span>
            {items.length > 1 ? (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-xs font-semibold text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            ) : null}
          </div>
          <label className="mb-3 block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Question</span>
            <input
              type="text"
              value={item.question}
              onChange={(event) => updateItem(index, "question", event.target.value)}
              placeholder="Enter a frequently asked question"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Answer</span>
            <textarea
              rows={3}
              value={item.answer}
              onChange={(event) => updateItem(index, "answer", event.target.value)}
              placeholder="Enter the answer"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
            />
          </label>
        </div>
      ))}
    </div>
  );
}
