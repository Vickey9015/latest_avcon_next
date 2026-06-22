"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "jodit/es2021/jodit.min.css";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function plainTextToHtml(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (/<[a-z][\s\S]*>/i.test(trimmed)) return trimmed;

  return trimmed
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your blog content here...",
}: RichTextEditorProps) {
  const config = useMemo(
    () => ({
      readonly: false,
      height: 420,
      placeholder,
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_as_html" as const,
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "eraser",
        "|",
        "superscript",
        "subscript",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "paragraph",
        "brush",
        "lineHeight",
        "|",
        "align",
        "outdent",
        "indent",
        "|",
        "link",
        "image",
        "video",
        "table",
        "file",
        "hr",
        "symbol",
        "copyformat",
        "|",
        "undo",
        "redo",
        "|",
        "selectall",
        "find",
        "spellcheck",
        "|",
        "fullsize",
        "preview",
        "print",
      ],
      controls: {
        font: {
          list: {
            "": "Default",
            "Arial, Helvetica, sans-serif": "Arial",
            "Georgia, serif": "Georgia",
            "'Times New Roman', Times, serif": "Times New Roman",
            "'Courier New', Courier, monospace": "Courier New",
            "Verdana, Geneva, sans-serif": "Verdana",
            "Tahoma, Geneva, sans-serif": "Tahoma",
            "'Trebuchet MS', Helvetica, sans-serif": "Trebuchet MS",
            "'Palatino Linotype', 'Book Antiqua', Palatino, serif": "Palatino",
            "Impact, Charcoal, sans-serif": "Impact",
            "Poppins, sans-serif": "Poppins",
          },
        },
        paragraph: {
          list: {
            p: "Paragraph",
            h1: "Heading 1",
            h2: "Heading 2",
            h3: "Heading 3",
            h4: "Heading 4",
            blockquote: "Quote",
            pre: "Code block",
          },
        },
      },
      uploader: {
        url: "/api/admin/upload",
        format: "json",
        method: "POST",
        filesVariableName: () => "file",
        prepareData(formData: FormData) {
          const file = formData.get("files[0]");
          if (file instanceof File) {
            formData.delete("files[0]");
            formData.append("file", file);
          }
          formData.append("folder", "blogs");
          return formData;
        },
        isSuccess(response: { success?: boolean; url?: string }) {
          return Boolean(response?.success && response?.url);
        },
        getMessage(response: { error?: string }) {
          return typeof response?.error === "string" ? response.error : "";
        },
        process(response: { url?: string; error?: string }) {
          const url = typeof response?.url === "string" ? response.url : "";
          return {
            files: url ? [url] : [],
            path: url,
            baseurl: "",
            error: url ? 0 : 1,
            msg: typeof response?.error === "string" ? response.error : "Upload failed.",
          };
        },
      },
      image: {
        openOnDblClick: true,
        editSrc: true,
      },
      link: {
        openInNewTabCheckbox: true,
        noFollowCheckbox: true,
      },
    }),
    [placeholder],
  );

  const editorConfig = config as Record<string, unknown>;

  return (
    <div className="rich-text-editor-jodit overflow-hidden rounded-lg border border-gray-300 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500">
      <JoditEditor
        value={plainTextToHtml(value)}
        config={editorConfig}
        onBlur={(content) => onChange(content)}
      />
    </div>
  );
}
