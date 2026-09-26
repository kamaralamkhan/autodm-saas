export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: July 2026</p>

      <section className="space-y-4">
        <p>
          This app (&quot;AutoDM Flow&quot;) is owned and operated by <strong>Kamar Alam Khan</strong>. The app uses the Instagram Graph API to help users manage
          their Instagram account, including posting reels, auto-replying to
          messages, and viewing analytics.
        </p>

        <h2 className="text-xl font-semibold mt-6">Data We Collect</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Instagram profile information (username, name, profile picture)</li>
          <li>Instagram content (media, captions, comments)</li>
          <li>Messages and conversations (for auto-reply features)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">How We Use Data</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>To post content to your Instagram account when you request it</li>
          <li>To send automated replies to messages and comments</li>
          <li>To display analytics about your account performance</li>
          <li>We do <strong>not</strong> sell your data to third parties</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Data Storage</h2>
        <p>
          Your Instagram access tokens and profile data are stored securely in
          our database (Supabase). You can disconnect your account at any time,
          which will remove the stored tokens.
        </p>

        <h2 className="text-xl font-semibold mt-6" id="data-deletion">Data Deletion Instructions</h2>
        <p>
          According to the Facebook Platform rules, we have to provide User Data Deletion Callback URL or Data Deletion Instructions URL. If you want to delete your activities for AutoDM Flow, you can remove your information by following these steps:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Go to your Facebook Account's "Settings & Privacy". Click "Settings".</li>
          <li>Look for "Apps and Websites" and you will see all of the apps and websites you linked with your Facebook.</li>
          <li>Search and click "AutoDM Flow".</li>
          <li>Scroll and click "Remove".</li>
        </ol>
        <p className="mt-2">
          Congratulations, you have successfully removed your app activities and deleted all your data from our servers.
        </p>

        <h2 className="text-xl font-semibold mt-6">Contact</h2>
        <p>
          For any questions, please reach out via the app dashboard or email at khankamaralam@gmail.com.
        </p>
      </section>
    </div>
  )
}
