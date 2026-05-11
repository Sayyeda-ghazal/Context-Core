<!-- Setting Up Front-end -->
npm install -D tailwindcss@3 postcss autoprefixernpx tailwindcss init -p


npm create vite@latest context-core-frontend

npm install vite --save-dev


<!-- Running Front-end -->
cd context-core-frontend
ls
npm run dev

npm install react-router-dom

<!-- Activating Virtual Environment for Backend -->
cd contextcore-backend
source venv/bin/activate
python3 -m uvicorn app.main:app --reload


# Gmail Email Configuration Setup

## Backend Gmail Setup

1. **Enable 2-Step Verification** on your Google Account
   - Go to https://myaccount.google.com/security
   - Under "Signing in to Google", click "2-Step Verification"
   - Follow the setup steps

2. **Generate App Password**
   - In your Google Account security settings, go to "App passwords"
   - Select "Mail" as the app and "Other" as the device
   - Enter "ContextCore" as the custom name
   - Click "Generate" and copy the 16-character password

3. **Update backend `.env` file**
   ```bash
   MAIL_USERNAME=your_email@gmail.com
   MAIL_PASSWORD=your_16_character_app_password
   MAIL_FROM=your_email@gmail.com
   ```

## Testing Gmail Configuration

1. Start the backend server
2. Visit the health check endpoint: `http://localhost:8000/api/auth/email-health-check`
3. You should see: `{"status": "ok", "message": "Email service is configured and ready"}`

## Troubleshooting Gmail Issues

- **Authentication Failed**: Double-check your App Password
- **Email Not Received**: Check spam/junk folder
- **Connection Issues**: Ensure port 587 is not blocked by firewall
- **Invalid Credentials**: Verify email address format is correct