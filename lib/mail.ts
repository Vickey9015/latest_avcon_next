import "server-only";

type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

type GraphTokenCache = {
  token: string;
  expiresAt: number;
};

let graphTokenCache: GraphTokenCache | null = null;

function getGraphConfig() {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const mailUser = process.env.GRAPH_MAIL_USER || process.env.MAIL_FROM || "solutions@avconexpo.com";

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Microsoft Graph credentials are not configured.");
  }

  return { tenantId, clientId, clientSecret, mailUser };
}

function getMailTo() {
  return process.env.MAIL_TO || "solutions@avconexpo.com";
}

async function getGraphAccessToken(): Promise<string> {
  const now = Date.now();
  if (graphTokenCache && graphTokenCache.expiresAt > now + 60_000) {
    return graphTokenCache.token;
  }

  const { tenantId, clientId, clientSecret } = getGraphConfig();

  const response = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
  });

  const data = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || "Failed to obtain Microsoft Graph access token.");
  }

  graphTokenCache = {
    token: data.access_token,
    expiresAt: now + (data.expires_in ?? 3600) * 1000,
  };

  return graphTokenCache.token;
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
  const { mailUser } = getGraphConfig();
  const token = await getGraphAccessToken();

  const message: Record<string, unknown> = {
    subject: options.subject,
    body: {
      contentType: "HTML",
      content: options.html,
    },
    toRecipients: [{ emailAddress: { address: getMailTo() } }],
  };

  if (options.replyTo) {
    message.replyTo = [{ emailAddress: { address: options.replyTo } }];
  }

  if (options.attachments?.length) {
    message.attachments = options.attachments.map((attachment) => ({
      "@odata.type": "#microsoft.graph.fileAttachment",
      name: attachment.filename,
      contentType: attachment.contentType || "application/octet-stream",
      contentBytes: attachment.content.toString("base64"),
    }));
  }

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(mailUser)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        saveToSentItems: true,
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Graph sendMail failed (${response.status}): ${errorBody}`);
  }
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

  await sendMail({ subject, html, text, replyTo: payload.email, attachments });
}
