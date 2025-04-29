import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          <strong>StudySync</strong> is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights regarding your information. We comply with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA) where applicable.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">What Data We Collect & Legal Basis</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>Your account information (name, email, user ID)</li>
          <li>Uploaded files and transcriptions</li>
          <li>Usage data (e.g., interactions with EduBot, SmartNotes, LearnSphere)</li>
        </ul>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          We collect your personal data on the basis of your consent, to fulfill our contractual obligations, and to provide and improve personalized services (GDPR Art. 6(1)(a), (b), (f)).
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>To provide and improve StudySync features</li>
          <li>To personalize your learning experience</li>
          <li>To generate AI-powered responses, flashcards, quizzes, and recommendations</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Data Retention</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Data is deleted upon user request or account deletion.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Data Sharing & International Transfers</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          We may share your data with trusted third parties (such as cloud storage providers, AI processing partners, or contractors) solely for the purposes of providing and improving our services. These third parties process data only in accordance with our instructions and under the terms of our agreements. If we transfer your data outside of the European Union, we ensure that appropriate safeguards are in place to protect your information.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Security</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          We use industry-standard encryption and security practices to safeguard your personal data against unauthorized access, disclosure, alteration, or destruction.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>Access, download, or delete your data at any time from the <Link href="/userdata" className="text-blue-600 dark:text-blue-400 underline">User Data</Link> page</li>
          <li>Right to rectify inaccurate data</li>
          <li>Right to restrict or object to processing of your data in certain situations</li>
          <li>Right to data portability (download your data in a machine-readable format)</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">CCPA: California Privacy Rights</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>We do <strong>not</strong> sell your personal information to third parties.</li>
          <li>California users have the right to request access to, or deletion of, their personal data.</li>
          <li>If you have questions or requests regarding your data, or wish to confirm that your data is not being sold, please visit our <Link href="/userdata" className="text-blue-600 dark:text-blue-400 underline">User Data</Link> page or contact us below.</li>
          <li><Link href="/donotsell" className="text-blue-600 dark:text-blue-400 underline">Do Not Sell My Info</Link></li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Accessing and Managing Your Data</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          You can view, download, or delete all your personal data at any time from the <Link href="/userdata" className="text-blue-600 dark:text-blue-400 underline">User Data</Link> page.
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>
            <strong>To access your data:</strong> Log in and visit the <Link href="/userdata" className="text-blue-600 dark:text-blue-400 underline">/userdata</Link> page. Here you can see all files, transcriptions, and account details stored for your account.
          </li>
          <li>
            <strong>To download your data:</strong> Click the <span className="font-semibold">Download All Data</span> button on the User Data page to receive a copy of your information in JSON format.
          </li>
          <li>
            <strong>To delete your data:</strong> Click the <span className="font-semibold">Delete All Data</span> button. This will permanently remove your files, transcriptions, and account from our system. You will be logged out after deletion.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Contact & Data Protection Officer</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-200">
          For privacy-related questions, please contact our Data Protection Officer at <a href="mailto:dpo@studysync.com" className="text-blue-600 dark:text-blue-400 underline">dpo@studysync.com</a> or <a href="mailto:support@studysync.com" className="text-blue-600 dark:text-blue-400 underline">support@studysync.com</a>.
        </p>
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 dark:text-blue-400 underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
