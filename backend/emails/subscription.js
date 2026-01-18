const subscription = ({ email, unsubscribeUrl }) => `
<!doctype html>
<html>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F6;">
      <tr>
        <td align="center">
      <!-- MAIN CONTAINER -->
      <table
        width="600"
        cellpadding="0"
        cellspacing="0"
        style="
          max-width:600px;
          background:#FAF7F6;
          padding:36px 28px;
          color:#292424;
        "
      >

        <!-- LOGO -->
        <tr>
          <td align="center" style="padding-bottom:28px;">
            <a href="https://weylor.world" style="text-decoration:none;">
              <h1
                style="
                  margin:0;
                  font-family:'Abril Fatface', Georgia, serif;
                  text-transform:uppercase;
  letter-spacing: 5px;
  font-size: 40px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #292424;
                "
              >
                WEYLOR
              </h1>
            </a>
          </td>
        </tr>

        <!-- HERO IMAGE -->
        <tr>
          <td align="center" style="padding-bottom:28px;">
            <a href="https://weylor.world" style="text-decoration:none;">
              <img
                src="https://res.cloudinary.com/dlxblrnky/image/upload/f_auto,q_auto,w_600/v1767633145/katsiaryna-endruszkiewicz-BteCp6aq4GI-unsplash_a7kvwm.jpg"
                alt="Weylor Collection"
                width="600"
                style="width:100%; max-width:600px; border-radius:16px; display:block; border:0;"
              >
            </a>
          </td>
        </tr>

        <!-- HEADLINE -->
        <tr>
          <td align="center" style="padding-bottom:14px;">
            <h2
              style="
                font-family:'Abril Fatface', Georgia, serif;
                margin:0;
                font-size:26px;
                font-weight:700;
                color:#292424;
              "
            >
              You’re in!
            </h2>
          </td>
        </tr>

        <!-- COPY -->
        <tr>
          <td align="center" style="padding-bottom:26px;">
            <p
              style="
                margin:0;
                font-size:16px;
                line-height:1.7;
                color:#292424;
                font-family:'Abril Fatface', Georgia, serif;
              "
            >
              Expect curated drops, early access, and stories crafted with intention!
            </p>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td align="center" style="padding-bottom:44px;">
            <a
              href="https://weylor.world"
              style="
                background:#D6B151;
                color:#FAF7F6;
                padding:14px 30px;
                border-radius:50px;
                text-decoration:none;
                font-weight:300;
                font-size:24px;
                display:inline-block;
                font-family:'Abril Fatface', Georgia, serif;
              "
            >
              Explore
            </a>
          </td>
        </tr>

        <!-- SOCIAL -->
        <tr>
          <td align="center" style="padding-bottom:34px;">
            <a href="https://www.instagram.com/weylor.world/" style="margin:0 8px; text-decoration:none;">
              <img
  src="https://res.cloudinary.com/dlxblrnky/image/upload/f_png,w_66,h_66,q_auto:best,e_sharpen:200/v1767636308/instagram-brands-solid-full_mitw82"
  width="30"
  height="30"
  alt="Instagram"
  style="display:inline-block; border:0;"
>
            </a>

            <a href="https://x.com/weylor" style="margin:0 8px; text-decoration:none;">
              <img
                src="https://res.cloudinary.com/dlxblrnky/image/upload/f_png,w_66,h_66,q_auto:best,e_sharpen:200/v1767636984/x-twitter-brands-solid-full_aopcro"
                width="30"
                height="30"
                alt="X"
                style="display:inline-block; border:0;"
              >
            </a>

            <a href="https://facebook.com/weylor" style="margin:0 8px; text-decoration:none;">
              <img
                src="https://res.cloudinary.com/dlxblrnky/image/upload/f_png,w_66,h_66,q_auto:best,e_sharpen:200/v1767636649/facebook-brands-solid-full_zpuvcz"
                width="30"
                height="30"
                alt="Facebook"
                style="display:inline-block; border:0;"
              >
            </a>

            <a href="https://pinterest.com/weylor" style="margin:0 8px; text-decoration:none;">
              <img
                src="https://res.cloudinary.com/dlxblrnky/image/upload/f_png,w_66,h_66,q_auto:best,e_sharpen:200/v1767637043/pinterest-brands-solid-full_vlztsy"
                width="30"
                height="30"
                alt="Pinterest"
                style="display:inline-block; border:0;"
              >
            </a>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td
            align="center"
            style="
              border-top:1px solid rgba(168, 184, 74, 1);
              padding-top:22px;
            "
          >
            <p
              style="
                font-size:12px;
                color:#6f6b68;
                line-height:1.6;
                margin:0;
              "
            >
              WEYLOR · Hyderabad, Telangana, India.<br>
              You received this because <strong>${email}</strong> subscribed.
            </p>

            <p style="font-size:12px; margin:12px 0 0;">
              <a href="${unsubscribeUrl}" style="color:#6f6b68; text-decoration:underline;">
                Unsubscribe
              </a>
              ·
              <a href="mailto:support@weylor.world" style="color:#6f6b68; text-decoration:underline;">
                Support
              </a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
  </body>
</html>
`;

module.exports = { subscription };
