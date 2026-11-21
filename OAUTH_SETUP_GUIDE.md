# OmniSocial AI — Official OAuth & Platform Integration Guide

This guide provides exhaustive, official developer setup instructions for connecting all 13 supported social media platforms to **OmniSocial AI**.

---

## 1. Meta Network: Facebook Pages & Instagram Professional

### Requirements
- A Meta for Developers account ([developers.facebook.com](https://developers.facebook.com/)).
- A verified Meta Business Manager account.
- An Instagram Professional (Creator or Business) account connected to a Facebook Page.

### Step-by-Step Setup
1. **Create an App**:
   - Go to [Meta Developer App Dashboard](https://developers.facebook.com/apps/).
   - Click **Create App** and select **Business** as the app type.
   - Enter your App Display Name (e.g., `OmniSocial AI Integration`).
2. **Add Products**:
   - Add **Facebook Login for Business** and **Instagram Graph API**.
3. **Configure OAuth Redirect URIs**:
   - Under *Facebook Login > Settings*, add:
     - `https://your-domain.com/api/social/facebook/callback`
     - `https://your-domain.com/api/social/instagram/callback`
4. **Required Permissions / Scopes**:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `instagram_basic`
   - `instagram_content_publish`
   - `instagram_manage_comments`
   - `instagram_manage_insights`
5. **Environment Variables**:
   ```env
   META_CLIENT_ID="your_meta_app_id"
   META_CLIENT_SECRET="your_meta_app_secret"
   META_REDIRECT_URI="http://localhost:3000/api/social/facebook/callback"
   INSTAGRAM_REDIRECT_URI="http://localhost:3000/api/social/instagram/callback"
   ```

---

## 2. Google Cloud: YouTube & Google Business Profile

### Requirements
- Google Cloud Console Project ([console.cloud.google.com](https://console.cloud.google.com/)).
- YouTube Channel or Google Business Profile.

### Step-by-Step Setup
1. **Create Project**:
   - Create a project named `OmniSocial-AI-Suite`.
2. **Enable APIs**:
   - Enable **YouTube Data API v3**.
   - Enable **Google My Business API** / **Business Profile Performance API**.
3. **OAuth Consent Screen**:
   - Configure External or Internal user type.
   - Add scopes:
     - `https://www.googleapis.com/auth/youtube.upload`
     - `https://www.googleapis.com/auth/youtube.readonly`
     - `https://www.googleapis.com/auth/business.manage`
4. **Create Credentials**:
   - OAuth 2.0 Client ID for Web Applications.
   - Authorized Redirect URIs:
     - `https://your-domain.com/api/auth/google/callback`
     - `https://your-domain.com/api/social/youtube/callback`
     - `https://your-domain.com/api/social/googlebusiness/callback`
5. **Environment Variables**:
   ```env
   GOOGLE_CLIENT_ID="your_client_id.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your_client_secret"
   YOUTUBE_REDIRECT_URI="http://localhost:3000/api/social/youtube/callback"
   ```

---

## 3. LinkedIn Developer Portal

### Requirements
- LinkedIn Developer Portal ([developer.linkedin.com](https://developer.linkedin.com/)).
- LinkedIn Company Page admin rights.

### Step-by-Step Setup
1. **Create App**:
   - Associate your app with your verified LinkedIn Company Page.
2. **Request Products**:
   - Request **Share on LinkedIn** and **Sign In with LinkedIn using OpenID Connect**.
   - Request **Community Management API** for Page publishing and comment monitoring.
3. **Configure Redirect URIs**:
   - Add `https://your-domain.com/api/social/linkedin/callback`.
4. **Scopes**:
   - `openid`, `profile`, `email`, `w_member_social`, `w_organization_social`, `r_organization_social`.
5. **Environment Variables**:
   ```env
   LINKEDIN_CLIENT_ID="your_linkedin_client_id"
   LINKEDIN_CLIENT_SECRET="your_linkedin_client_secret"
   LINKEDIN_REDIRECT_URI="http://localhost:3000/api/social/linkedin/callback"
   ```

---

## 4. X (Twitter) Developer Platform

### Requirements
- X Developer Account with Basic or Pro tier ([developer.x.com](https://developer.x.com/)).

### Step-by-Step Setup
1. **Create Project & App**:
   - Create a Project in the X Developer Portal.
2. **User Authentication Settings**:
   - Enable OAuth 2.0.
   - Type: **Web App**.
   - App permissions: **Read and write and Direct message**.
   - Callback URL: `https://your-domain.com/api/social/x/callback`.
3. **Scopes**:
   - `tweet.read`, `tweet.write`, `users.read`, `offline.access`, `dm.read`, `dm.write`.
4. **Environment Variables**:
   ```env
   X_CLIENT_ID="your_x_client_id"
   X_CLIENT_SECRET="your_x_client_secret"
   X_REDIRECT_URI="http://localhost:3000/api/social/x/callback"
   ```

---

## 5. TikTok for Developers

### Requirements
- TikTok Developer Account ([developers.tiktok.com](https://developers.tiktok.com/)).

### Step-by-Step Setup
1. **Create App**:
   - Apply for **Content Posting API** and **Login Kit**.
2. **Configure Redirect URI**:
   - `https://your-domain.com/api/social/tiktok/callback`.
3. **Scopes**:
   - `user.info.basic`, `video.upload`, `video.publish`.
4. **Environment Variables**:
   ```env
   TIKTOK_CLIENT_KEY="your_tiktok_client_key"
   TIKTOK_CLIENT_SECRET="your_tiktok_client_secret"
   TIKTOK_REDIRECT_URI="http://localhost:3000/api/social/tiktok/callback"
   ```

---

## 6. Pinterest Developers

### Requirements
- Pinterest Business Account ([developers.pinterest.com](https://developers.pinterest.com/)).

### Step-by-Step Setup
1. **Create App**:
   - Register application in Pinterest Developer Portal.
2. **Redirect URI**:
   - `https://your-domain.com/api/social/pinterest/callback`.
3. **Scopes**:
   - `boards:read`, `boards:write`, `pins:read`, `pins:write`, `user_accounts:read`.
4. **Environment Variables**:
   ```env
   PINTEREST_APP_ID="your_pinterest_app_id"
   PINTEREST_APP_SECRET="your_pinterest_app_secret"
   PINTEREST_REDIRECT_URI="http://localhost:3000/api/social/pinterest/callback"
   ```

---

## 7. Threads Publishing API

### Requirements
- Meta Threads API account ([developers.facebook.com/docs/threads](https://developers.facebook.com/docs/threads)).
- Connected Threads Profile.

### Step-by-Step Setup
1. Enable **Threads API** inside your Meta Developer app.
2. Add Redirect URI: `https://your-domain.com/api/social/threads/callback`.
3. Scopes: `threads_basic`, `threads_content_publish`, `threads_read_replies`, `threads_manage_replies`.
4. Environment Variables:
   ```env
   THREADS_APP_ID="your_threads_app_id"
   THREADS_APP_SECRET="your_threads_app_secret"
   THREADS_REDIRECT_URI="http://localhost:3000/api/social/threads/callback"
   ```

---

## 8. WhatsApp Business Cloud API

### Requirements
- Meta Business Manager verified phone number.
- WhatsApp Business Account.

### Step-by-Step Setup
1. In Meta Developer Portal, add **WhatsApp** product.
2. Obtain **Phone Number ID** and **WhatsApp Business Account ID**.
3. Generate permanent system user access token with `whatsapp_business_messaging` and `whatsapp_business_management` permissions.
4. Environment Variables:
   ```env
   WHATSAPP_PHONE_NUMBER_ID="your_phone_number_id"
   WHATSAPP_ACCESS_TOKEN="your_permanent_access_token"
   ```

---

## 9. Telegram Bot API

### Requirements
- Telegram account and [@BotFather](https://t.me/BotFather).

### Step-by-Step Setup
1. Send `/newbot` to @BotFather to create your publishing bot.
2. Obtain Bot API Token.
3. Add bot as Administrator to your Telegram Channels or Groups with "Post Messages" permission.
4. Environment Variables:
   ```env
   TELEGRAM_BOT_TOKEN="your_bot_token"
   ```

---

## 10. Reddit Data API

### Requirements
- Reddit Developer Account ([reddit.com/prefs/apps](https://www.reddit.com/prefs/apps)).

### Step-by-Step Setup
1. Click **Create Another App** (select **web app**).
2. Set Redirect URI: `https://your-domain.com/api/social/reddit/callback`.
3. Environment Variables:
   ```env
   REDDIT_CLIENT_ID="your_reddit_client_id"
   REDDIT_CLIENT_SECRET="your_reddit_client_secret"
   REDDIT_REDIRECT_URI="http://localhost:3000/api/social/reddit/callback"
   ```

---

## 11. Snapchat Marketing API / Creative Kit

### Requirements
- Snap Kit Developer Account ([kit.snapchat.com](https://kit.snapchat.com/)).

### Step-by-Step Setup
1. Create App in Snap Kit Developer Portal.
2. Enable **Creative Kit** or **Marketing API**.
3. Configure OAuth redirect: `https://your-domain.com/api/social/snapchat/callback`.
4. Environment Variables:
   ```env
   SNAPCHAT_CLIENT_ID="your_snap_client_id"
   SNAPCHAT_CLIENT_SECRET="your_snap_client_secret"
   SNAPCHAT_REDIRECT_URI="http://localhost:3000/api/social/snapchat/callback"
   ```

---

## 12. Google Gemini AI Studio

### Requirements
- Google AI Studio ([aistudio.google.com](https://aistudio.google.com/)).

### Step-by-Step Setup
1. Generate an API Key in Google AI Studio.
2. Set in environment variables:
   ```env
   GEMINI_API_KEY="AIzaSy..."
   ```
3. Default text model: `gemini-2.5-flash` or `gemini-2.5-pro`.
