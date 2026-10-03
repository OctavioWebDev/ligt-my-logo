import PolicyPage from '@/components/PolicyPage';

export default function PrivacyPolicy() {
  return (
    <PolicyPage title="Privacy Policy" todo={['Have this policy reviewed for your business and add an effective date.']}>
      <h2 className="text-xl font-semibold text-white">What we collect</h2>
      <p>When you request a quote we collect your name, email address, optional phone number and notes, your sign design (including a preview image) or the logo file you upload, and your marketing and SMS preferences.</p>
      <p>To prevent spam we store a one-way hash of your IP address, not the address itself.</p>
      <h2 className="text-xl font-semibold text-white">How we use it</h2>
      <p>We use this information only to prepare and send your quote, fulfill your order, and contact you about it. If you opt in, we may also send occasional promotions. We do not sell your information.</p>
      <h2 className="text-xl font-semibold text-white">Who processes it</h2>
      <p>Our website is hosted by Vercel. Requests are stored in a Neon database, uploaded files in Vercel Blob storage, and emails are sent through Resend.</p>
      <h2 className="text-xl font-semibold text-white">Your choices</h2>
      <p>Email us to see, correct or delete the information we hold about you.</p>
    </PolicyPage>
  );
}
