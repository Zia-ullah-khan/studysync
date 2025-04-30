import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          <strong>StudySync</strong> is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights regarding your information. We comply with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA) where applicable.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          By creating an account and using StudySync, you consent to the practices described in this Privacy Policy.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">What Data We Collect & Legal Basis</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>Your account information (name, email, user ID)</li>
          <li>Uploaded files and transcriptions</li>
          <li>Usage data (e.g., interactions with EduBot, SmartNotes, LearnSphere)</li>
        </ul>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          We collect your personal data based on the following legal grounds under GDPR:
          <ul className="list-disc list-inside ml-4 mt-1">
            <li><strong>Consent (Art. 6(1)(a)):</strong> We rely on your consent when you sign up, upload content, and use specific features of StudySync.</li>
            <li><strong>Contractual Necessity (Art. 6(1)(b)):</strong> Processing your data is necessary to provide the StudySync services you requested and fulfill our obligations under the Terms of Service.</li>
            <li><strong>Legitimate Interests (Art. 6(1)(f)):</strong> We process data for legitimate interests such as improving the platform, ensuring security, conducting analytics, and preventing fraud, provided these interests do not override your fundamental rights and freedoms.</li>
          </ul>
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>To provide and improve StudySync features</li>
          <li>To personalize your learning experience</li>
          <li>To generate AI-powered responses, flashcards, quizzes, and recommendations</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Data Retention</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          We retain your personal data for as long as your account is active or as needed to provide you services. Data is deleted upon user request or account deletion. We may also delete data associated with accounts that have been inactive for more than 12 months, after providing notice to the user. <strong>Even after deletion or inactivity, some data may be retained in secure backup or archive systems for a limited period for disaster recovery purposes, but it will not be used for any other purpose.</strong> We retain data as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements, unless a longer retention period is required or permitted by law.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Data Sharing & International Transfers</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          We may share your data with trusted third parties (such as cloud storage providers, AI processing partners, or contractors) solely for the purposes of providing and improving our services. These third parties process data only in accordance with our instructions and under the terms of our agreements. Additionally, if you authorize third-party applications to access your StudySync data via our API, we will share the necessary data with them. StudySync takes measures to protect your data during these transfers and contractually prohibits API consumers from storing your data, as outlined in our <Link href="/tos#api-terms" className="text-blue-600 dark:text-blue-400 underline">API Terms of Service</Link>. <strong>However, you should always review the privacy policies of any third-party applications you authorize before granting access.</strong> If we transfer your data outside of the European Union or your local jurisdiction, we ensure that appropriate safeguards are in place to protect your information, such as using <strong>Standard Contractual Clauses (SCCs)</strong> or verifying the recipient's adherence to equivalent data protection frameworks.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Security</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          We use industry-standard security practices to safeguard your personal data against unauthorized access, disclosure, alteration, or destruction. This includes using <strong>Transport Layer Security (TLS) encryption</strong> for data transmission between your device and our servers, and <strong>Advanced Encryption Standard (AES) encryption</strong> for stored data where appropriate. We also conduct regular security assessments and may implement measures like multi-factor authentication to enhance account security.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-200">
          Under GDPR and CCPA, you have the following rights regarding your personal data:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>Access, download, or delete your data at any time from the <Link href="/userdata" className="text-blue-600 dark:text-blue-400 underline">User Data</Link> page</li>
          <li>Right to rectify inaccurate data</li>
          <li>Right to restrict or object to processing of your data in certain situations</li>
          <li>Right to data portability (download your data in a machine-readable format)</li>
        </ul>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          <strong>To exercise these rights, please visit the <Link href="/userdata" className="text-blue-600 dark:text-blue-400 underline">User Data page</Link> in your account settings or contact our Data Protection Officer at <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a>. We aim to respond to all verifiable requests within 30 days, or as required by applicable law.</strong>
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">CCPA: California Privacy Rights</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>We do <strong>not</strong> sell your personal information to third parties.</li>
          <li>California users have the right to request access to, or deletion of, their personal data.</li>
          <li>If you have questions or requests regarding your data, or wish to confirm that your data is not being sold, please visit our <Link href="/userdata" className="text-blue-600 dark:text-blue-400 underline">User Data</Link> page or contact us below.</li>
          <li><strong>Although we do not sell your personal information, California residents have the right to opt-out of the sale of their personal information. You can exercise this right by contacting us or visiting our [Do Not Sell My Personal Information page - Link to be added when page exists].</strong></li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Children's Privacy (COPPA)</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          StudySync is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information and terminate the child's account. If you believe we might have any information from or about a child under 13, please contact us.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Contact & Data Protection Officer</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-200">
          <strong>Our Data Protection Officer (DPO) is responsible for overseeing compliance with data protection laws.</strong> For privacy-related questions or to exercise your rights, please contact our DPO at <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a>.
        </p>
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 dark:text-blue-400 underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
