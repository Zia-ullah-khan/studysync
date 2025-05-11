"use client";
import { useState } from "react";
import Link from "next/link";

export default function TermsOfService() {
  const [isPirate, setIsPirate] = useState(false);

  const togglePirateMode = () => {
    setIsPirate(!isPirate);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-12">
        <div className="flex justify-end mb-4">
          <button
            onClick={togglePirateMode}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500"
          >
            {isPirate ? "Show Original TOS" : "Show Pirate TOS"}
          </button>
        </div>
        {isPirate ? (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Terms o&apos; Service</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Ahoy, matey! By usin&apos; StudySync, ye be agreein&apos; to these here terms. Read &apos;em well, or walk the plank!
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance o&apos; Terms</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              By boardin&apos; StudySync, ye swear on yer honor to abide by these Terms o&apos; Service and our{" "}
              <Link href="/privacy" className="text-blue-600 dark:text-blue-400 underline">
                Privacy Policy
              </Link>.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
              <li>Ye must provide true and honest details when creatin&apos; yer account, or face the wrath o&apos; Davy Jones.</li>
              <li>Guard yer account credentials like treasure, fer they be yer responsibility.</li>
              <li>All actions under yer account be on yer head, includin&apos; yer chat logs, flashcards, and quiz answers.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">3. Acceptable Use</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
              <li>Do not use StudySync fer any scallywaggin&apos; or unlawful deeds.</li>
              <li>Do not plunder another user&apos;s data without permission, lest ye be cursed.</li>
              <li>Do not upload or share stolen booty, includin&apos; copyrighted materials or lecture notes.</li>
              <li>Do not use StudySync to cheat on yer exams or assignments, ye landlubber!</li>
              <li>Do not share content that be offensive, illegal, or infringin&apos; on intellectual property rights.</li>
              <li>Do not attempt to reverse-engineer or sabotage the platform, or ye&apos;ll be keelhauled.</li>
            </ul>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Welcome to StudySync! By using our platform, you agree to the following terms and conditions. Please read them carefully.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              By accessing or using StudySync, you agree to be bound by these Terms of Service and our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</Link>.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You are responsible for all activities that occur under your account, including the content of your chat sessions, flashcards, quizzes, and quiz answers.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">3. Acceptable Use</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
              <li>Do not use StudySync for any unlawful or prohibited purpose.</li>
              <li>Do not attempt to access or use another user&apos;s data without permission.</li>
              <li>Do not upload, share, or use content that you do not own or do not have permission to use, including copyrighted materials, lecture notes, or videos.</li>
              <li>Do not use StudySync or its AI features to facilitate or engage in academic dishonesty, including but not limited to generating answers for exams, assignments, or assessments meant to be completed individually.</li>
              <li>Do not upload or share content that is offensive, illegal, or infringes on intellectual property rights.</li>
              <li>Do not attempt to reverse engineer, disrupt, or misuse the platform or its AI systems.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">4. Intellectual Property</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              All content, trademarks, and intellectual property on StudySync belong to their respective owners. You may not copy, modify, or distribute any part of the platform without permission.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">5. Termination</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              We reserve the right to suspend or terminate your account if you violate these terms or engage in harmful behavior. In most cases, we will provide a warning and an opportunity to address the issue before termination, except in cases of severe or repeated violations. You may appeal a termination by contacting support. The decision of StudySync is final.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">5A. Protection from Unlawful or Unfair Termination</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              StudySync is committed to fair and lawful treatment of all users. Accounts will not be suspended or terminated without valid reason and due process. Users will be notified of the reason for any suspension or termination and will have a reasonable time frame (e.g., 14 days) to appeal or address the issue, except in cases of severe or repeated violations or where required by law. We do not terminate or suspend accounts for arbitrary, discriminatory, or retaliatory reasons.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">6. Disclaimer</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              StudySync is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy or reliability of any content or AI-generated responses.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">7. Limitation of Liability</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              StudySync and its creators are not liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from your use of the platform, including but not limited to loss of data, loss of profits, or academic consequences. While we strive for accuracy, AI-generated content may contain errors or omissions. You are solely responsible for verifying the accuracy and appropriateness of any content before relying on it for academic or other purposes.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to Terms</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              We may update these Terms of Service at any time. We will notify users at least 30 days prior to any substantial changes. Continued use of StudySync after changes means you accept the new terms.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact</h2>
            <p className="mb-2 text-gray-700 dark:text-gray-200">
              For questions about these terms, contact us at <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a>.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">10. Academic Integrity</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              StudySync does <strong>not</strong> condone cheating or any form of academic dishonesty. Our platform is intended to support learning and study, not to facilitate violations of academic policies. Users are strictly prohibited from using StudySync to generate answers for exams, assignments, or assessments that are meant to be completed individually. StudySync is a learning aid and is not intended to replace students&apos; academic work. Users are solely responsible for ensuring their use of StudySync complies with the academic integrity policies of their educational institution. Any consequences resulting from misuse are the responsibility of the user, not StudySync.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">11. User Responsibility for AI Actions</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Any actions, outputs, or recommendations provided by StudySync&apos;s AI are always the responsibility of the user supervising the AI. <strong>Users must review and use AI-generated content appropriately</strong> and in accordance with their own judgment and institutional policies. You are required to review all AI-generated content before submitting or using it in any formal academic context, and to understand the limitations of AI, especially in legal, medical, or other professional areas. StudySync is not liable for any consequences resulting from the use or misuse of AI-generated content.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">12. Copyright and AI-Generated Content</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Under the regulations of the U.S. Copyright Office and the &quot;Report on Copyright and Artificial Intelligence,&quot; any work generated entirely by AI, without meaningful human creative input, is <strong>not eligible for copyright protection</strong> in the United States. Copyright law requires human authorship. If you use StudySync to generate content, you are responsible for ensuring that your use and any claims of authorship comply with these regulations and the applicable copyright laws of your jurisdiction. Merely providing prompts to the AI does not make you the legal author of the output. Only human contributions—such as creative selection, arrangement, or significant modification—may be eligible for copyright. Users must not use StudySync to infringe on the intellectual property rights of others.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">13. Dispute Resolution and Governing Law</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              Any disputes arising from or relating to these Terms of Service or your use of StudySync will be resolved through binding arbitration, except where prohibited by law. These Terms are governed by the laws of the State of California, United States, without regard to its conflict of law principles.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">14. User Data and Privacy Rights</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              StudySync stores your user data, including chat sessions, flashcard sets, quizzes, quiz scores, and AI-generated recommendations and progress, as part of your account. You may access, download, or delete these data types at any time from the User Data page or via available API endpoints. Deletion requests will remove these records as well as your account information, subject to our data retention policy. Please review our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</Link> for details on how we collect, use, and protect your data, and your rights under applicable privacy laws (such as GDPR and CCPA).
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">15. API Terms of Service</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              The following terms apply specifically to your use of the StudySync Application Programming Interface (API), if you choose to access it. Access to the API is a paid service, separate from the free use of the main StudySync application. The API provides endpoints to manage chat sessions, flashcard sets, quizzes, quiz scores, and recommendations, in addition to other user data.
            </p>
            <ul className="list-disc space-y-3 pl-5 mb-4 text-gray-700 dark:text-gray-200">
              <li>
                <strong>License Grant:</strong> Subject to your compliance with these Terms and payment of applicable fees, StudySync grants you a limited, non-exclusive, non-transferable, revocable license to access and use the API solely for your internal development purposes to integrate with your applications or services. <strong>You acknowledge that StudySync retains full ownership of the API, including any modifications, improvements, or derivative works, and no rights are transferred to you except for the limited, non-exclusive, non-transferable, revocable license granted herein.</strong>
              </li>
              <li>
                <strong>Fees and Payment:</strong> Access to the API requires payment of subscription fees as detailed on our API pricing page (link to be provided). <strong>Payment is billed [monthly/annually], with the first payment due upon registration. If a trial period is available, users will be notified prior to the end of the trial, and charges will apply unless cancelled.</strong> Fees are non-refundable except as required by law.
              </li>
              <li>
                <strong>Usage Restrictions:</strong> You agree not to:
                <ul className="list-disc space-y-1 pl-5 mt-2">
                  <li>Exceed specified rate limits or usage quotas.</li>
                  <li>Use the API for any illegal, harmful, or fraudulent activities.</li>
                  <li>Attempt to circumvent security measures or access controls.</li>
                  <li>Resell, sublicense, or redistribute the API or access credentials.</li>
                  <li>Use the API in a manner that competes directly with StudySync or negatively impacts the performance or availability of the platform for other users.</li>
                  <li>Use the API to train other AI models without explicit written permission.</li>
                  <li><strong>Use the API for mass data collection, scraping, spamming, or any activity that could overload the system or negatively impact StudySync’s performance for other users.</strong></li>
                </ul>
              </li>
              <li>
                <strong>Data Handling:</strong> You are responsible for securing any data obtained through the API and complying with all applicable privacy laws regarding that data. StudySync is not responsible for data once it leaves our systems via the API. <strong>Absolutely no data received from the StudySync API may be stored by the consuming application or service. This includes caching, logging, or any form of persistent or temporary storage. Violation of this policy will result in immediate termination of API access. This is a strict, no-workaround policy. Violation may result in immediate suspension or termination of your API access, and you may be held liable for any damages caused by the unlawful storage or handling of data. You agree to indemnify StudySync for any losses or damages resulting from such violations.</strong>
              </li>
              <li>
                <strong>API Changes and Availability:</strong> StudySync reserves the right to modify, suspend, or discontinue the API (or any part thereof) with reasonable notice. <strong>StudySync will provide reasonable notice of significant changes, discontinuations, or service disruptions via email or through the API documentation. However, we do not guarantee uninterrupted service and may need to perform maintenance or updates that temporarily affect availability.</strong> We will strive to maintain API stability but do not guarantee uninterrupted availability.
              </li>
              <li>
                <strong>API Termination:</strong> We may terminate or suspend your API access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these API Terms. <strong>If your API access is suspended or terminated, you will be notified of the reason via email. In most cases, you will be given a reasonable period to resolve the issue. If termination is due to a breach, you may appeal the decision by contacting support, except in cases of severe or repeated violations where termination may be immediate and final.</strong>
              </li>
              <li>
                <strong>Support:</strong> API support levels, if any, will be specified in your subscription plan. <strong>API support is available based on your subscription level. [Details about support tiers, response times, and contact methods will be provided in the API documentation or your subscription agreement.]</strong>
              </li>
              <li>
                <strong>Pre-Release Notification and Audit Rights:</strong> If your application or service utilizing the StudySync API is intended for public release, you must inform StudySync in writing at least 60 days prior to the planned release date. <strong>By using the API, you grant StudySync the right to conduct periodic security audits</strong> of your application&apos;s integration with the API to ensure it meets our security standards and complies with these terms, particularly regarding data handling and storage prohibitions. Public release is contingent upon successful completion and approval following the initial pre-release audit. Failure to notify StudySync, pass any required audit, or cooperate with audit requests may result in suspension or termination of your API access.
              </li>
              <li>
                <strong>Attribution:</strong> Any application or service that utilizes the StudySync API must provide clear and conspicuous attribution to StudySync. This includes displaying the StudySync name or logo (as provided by StudySync) in locations where StudySync data or functionality is presented to the end-user. The specific placement and format of the attribution must be reasonable and may be subject to guidelines provided by StudySync.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">16. Payment Processing & Payment Data Security</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              StudySync subscriptions are billed through a secure third-party payment processor. <strong>We do not store or process your full payment card details on our servers.</strong> All payment information is handled in accordance with industry standards, including PCI DSS compliance. By subscribing, you agree to provide accurate and complete payment information and authorize our payment processor to charge your selected payment method for the applicable subscription fees. You are responsible for keeping your payment information up to date. If a payment fails or your subscription cannot be renewed, your access to paid features may be suspended until payment is received.
            </p>

            <div className="mt-8 text-center">
              <Link href="/" className="text-blue-600 dark:text-blue-400 underline">Back to Home</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
