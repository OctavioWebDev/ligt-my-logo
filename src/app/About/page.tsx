import Link from 'next/link';
import PolicyPage from '@/components/PolicyPage';

export default function About() {
  return (
    <PolicyPage
      title="About AuraForm"
      todo={[
        'Write your story: who you are, why you started AuraForm, and where you are based.',
        'Describe how signs are made (materials, LED neon flex, warranty) once your supplier is set.',
      ]}
    >
      <p>AuraForm makes custom LED neon signs and lit logos for homes, events and businesses.</p>
      <p>
        <Link href="/design" className="text-purple-400 underline">Design a sign</Link> to see your price instantly, or{' '}
        <Link href="/logo" className="text-purple-400 underline">send us your logo</Link> for a free quote.
      </p>
    </PolicyPage>
  );
}
