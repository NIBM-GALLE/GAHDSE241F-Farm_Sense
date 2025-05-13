export const VERIFICATION_EMAIL_TEMPLATE = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #2196F3, #1976D2); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello there,</p>
    <p>Thank you for signing up with Lendify! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2196F3;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 01 day for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Lendify Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #2196F3, #1976D2); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello there,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #2196F3; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Lendify Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #2196F3, #1976D2); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello there,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #2196F3; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
    
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Lendify Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FarmSense</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #388E3C); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to FarmSense!</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {name},</p>
    <p>Thank you for joining FarmSense! We're thrilled to have you as part of our community.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{loginURL}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Access Your Account</a>
    </div>
    <p>Here's a summary of your account information:</p>
    <ul style="background-color: #fff; padding: 15px; border-radius: 4px; border-left: 4px solid #4CAF50;">
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Account Created:</strong> {creationDate}</li>
    </ul>
    <p>Getting started is easy:</p>
    <ol>
      <li>Complete your profile</li>
      <li>Explore our crop disease prediction tools</li>
      <li>Connect with agricultural experts</li>
    </ol>
    <p>If you have any questions, please visit our <a href="{helpCenter}" style="color: #4CAF50; text-decoration: none;">Help Center</a> or contact our support team at <a href="mailto:support@farmsense.com" style="color: #4CAF50; text-decoration: none;">support@farmsense.com</a>.</p>
    <p>Best regards,<br>The FarmSense Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>&copy; 2025 FarmSense. All rights reserved.</p>
  </div>
</body>
</html>
`;

export const WELCOME_SUB_CENTER_ADMIN_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FarmSense</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #FF9800, #F57C00); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to FarmSense</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {name},</p>
    <p>Welcome to the FarmSense Sub Center! We're excited to have you onboard as a key administrator for your region.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{loginURL}" style="background-color: #FF9800; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Access Your Dashboard</a>
    </div>
    <p>Here's a summary of your account information:</p>
    <ul style="background-color: #fff; padding: 15px; border-radius: 4px; border-left: 4px solid #FF9800;">
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Account Created:</strong> {creationDate}</li>
      <li><strong>Sub Center:</strong> {subCenterName}</li>
    </ul>
    <p>As a Sub Center Admin, you can:</p>
    <ol>
      <li>Manage farmer issues</li>
      <li>Oversee crop disease reports</li>
      <li>Coordinate with field agents</li>
    </ol>
    <p>If you have any questions, please visit our <a href="{helpCenter}" style="color: #FF9800; text-decoration: none;">Help Center</a> or contact our support team at <a href="mailto:support@farmsense.com" style="color: #FF9800; text-decoration: none;">support@farmsense.com</a>.</p>
    <p>Best regards,<br>The FarmSense Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>&copy; 2025 FarmSense. All rights reserved.</p>
  </div>
</body>
</html>
`;

export const WELCOME_RESEARCH_DIVISION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to FarmSense</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #673AB7, #512DA8); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Welcome to FarmSense</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {name},</p>
    <p>Welcome to the FarmSense Research Division! We're excited to have you onboard as a key contributor to advancing agricultural research and innovation.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{loginURL}" style="background-color: #673AB7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Access Your Dashboard</a>
    </div>
    <p>Here's a summary of your account information:</p>
    <ul style="background-color: #fff; padding: 15px; border-radius: 4px; border-left: 4px solid #673AB7;">
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Account Created:</strong> {creationDate}</li>
      <li><strong>Research Division:</strong> {divisionName}</li>
    </ul>
    <p>As a Research Division Admin, you can:</p>
    <ol>
      <li>Manage research projects and teams</li>
      <li>Analyze crop disease data</li>
      <li>Collaborate with other divisions</li>
    </ol>
    <p>If you have any questions, please visit our <a href="{helpCenter}" style="color: #673AB7; text-decoration: none;">Help Center</a> or contact our support team at <a href="mailto:support@farmsense.com" style="color: #673AB7; text-decoration: none;">support@farmsense.com</a>.</p>
    <p>Best regards,<br>The FarmSense Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>&copy; 2025 FarmSense. All rights reserved.</p>
  </div>
</body>
</html>
`;
