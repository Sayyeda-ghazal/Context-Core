# Email Integration Debugging Guide

## Quick Health Check

### Backend Health Check
Visit this endpoint to check if email service is configured correctly:
```
GET http://localhost:8000/api/auth/email-health-check
```

Expected response when configured:
```json
{
  "status": "ok",
  "message": "Email service is configured and ready",
  "config": {
    "MAIL_SERVER": "smtp.gmail.com",
    "MAIL_PORT": 587,
    "MAIL_FROM": "your_email@gmail.com",
    "MAIL_USERNAME": "your_email@gmail.com",
    "is_gmail": true
  }
}
```

### Frontend Debugging
- Check browser console for API request/response logs
- Look for `API Request` and `API Response` messages
- Verify email endpoints are being called

## Common Issues & Solutions

### 1. Email Not Sending
- **Check environment variables**: Ensure `.env` file has correct MAIL_USERNAME and MAIL_PASSWORD
- **Gmail App Password**: For Gmail, use App Password instead of regular password
- **Less Secure Apps**: Enable 'Less secure app access' or use App Passwords

### 2. Connection Errors
- **Port/Server**: Verify MAIL_PORT (587 for TLS, 465 for SSL)
- **Firewall**: Check if port is blocked by firewall or ISP

### 3. Authentication Failed
- **App Password**: Generate new App Password in Google Account settings
- **Username Format**: Use full email address as username

## Testing Email Flow

1. **Registration**: Submit registration form
2. **Check Console**: Look for email service logs
3. **Verify Email**: Click verification link
4. **Password Reset**: Test forgot password flow

## Logging
Backend logs will show:
- `INFO`: Email sent successfully
- `ERROR`: Email sending failures with detailed error messages

## Environment Setup

### For Development (Gmail):
1. Enable 2-Step Verification on Google Account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character app password in MAIL_PASSWORD

### For Production:
- Consider using transactional email services (SendGrid, Mailgun, etc.)
- Update MAIL_SERVER and credentials accordingly
