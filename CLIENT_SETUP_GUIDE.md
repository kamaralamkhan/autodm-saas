# AutoDM Flow - Client Onboarding & Monetization Guide

This document outlines the exact steps required to onboard a new client (influencer) onto the AutoDM Flow platform and the roadmap for scaling into a monetized SaaS.

## Phase 1: Current State (Beta / Development Mode)
While your Meta App is still on "Standard Access", you can only onboard beta clients by adding them as "Testers" in your Meta Dashboard.

### Onboarding a Beta Client
1. **Add as Tester:** Go to Meta Developer Dashboard -> **App Roles** -> Add the client's Instagram username as an "Instagram Tester".
2. **Client Accepts Invite:** The client must open their Instagram app on their phone, go to **Settings -> Website Permissions -> Tester Invites**, and click **Accept**.
3. **Client Logs In:** The client goes to your website (`https://autodm-app.vercel.app`), clicks **Log in with Instagram**, and authorizes the app.
4. **Active:** The client's automations will now successfully fire!

---

## Phase 2: Public Launch (Monetized SaaS)
Once you successfully complete **Meta App Review**, you will receive **Advanced Access**. This completely eliminates the "Tester" requirement.

### Onboarding a Public Client
1. **Client Logs In:** The client visits `https://autodm-app.vercel.app`, clicks **Log in with Instagram**, and authorizes the app.
2. **Active:** That's it! No Meta Dashboard access required. The webhook will automatically route their comments/DMs to their specific automations in your database.

---

## 🛠 Roadmap to Public Launch & Monetization

Before you can start charging thousands of influencers for this service, you MUST complete the following roadmap:

### 1. Meta App Review (Crucial)
You must submit your app to Meta for review to get **Advanced Access** for the following permissions:
- `instagram_manage_comments`
- `instagram_manage_messages`
- `instagram_manage_insights`

**Requirements for Review:**
- A **Screencast Video** (a screen recording showing how an influencer logs into your app, creates an automation, and how the automation replies to them on Instagram).
- A **Terms of Service URL** (We need to create a `/terms` page).
- (Privacy Policy is already done!).

### 2. Stripe Integration (Monetization)
To charge influencers a monthly subscription:
- We need to integrate **Stripe Checkout**.
- Update the database (`users` table) to track `stripe_subscription_id` and `subscription_status` (e.g., `free`, `pro`).
- Lock certain features (like unlimited AI replies or multiple automations) behind the `pro` subscription.

### 3. AI Groq Integration
- Swap out the `placeholder_groq_api_key` with a real production API key from Groq so that influencers can use the dynamic AI Chatbot feature.

### 4. Custom Domain
- Move the app from `autodm-app.vercel.app` to a professional custom domain (e.g., `autodmflow.com`).
