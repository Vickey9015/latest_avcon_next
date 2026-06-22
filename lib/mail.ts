import "server-only";
import nodemailer from "nodemailer";

type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST || "smtp.office365.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER || "solutions@avconexpo.com";
  const pass = process.env.SMTP_PASS || "174498241004oh";

  if (!user || !pass) {
    throw new Error("SMTP credentials are not configured.");
  }

  return {
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
  };
}

function getMailFrom() {
  return process.env.MAIL_FROM || process.env.SMTP_USER || "solutions@avconexpo.com";
}

function getMailTo() {
  if (process.env.MAIL_TEST_MODE === "true") {
    return process.env.MAIL_TEST_TO || "lucky.vickey126@gmail.com";
  }

  return process.env.MAIL_TO || "solutions@avconexpo.com";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fieldRow(label: string, value: string | null | undefined) {
  if (!value?.trim()) return "";
  return `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;width:180px;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`;
}

async function sendMail(options: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}) {
  const transporter = nodemailer.createTransport(getSmtpConfig());

  await transporter.sendMail({
    from: getMailFrom(),
    to: getMailTo(),
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments?.map((attachment) => ({
      filename: attachment.filename,
      content: attachment.content,
      contentType: attachment.contentType,
    })),
  });
}

export type ContactEmailPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  company?: string | null;
  country?: string | null;
  machinery?: string | null;
  expectedDelivery?: string | null;
  additionalMessage?: string | null;
  source: string;
};

export async function sendContactFormEmail(payload: ContactEmailPayload) {
  if (payload.source === "equipment-spares") {
    return sendEquipmentSparesQuoteEmail(payload);
  }

  const sourceLabel = "Contact Form";
  const subject = `[AVCONEXPO] New ${sourceLabel} enquiry from ${payload.name}`;

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;max-width:720px;">
      <h2 style="margin:0 0 16px;">New ${escapeHtml(sourceLabel)} Enquiry</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">
        ${fieldRow("Source", sourceLabel)}
        ${fieldRow("Name", payload.name)}
        ${fieldRow("Email", payload.email)}
        ${fieldRow("Phone", payload.phone)}
        ${fieldRow("Company", payload.company)}
        ${fieldRow("Country", payload.country)}
        ${fieldRow("Service", payload.service)}
        ${fieldRow("Message", payload.message)}
      </table>
    </div>
  `;

  const text = [
    `New ${sourceLabel} Enquiry`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    payload.company ? `Company: ${payload.company}` : "",
    payload.country ? `Country: ${payload.country}` : "",
    `Service: ${payload.service}`,
    `Message: ${payload.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  await sendMail({ subject, html, text, replyTo: payload.email });
}

export async function sendEquipmentSparesQuoteEmail(payload: ContactEmailPayload) {
  const subject = `[AVCONEXPO] Equipment & Spares Free Quote from ${payload.name}`;
  const additionalMessage =
    payload.additionalMessage?.trim() &&
    payload.additionalMessage.trim() !== payload.machinery?.trim()
      ? payload.additionalMessage.trim()
      : payload.message?.trim() !== payload.machinery?.trim()
        ? payload.message.trim()
        : "";

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;max-width:720px;">
      <h2 style="margin:0 0 8px;">Equipment &amp; Spares — Get a Free Quote</h2>
      <p style="margin:0 0 16px;color:#6b7280;font-size:14px;">Submitted from avconexpo.com/equipments-spares</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">
        ${fieldRow("Name", payload.name)}
        ${fieldRow("Email", payload.email)}
        ${fieldRow("Phone", payload.phone)}
        ${fieldRow("Company", payload.company)}
        ${fieldRow("Country", payload.country)}
        ${fieldRow("Machinery / Spare Part Required", payload.machinery)}
        ${fieldRow("Expected Delivery", payload.expectedDelivery)}
        ${fieldRow("Additional Message", additionalMessage)}
      </table>
    </div>
  `;

  const text = [
    "Equipment & Spares — Get a Free Quote",
    "Page: avconexpo.com/equipments-spares",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    payload.company ? `Company: ${payload.company}` : "",
    `Country: ${payload.country}`,
    `Machinery / Spare Part Required: ${payload.machinery}`,
    payload.expectedDelivery ? `Expected Delivery: ${payload.expectedDelivery}` : "",
    additionalMessage ? `Additional Message: ${additionalMessage}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  await sendMail({ subject, html, text, replyTo: payload.email });
}

export type CareerEmailPayload = {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  resumeName?: string | null;
  resumeData?: Buffer | null;
  resumeMimeType?: string | null;
};

export async function sendCareerApplicationEmail(payload: CareerEmailPayload) {
  const subject = `[AVCONEXPO] New career application: ${payload.fullName}`;

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;max-width:720px;">
      <h2 style="margin:0 0 16px;">New Career Application</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">
        ${fieldRow("Applicant Name", payload.fullName)}
        ${fieldRow("Email", payload.email)}
        ${fieldRow("Phone", payload.phone)}
        ${fieldRow("Position Applied", payload.position)}
        ${fieldRow("Resume", payload.resumeName || "Not uploaded")}
      </table>
    </div>
  `;

  const text = [
    "New Career Application",
    `Applicant Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Position Applied: ${payload.position}`,
    `Resume: ${payload.resumeName || "Not uploaded"}`,
  ].join("\n");

  const attachments: MailAttachment[] = [];
  if (payload.resumeData && payload.resumeName) {
    attachments.push({
      filename: payload.resumeName,
      content: payload.resumeData,
      contentType: payload.resumeMimeType || undefined,
    });
  }

  await sendMail({ subject, html, text, attachments });
}
