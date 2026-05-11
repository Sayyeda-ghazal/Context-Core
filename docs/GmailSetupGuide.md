# Gmail Setup Guide

## Step-by-Step Configuration

### 1. Enable 2-Step Verification
- Go to your Google Account: https://myaccount.google.com/
- Navigate to "Security" → "2-Step Verification"
- Turn on 2-Step Verification

### 2. Generate App Password
- In your Google Account, go to "Security" → "App passwords"
- Select "Mail" as the app and "Other (Custom name)" as the device
- Enter "ContextCore" as the custom name
- Click "Generate"
- Copy the 16-character password (it will only be shown once)

### 3. Configure Backend Environment
Update your `contextcore-backend/.env` file:
```bash
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_16_character_app_password
MAIL_FROM=your_email@gmail.com
```

### 4. Verify Configuration
- Start the backend server
- Visit: `http://localhost:8000/api/auth/email-health-check`
- You should see: `{"status": "ok", "message": "Email service is configured and ready"}`

## Troubleshooting

### Common Issues:
- **Authentication Failed**: Double-check your App Password
- **Connection Timeout**: Ensure port 587 is not blocked by firewall
- **Email Not Received**: Check spam/junk folder
- **Invalid Credentials**: Verify email address format (must be full email)

### Gmail Security Notes:
- App Passwords only work with 2-Step Verification enabled
- If you change your Google Account password, you must generate a new App Password
- App Passwords are specific to each application

## Testing Email Flow
1. Register a new user
2. Check your email inbox for verification message
3. Click the verification link
4. Try forgot password functionality

## Production Considerations
- For production, consider using dedicated email services (SendGrid, Mailgun, etc.)
- Monitor email delivery rates and bounce rates
- Implement email template management
- Add rate limiting to prevent abuse
