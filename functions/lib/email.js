// Sends transactional email via Resend (https://resend.com). Requires the
// RESEND_API_KEY secret to be set on the Worker -- see docs/cloudflare-setup.md.
// Until a custom sending domain is verified in Resend, the shared
// onboarding@resend.dev sender can only deliver to the Resend account's own
// email address, not arbitrary signups -- fine for testing, not for real users.

export async function sendVerificationEmail(env, to, code) {
  if (!env.RESEND_API_KEY) {
    return { sent: false, reason: "RESEND_API_KEY not configured" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Saabi by LUMA <onboarding@resend.dev>",
      to: [to],
      subject: "Your Saabi verification code",
      html: `
        <div style="font-family:sans-serif; max-width:420px;">
          <p>Padi, welcome to Saabi! Here's your verification code:</p>
          <p style="font-size:28px; font-weight:800; letter-spacing:0.2em;">${code}</p>
          <p style="color:#8a7a68;">It expires in 15 minutes.</p>
        </div>`,
    }),
  });

  return { sent: res.ok, status: res.status };
}
