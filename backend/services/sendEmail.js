// services/sendEmail.js

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.warn("⚠️ RESEND_API_KEY is missing; emails will fail.");
}

async function sendEmail({ to, subject, html }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Weylor <hello@weylor.world>", // ✅ use your verified domain
      to,
      subject,
      html,
    }),
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json?.message || `Resend error: ${res.status}`);
  }

  console.log("✅ Email sent:", json);
  return json;
}

module.exports = { sendEmail };
