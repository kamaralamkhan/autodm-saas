# InstaAuto Production Checklist

Before taking your app to production, complete these steps to ensure it is secure, stable, and compliant.

## 1. Meta App Review & Business Verification
- [ ] **Business Verification**: In the Meta Developer Dashboard, submit your business details. Meta requires this for production access to the Instagram Graph API.
- [ ] **Permissions Request**: Submit a review request for `instagram_manage_messages` and `instagram_manage_comments`. Include screen recordings showing how InstaAuto uses these permissions in your business workflow.
- [ ] **Go Live**: Switch the app from "Development" to "Live" mode in the Meta app dashboard.

## 2. Security
- [ ] **Rotate Keys**: Ensure `SUPABASE_SERVICE_ROLE_KEY`, `INSTAGRAM_APP_SECRET`, and `META_APP_SECRET` are stored securely and never leaked to the client (`NEXT_PUBLIC_` prefix should NOT be used for these).
- [ ] **Row Level Security (RLS)**: Verify that Supabase RLS is enabled on all tables (already included in `schema.sql`).
- [ ] **Webhook Signatures**: Validate that `DISABLE_WEBHOOK_SIGNATURE_CHECK` is false or unset in production so all incoming requests are authenticated via `x-hub-signature-256`.

## 3. Hosting & Database
- [ ] **Vercel**: Deploy the Next.js app to Vercel. Use the Hobby tier (free) to start, but monitor your serverless function execution times and edge request limits.
- [ ] **Supabase**: Link your Vercel project to a Supabase project. The free tier of Supabase provides 500MB database space and 50M API requests per month, which is plenty for early stages.
- [ ] **Scheduled Cleanup**: Setup pg_cron as documented in `SUPABASE_SETUP.md` to prune the `unlock_attempts` table regularly and reduce database bloat.

## 4. Scaling and Reliability
- [ ] **Job Queues**: For high-volume accounts, consider offloading webhook processing to a background job queue (e.g. Inngest, Upstash QStash) rather than processing within the 10-second webhook timeout window.
- [ ] **Retries & Backoff**: Instagram APIs may rate-limit or timeout. Ensure transient errors correctly return a failure so Meta retries the webhook, or implement internal retries.
- [ ] **Monitoring**: Consider adding a tool like Sentry to track exceptions and unhandled promise rejections in production.

## 5. Stripe (If monetizing)
- [ ] **Test Keys**: First integrate and test with Stripe test keys (`pk_test_...` and `sk_test_...`).
- [ ] **Webhooks**: Set up Stripe webhooks to listen for `checkout.session.completed` to provision accounts or update subscription statuses.
