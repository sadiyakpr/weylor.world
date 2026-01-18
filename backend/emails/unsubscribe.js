const unsubscribe = `
<!doctype html>
<html>
  <body style="margin:0; padding:32px; background:#0b0b0b; color:#fff; font-family:Helvetica, Arial;">
    <div style="max-width:600px; margin:auto; text-align:center;">
      <h1>You’re unsubscribed</h1>
      <p style="color:#cfcfcf;">
        You’ve been removed from Weylor emails.
      </p>
      <a href="https://weylor.world"
         style="display:inline-block; margin-top:24px;
                background:#fff; color:#000;
                padding:12px 24px; border-radius:999px;
                text-decoration:none; font-weight:bold;">
        Visit Weylor
      </a>
    </div>
  </body>
</html>
`;

module.exports = { unsubscribe };
