const resetPasswordTemplate = (name, resetLink) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="background-color: rgb(212, 238, 191); width: 60%; padding: 3rem 0;">
    <table style="margin-left: 3rem; border-spacing: 1rem; background-color: white; width: 85%;">
      <tr>
        <td>
          <h1>Skill Learn</h1>
        </td>
      </tr>
      <tr>
        <td>
          <div
            style="
              width: 60%;
              background-color: white;
              border-radius: 0.25rem;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
                0 2px 4px -2px rgb(0 0 0 / 0.1);
              padding: 1rem;
              line-height: 28px;
            "
          >
            <p>Hello ${name}</p>
            <p>
              Someone(hopefully you!) has requested to change your password.
              Please click the link below to change your password now.
            </p>
            <a href="${resetLink}"
              style="
                width: 40%;
                margin-top: 1rem;
                margin-left: 7rem;
                margin-bottom: 1rem;
                background: none;
                border: none;
                background-color: green;
                padding: 1rem 1rem;
                border-radius: 0.25rem;
                color: white;
                font-weight: bold;
                text-decoration: none;
              "
            >
              Change My Password
            </a>
            <p>If you didn't make this request, please disregard this email</p>
            <p>Note that this link will expire in 15 mins</p>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <a href="www.google.com">Get More Help</a>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
const confirmEmailTemplate = (name, confirmLink) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body style="background-color: rgb(212, 238, 191); width: 60%; padding: 3rem 0;">
    <table style="margin-left: 3rem; border-spacing: 1rem; background-color: white; width: 85%;">
      <tr>
        <td>
          <h1>Skill Learn</h1>
        </td>
      </tr>
      <tr>
        <td>
          <div
            style="
              width: 60%;
              background-color: white;
              border-radius: 0.25rem;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
                0 2px 4px -2px rgb(0 0 0 / 0.1);
              padding: 1rem;
              line-height: 28px;
            "
          >
            <p>Hello ${name}</p>
            <p>
              Welcome to Skill Learn. Complete your account setup and confirm your email by clicking the link below. 
            </p>
            <a href="${confirmLink}"
              style="
                width: 40%;
                margin-top: 1rem;
                margin-left: 7rem;
                margin-bottom: 1rem;
                background: none;
                border: none;
                background-color: green;
                padding: 1rem 1rem;
                border-radius: 0.25rem;
                color: white;
                font-weight: bold;
                text-decoration: none;
              "
            >
              Confirm Email
            </a>
            <p>If you didn't make this request, please disregard this email</p>
            <p>Note that this link will expire in 15 mins</p>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <a href="www.google.com">Get More Help</a>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

module.exports = { resetPasswordTemplate, confirmEmailTemplate };
