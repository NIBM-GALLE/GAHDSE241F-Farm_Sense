export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello there,</p>
    <p>Thank you for signing up with our service! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #f0f7f0; border: 2px dashed #81C784; padding: 15px; border-radius: 8px; display: inline-block;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2E7D32;">{verificationCode}</span>
      </div>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 1 day for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p style="margin-top: 30px;">Best regards,<br><span style="color: #2E7D32; font-weight: bold;">The Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message, please do not reply to this email.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #4CAF50, #1B5E20); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">Password Reset</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello there,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 14px 28px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.3s;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <div style="background-color: #E8F5E9; padding: 15px; border-left: 4px solid #4CAF50; margin: 25px 0; border-radius: 0 5px 5px 0;">
      <p style="margin: 0; color: #2E7D32;"><strong>Security Tip:</strong> We'll never ask for your password via email or phone.</p>
    </div>
    <p style="margin-top: 30px;">Best regards,<br><span style="color: #2E7D32; font-weight: bold;">The Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message, please do not reply to this email.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #43A047, #388E3C); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello {userName},</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 35px 0;">
      <div style="background-color: #4CAF50; color: white; width: 70px; height: 70px; line-height: 70px; border-radius: 50%; display: inline-block; font-size: 35px; box-shadow: 0 4px 10px rgba(76,175,80,0.3);">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <div style="background-color: #E8F5E9; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <p style="margin-top: 0; color: #2E7D32;"><strong>For security reasons, we recommend that you:</strong></p>
      <ul style="color: #1B5E20;">
        <li>Use a strong, unique password</li>
        <li>Avoid using the same password across multiple sites</li>
        <li>Enable two-factor authentication if available</li>
      </ul>
    </div>
    <p>Thank you for helping us keep your account secure.</p>
    <p style="margin-top: 30px;">Best regards,<br><span style="color: #2E7D32; font-weight: bold;">The Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message, please do not reply to this email.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
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
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #66BB6A, #2E7D32); padding: 30px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 400;">Welcome to FarmSense!</h1>
    <p style="color: #E8F5E9; margin: 10px 0 0 0;">Smart farming for a greener future</p>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello {name},</p>
    <p>Thank you for joining FarmSense! We're thrilled to have you as part of our growing community of agricultural innovators.</p>
    <div style="text-align: center; margin: 35px 0;">
      <a href="{loginURL}" style="background-color: #43A047; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; box-shadow: 0 3px 6px rgba(0,0,0,0.1); transition: all 0.3s;">Access Your Account</a>
    </div>
    <p>Here's a summary of your account information:</p>
    <div style="background-color: #E8F5E9; padding: 20px; border-radius: 5px; border-left: 5px solid #4CAF50; margin: 20px 0;">
      <p style="margin-top: 0;"><strong style="color: #2E7D32;">Email:</strong> {email}</p>
      <p style="margin-bottom: 0;"><strong style="color: #2E7D32;">Account Created:</strong> {creationDate}</p>
    </div>
    <p>Getting started is easy:</p>
    <div style="margin: 20px 0 30px 0;">
      <div style="display: flex; margin-bottom: 15px;">
        <div style="background-color: #4CAF50; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 15px; flex-shrink: 0;">1</div>
        <div>Complete your profile to personalize your experience</div>
      </div>
      <div style="display: flex; margin-bottom: 15px;">
        <div style="background-color: #4CAF50; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 15px; flex-shrink: 0;">2</div>
        <div>Explore our crop disease prediction tools for early detection</div>
      </div>
      <div style="display: flex;">
        <div style="background-color: #4CAF50; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 15px; flex-shrink: 0;">3</div>
        <div>Connect with agricultural experts for personalized advice</div>
      </div>
    </div>
    <p>If you have any questions, please visit our <a href="{helpCenter}" style="color: #2E7D32; text-decoration: none; font-weight: bold;">Help Center</a> or contact our support team at <a href="mailto:support@farmsense.com" style="color: #2E7D32; text-decoration: none; font-weight: bold;">support@farmsense.com</a>.</p>
    <p style="margin-top: 30px;">Best regards,<br><span style="color: #2E7D32; font-weight: bold;">The FarmSense Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">&copy; 2025 FarmSense. All rights reserved.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
  </div>
</body>
</html>
`;

export const VERIFICATION_EMAIL_TEMPLATE_SUB_CENTER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello {adminName},</p>
    <p>You have been selected as a admin of {subCenterName} Sub Center. Use the below verification code to verify your account and start working. Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #f0f7f0; border: 2px dashed #81C784; padding: 15px; border-radius: 8px; display: inline-block;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2E7D32;">{verificationCode}</span>
      </div>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 1 hour for security reasons.</p>
    <p>If you didn't sign up for this, please ignore this email.</p>
    <p style="margin-top: 30px;">Best regards,<br><span style="color: #2E7D32; font-weight: bold;">The Farmsense</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message, please do not reply to this email.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
  </div>
</body>
</html>`;

export const LOGIN_CREDENTIALS_FOR_ADMINS = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login Credentials</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">Your Admin Login Credentials</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello {adminName},</p>
    <p>You have been registered as an administrator for {subCenterName} Sub Center. Your login credentials are provided below:</p>
    
    <!-- Username display -->
    <div style="margin: 30px 0;">
      <table style="width: 100%; border-collapse: collapse; background-color: #f0f7f0; border: 2px dashed #81C784; border-radius: 8px;">
        <tr>
          <td style="padding: 12px; font-weight: bold; width: 30%;">Email:</td>
          <td style="padding: 12px;">{adminEmail}</td>
        </tr>
      </table>
    </div>
    
    <!-- Password display (now visible by default) -->
    <div style="margin: 30px 0;">
      <table style="width: 100%; border-collapse: collapse; background-color: #f0f7f0; border: 2px dashed #81C784; border-radius: 8px;">
        <tr>
          <td style="padding: 12px; font-weight: bold; width: 30%;">Password:</td>
          <td style="padding: 12px; font-weight: bold; letter-spacing: 1px; color: #2E7D32;">{adminPassword}</td>
        </tr>
      </table>
    </div>
    
    <p><strong>Important:</strong> Please change your password after your first login for security reasons.</p>
    
    <p style="margin-top: 30px;">Best regards,<br><span style="color: #2E7D32; font-weight: bold;">The Farmsense Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message, please do not reply to this email.</p>
    <p style="font-size: 12px;">If you did not expect to receive this email, please contact us immediately.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
  </div>
</body>
</html>`;

export const VERIFICATION_EMAIL_TEMPLATE_RESEARCH_CENTER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello {adminName},</p>
    <p>You have been selected as a admin of {researchCenter} Research Center. Use the below verification code to verify your account and start working. Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #f0f7f0; border: 2px dashed #81C784; padding: 15px; border-radius: 8px; display: inline-block;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2E7D32;">{verificationCode}</span>
      </div>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 1 hour for security reasons.</p>
    <p>If you didn't sign up for this, please ignore this email.</p>
    <p style="margin-top: 30px;">Best regards,<br><span style="color: #2E7D32; font-weight: bold;">The Farmsense</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message, please do not reply to this email.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
  </div>
</body>
</html>`;

export const LOGIN_CREDENTIALS_FOR_ADMINS_RESEARCH_CENTER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login Credentials</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">Your Admin Login Credentials</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello {adminName},</p>
    <p>You have been registered as an administrator for {researchCenter} Research Center. Your login credentials are provided below:</p>
    
    <!-- Username display -->
    <div style="margin: 30px 0;">
      <table style="width: 100%; border-collapse: collapse; background-color: #f0f7f0; border: 2px dashed #81C784; border-radius: 8px;">
        <tr>
          <td style="padding: 12px; font-weight: bold; width: 30%;">Email:</td>
          <td style="padding: 12px;">{adminEmail}</td>
        </tr>
      </table>
    </div>
    
    <!-- Password display (now visible by default) -->
    <div style="margin: 30px 0;">
      <table style="width: 100%; border-collapse: collapse; background-color: #f0f7f0; border: 2px dashed #81C784; border-radius: 8px;">
        <tr>
          <td style="padding: 12px; font-weight: bold; width: 30%;">Password:</td>
          <td style="padding: 12px; font-weight: bold; letter-spacing: 1px; color: #2E7D32;">{adminPassword}</td>
        </tr>
      </table>
    </div>
    
    <p><strong>Important:</strong> Please change your password after your first login for security reasons.</p>
    
    <p style="margin-top: 30px;">Best regards,<br><span style="color: #2E7D32; font-weight: bold;">The Farmsense Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message, please do not reply to this email.</p>
    <p style="font-size: 12px;">If you did not expect to receive this email, please contact us immediately.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
  </div>
</body>
</html>`;

export const VERIFICATION_EMAIL_TEMPLATE_VISIT_AGENTS = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello {agentName},</p>
    <p>You have been selected as a Visit Agent for {subCenterName} Sub Center. Use the below verification code to verify your account and start working. Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #f0f7f0; border: 2px dashed #81C784; padding: 15px; border-radius: 8px; display: inline-block;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2E7D32;">{verificationCode}</span>
      </div>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 1 hour for security reasons.</p>
    <p>If you didn't sign up for this, please ignore this email.</p>
    <p style="margin-top: 30px;">Best regards,<br><span style="color: #2E7D32; font-weight: bold;">The Farmsense</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message, please do not reply to this email.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
  </div>
</body>
</html>`;

export const LOGIN_CREDENTIALS_FOR_VISIT_AGENTS = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visit Agent Login Credentials</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">Your Login Credentials</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello {agentName},</p>
    <p>You have been registered as an visit agent for {subCenterName} Sub Center. Your login credentials are provided below:</p>
    
    <!-- Username display -->
    <div style="margin: 30px 0;">
      <table style="width: 100%; border-collapse: collapse; background-color: #f0f7f0; border: 2px dashed #81C784; border-radius: 8px;">
        <tr>
          <td style="padding: 12px; font-weight: bold; width: 30%;">Email:</td>
          <td style="padding: 12px;">{agentEmail}</td>
        </tr>
      </table>
    </div>
    
    <!-- Password display (now visible by default) -->
    <div style="margin: 30px 0;">
      <table style="width: 100%; border-collapse: collapse; background-color: #f0f7f0; border: 2px dashed #81C784; border-radius: 8px;">
        <tr>
          <td style="padding: 12px; font-weight: bold; width: 30%;">Password:</td>
          <td style="padding: 12px; font-weight: bold; letter-spacing: 1px; color: #2E7D32;">{agentPassword}</td>
        </tr>
      </table>
    </div>
    
    <p><strong>Important:</strong> Please change your password after your first login for security reasons.</p>
    
    <p style="margin-top: 30px;">Best regards,<br><span style="color: #2E7D32; font-weight: bold;">The Farmsense Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message, please do not reply to this email.</p>
    <p style="font-size: 12px;">If you did not expect to receive this email, please contact us immediately.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
  </div>
</body>
</html>`;

export const PLANT_CASE_ASSIGNMENT_NOTIFICATION_VISIT_AGENTS = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Plant Case Assignment Notification</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">New Plant Case Assigned</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello {agentName},</p>
    <p>You have been assigned to a new plant case. Please review the case details below and proceed as necessary.</p>
    
    <!-- Case Information -->
    <div style="margin: 30px 0;">
      <table style="width: 100%; border-collapse: collapse; background-color: #f0f7f0; border: 2px dashed #81C784; border-radius: 8px;">
        <tr>
          <td style="padding: 12px; font-weight: bold;">Plant Name:</td>
          <td style="padding: 12px;">{plantName}</td>
        </tr>
         <tr>
          <td style="padding: 12px; font-weight: bold;">Plant Issue:</td>
          <td style="padding: 12px;">{plantIssue}</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">Location:</td>
          <td style="padding: 12px;">{location}</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">Farmer Name:</td>
          <td style="padding: 12px;">{farmerName}</td>
        </tr>
         <tr>
          <td style="padding: 12px; font-weight: bold;">Farmer Contact:</td>
          <td style="padding: 12px;">{farmerContact}</td>
        </tr>
      </table>
    </div>

    <p>Kindly log in to the Visit Agent Portal to view more details and update the status of this case as your visit progresses.</p>

    <div style="margin-top: 30px; text-align: center;">
      <a href="{portalLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">View Case</a>
    </div>

    <p style="margin-top: 30px;">Thank you for your dedication.<br><span style="color: #2E7D32; font-weight: bold;">The Farmsense Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message, please do not reply to this email.</p>
    <p style="font-size: 12px;">If you believe this assignment was made in error, please contact your supervisor immediately.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
  </div>
</body>
</html>
`;

export const PLANT_CASE_ASSIGNMENT_NOTIFICATION_RESEARCH_DIVISION = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Plant Case Assignment Notification</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">New Plant Case Assigned</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Hello {centerName},</p>
    <p>Your Research Center have been assigned to a new plant case. Please review the case details below and proceed as necessary.</p>
    
    <!-- Case Information -->
    <div style="margin: 30px 0;">
      <table style="width: 100%; border-collapse: collapse; background-color: #f0f7f0; border: 2px dashed #81C784; border-radius: 8px;">
        <tr>
          <td style="padding: 12px; font-weight: bold;">Plant Name:</td>
          <td style="padding: 12px;">{plantName}</td>
        </tr>
         <tr>
          <td style="padding: 12px; font-weight: bold;">Plant Issue:</td>
          <td style="padding: 12px;">{plantIssue}</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">Location:</td>
          <td style="padding: 12px;">{location}</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">Farmer Name:</td>
          <td style="padding: 12px;">{farmerName}</td>
        </tr>
         <tr>
          <td style="padding: 12px; font-weight: bold;">Farmer Contact:</td>
          <td style="padding: 12px;">{farmerContact}</td>
        </tr>
      </table>
    </div>

    <p>Kindly log in to the Dashboard Portal to view more details and update the status of this case as your center's progresses.</p>

    <div style="margin-top: 30px; text-align: center;">
      <a href="{portalLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">View Case</a>
    </div>

    <p style="margin-top: 30px;">Thank you for your dedication.<br><span style="color: #2E7D32; font-weight: bold;">The Farmsense Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message, please do not reply to this email.</p>
    <p style="font-size: 12px;">If you believe this assignment was made in error, please contact your supervisor immediately.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
  </div>
</body>
</html>
`;

export const PLANT_CASE_RESPONSE_NOTIFICATION_FARMER = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Plant Case Response Notification</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #2E7D32); padding: 25px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="color: white; margin: 0; font-weight: 300;">Your Plant Case Has Been Answered</h1>
  </div>
  <div style="background-color: #f5f9f5; padding: 30px; border-radius: 0 0 5px 5px; border-left: 1px solid #e0e0e0; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
    <p>Dear {farmerName},</p>
    <p>We’re glad to inform you that your submitted plant case has been reviewed by our Research Division, and an expert response is now available.</p>
    
    <!-- Case Details -->
    <div style="margin: 30px 0;">
      <table style="width: 100%; border-collapse: collapse; background-color: #f0f7f0; border: 2px dashed #81C784; border-radius: 8px;">
        <tr>
          <td style="padding: 12px; font-weight: bold;">Plant Name:</td>
          <td style="padding: 12px;">{plantName}</td>
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: bold;">Issue Reported:</td>
          <td style="padding: 12px;">{plantIssue}</td>
        </tr>
          <tr>
          <td style="padding: 12px; font-weight: bold;">Answer:</td>
          <td style="padding: 12px;">{answer}</td>
        </tr>
      </table>
    </div>

  

    <p style="margin-top: 30px;">Thank you for using Farmsense. We hope the information provided helps you restore your plant’s health.<br><span style="color: #2E7D32; font-weight: bold;">The Farmsense Team</span></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em; padding: 10px;">
    <p style="border-top: 1px solid #e0e0e0; padding-top: 15px;">This is an automated message. Please do not reply directly to this email.</p>
    <p style="font-size: 12px;">If you have additional questions or concerns, please contact your nearest support center.</p>
    <div style="margin-top: 10px;">
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #4CAF50; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #81C784; margin: 0 4px;"></span>
      <span style="display: inline-block; height: 8px; width: 8px; border-radius: 50%; background-color: #A5D6A7; margin: 0 4px;"></span>
    </div>
  </div>
</body>
</html>
`;
