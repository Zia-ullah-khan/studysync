"use client";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-12">
        <div className="mb-4 text-right text-xs text-gray-500 dark:text-gray-400">
          <span>Last updated: July 28, 2025 &nbsp;|&nbsp; Version 1.3<br />Effective date: July 28, 2025</span>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
        <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          <strong>Legal Entity:</strong> StudySync LLC, a Maryland limited-liability company.<br />
          <strong>Principal Place of Business:</strong> Montgomery County, Maryland, USA.<br />
          <strong>DMCA/Legal Notices Agent Address:</strong> PO Box 12345, San Francisco, CA 94101, USA.<br />
          <strong>Email:</strong> <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a>
        </div>
        <div className="mb-6 p-3 rounded bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-200" aria-label="Plain language summary">
          <strong>Summary for Everyone:</strong> These terms explain your rights and responsibilities when using StudySync. You must be old enough to use the service, agree to follow the rules, and understand how your content and data are handled. This page is screen-reader friendly. <a href="/terms-plain.pdf" className="underline" target="_blank" rel="noopener">Download a plain-language PDF</a>.
        </div>
        <h2 className="text-xl font-semibold mt-6 mb-2">Definitions</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li><strong>Services:</strong> The StudySync website, app, API, and all related features including audio recording, transcription, and AI-powered analysis tools.</li>
          <li><strong>User Content:</strong> Any content you upload, submit, or create using the Services (e.g., files, audio recordings, chat logs, flashcards, quizzes, transcriptions).</li>
          <li><strong>Audio Content:</strong> Any audio files, recordings, or voice data uploaded, recorded, or processed through our Services, including live recordings and real-time audio streams.</li>
          <li><strong>Transcription Data:</strong> Text generated from audio content through AI-powered transcription services, including interim transcripts, final transcripts, summaries, and related metadata.</li>
          <li><strong>StudySync Content:</strong> All content provided by StudySync, including AI-generated content, trademarks, and software.</li>
          <li><strong>We/Us/Our:</strong> StudySync, operated by Zia Ullah Khan.</li>
          <li><strong>You/User:</strong> Anyone who accesses or uses the Services.</li>
          <li><strong>AI Features:</strong> Automated tools and services, including Agent Mode commands, that use artificial intelligence to generate responses, recommendations, transcriptions, or analyze data.</li>
          <li><strong>Agent Mode:</strong> A command-driven AI interface for managing lectures, courses, assignments, and grades by retrieving data from connected services.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          You must be at least 13 years old (or 16 if required by your country) and have the legal authority to agree to these Terms. By using the Services, you represent that you meet these requirements.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">2. Acceptance of Terms</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          By accessing or using the Services, you agree to be bound by these Terms of Service and our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</Link>.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">3. User Accounts</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>You must provide accurate and complete information when creating an account.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You are responsible for all activities that occur under your account, including User Content.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">4. License to User Content</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          By submitting User Content (including audio recordings, transcriptions, and related data), you grant StudySync a worldwide, royalty-free, sublicensable, and transferable license to use, host, store, reproduce, modify, display, and distribute your User Content as necessary to provide and improve the Services. This includes processing audio through third-party transcription services and generating AI-powered summaries and insights. This license ends when you delete your User Content or account, except as required for legal compliance, dispute resolution, backup purposes, or ongoing service operations.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Acceptable Use</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>Do not use the Services for unlawful, harmful, or prohibited purposes.</li>
          <li>Do not attempt to access or use another user&apos;s data without permission.</li>
          <li>Do not upload, share, or use content you do not own or have permission to use.</li>
          <li>Do not use the Services or AI features to facilitate academic dishonesty.</li>
          <li>Do not upload or share content that is offensive, illegal, or infringes on intellectual property rights.</li>
          <li>Do not attempt to reverse engineer, disrupt, or misuse the Services or AI systems.</li>
          <li>Do not record audio without proper consent from all parties in jurisdictions where required.</li>
          <li>Do not record or transcribe content that violates privacy laws or contains confidential information without authorization.</li>
          <li>Do not use audio recording features to capture conversations, lectures, or meetings without appropriate permissions.</li>
          <li>Use Agent Mode responsibly; commands should only be run on data you own and with valid OAuth access. Do not attempt to retrieve or manipulate data belonging to others.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Agent Mode Usage</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          Agent Mode allows you to fetch and manage your academic data via secure OAuth connections to third-party platforms (e.g., Canvas). By using Agent Mode, you authorize StudySync to store and use your OAuth tokens to perform the requested actions on your behalf.
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li><strong>Token Management:</strong> You can revoke OAuth permissions at any time through your account settings or the third-party platform.</li>
          <li><strong>Command Logs:</strong> StudySync logs Agent Mode commands and responses for debugging and service improvement; logs can be deleted upon request.</li>
          <li><strong>Data Accuracy:</strong> StudySync is not liable for discrepancies or errors in data fetched from third-party services; verify critical information independently.</li>
          <li><strong>Security:</strong> OAuth tokens are encrypted and stored securely; we implement industry-standard security measures for data protection.</li>
          <li><strong>Rate Limiting:</strong> Agent Mode commands may be subject to rate limiting to prevent abuse and ensure service availability.</li>
          <li><strong>Service Availability:</strong> Agent Mode functionality depends on third-party API availability; we are not liable for third-party service outages.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Intellectual Property</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          StudySync Content is owned by StudySync or its licensors. You may not copy, modify, or distribute any part of the Services or StudySync Content without permission.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Third-Party Links & Content</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          The Services may contain links to third-party websites or resources. StudySync is not responsible for the content, privacy, or practices of any third-party sites or services.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">7A. Audio Recording, Storage, and Transcription Services</h2>
        <div className="mb-4 text-gray-700 dark:text-gray-200">
          <h3 className="text-lg font-medium mb-2">Recording Consent and Legal Compliance</h3>
          <ul className="list-disc list-inside mb-3 ml-4">
            <li>You are solely responsible for obtaining all necessary consents and permissions before recording any audio content, including but not limited to lectures, meetings, conversations, or any third-party content.</li>
            <li>You must comply with all applicable federal, state, and local laws regarding audio recording, including one-party and two-party consent laws in your jurisdiction.</li>
            <li>StudySync does not provide legal advice regarding recording consent requirements. Consult with legal counsel if you are unsure about applicable laws.</li>
            <li>You represent and warrant that all audio content you record, upload, or transcribe through our Services is lawfully obtained and does not violate any privacy rights, confidentiality agreements, or applicable laws.</li>
          </ul>
          
          <h3 className="text-lg font-medium mb-2">Audio Data Processing and Storage</h3>
          <ul className="list-disc list-inside mb-3 ml-4">
            <li>Audio files and recordings are temporarily stored on our servers for processing and transcription purposes.</li>
            <li>We use third-party AI services (including AssemblyAI) to process and transcribe your audio content. By using our audio services, you consent to this processing.</li>
            <li>Audio files may be retained for up to 30 days for quality assurance and service improvement, after which they are automatically deleted unless otherwise specified.</li>
            <li>Transcriptions and summaries generated from your audio may be stored longer as part of your account data and learning history.</li>
            <li>We implement industry-standard security measures to protect your audio data during transmission and storage.</li>
          </ul>
          
          <h3 className="text-lg font-medium mb-2">Real-Time Recording and Live Transcription</h3>
          <ul className="list-disc list-inside mb-3 ml-4">
            <li>Live transcription features process audio in real-time through secure WebSocket connections.</li>
            <li>Audio data transmitted during live sessions is processed immediately and not permanently stored unless you explicitly save the session.</li>
            <li>You acknowledge that real-time transcription accuracy may vary and should not be relied upon for critical or legal purposes without verification.</li>
            <li>Live recording sessions may be interrupted due to network connectivity, technical issues, or service maintenance.</li>
          </ul>
          
          <h3 className="text-lg font-medium mb-2">Content Restrictions</h3>
          <ul className="list-disc list-inside mb-3 ml-4">
            <li>Do not record or upload audio containing protected health information (PHI), financial information, or other sensitive personal data unless you have explicit authorization.</li>
            <li>Do not record copyrighted content, including but not limited to music, audiobooks, movies, or other protected media.</li>
            <li>Do not use our services to record content for commercial redistribution without proper licensing.</li>
            <li>We reserve the right to review, moderate, or remove audio content that violates these terms or applicable laws.</li>
          </ul>
          
          <h3 className="text-lg font-medium mb-2">Accuracy and Limitations</h3>
          <ul className="list-disc list-inside mb-3 ml-4">
            <li>Transcription services are provided &quot;as is&quot; and accuracy is not guaranteed. AI-generated transcriptions may contain errors, omissions, or misinterpretations.</li>
            <li>You should review and verify all transcriptions for accuracy before relying on them for academic, professional, or legal purposes.</li>
            <li>StudySync is not liable for any consequences arising from inaccurate transcriptions or missed audio content.</li>
            <li>Transcription quality may be affected by audio quality, background noise, accents, technical terminology, or other factors.</li>
          </ul>
          
          <h3 className="text-lg font-medium mb-2">User Responsibilities</h3>
          <ul className="list-disc list-inside mb-3 ml-4">
            <li>You are responsible for backing up important audio files and transcriptions before deletion or account termination.</li>
            <li>You must not attempt to identify individuals from voice patterns or use audio features for surveillance purposes.</li>
            <li>You agree to use audio features only for legitimate educational, professional, or personal purposes.</li>
            <li>You must promptly report any unauthorized access to your recordings or suspected security breaches.</li>
          </ul>
        </div>
        <h2 className="text-xl font-semibold mt-6 mb-2">8. Termination</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          We may suspend or terminate your account for violation of these Terms or harmful behavior. In most cases, you will receive notice and an opportunity to address the issue, except for severe or repeated violations. You may appeal by contacting support. The decision of StudySync is final.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">9. Survival</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          Sections regarding intellectual property, license grants, disclaimers, limitation of liability, indemnification, arbitration, governing law, and survival remain in effect after account termination.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">10. Disclaimer</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          The Services are provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy or reliability of any content, AI-generated responses, audio transcriptions, or real-time transcription services. Audio recording and transcription features may be affected by technical limitations, network connectivity, audio quality, background noise, or other factors beyond our control. You acknowledge that transcription accuracy may vary and should not be relied upon for critical, legal, or medical purposes without independent verification. Agent Mode functionality depends on third-party API availability and accuracy; we do not guarantee the completeness or accuracy of data retrieved from external platforms.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">11. Limitation of Liability</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          StudySync and its creators are not liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from your use of the Services, including loss of data, profits, or academic consequences.
        </p>
          <p className="mb-4 text-gray-700 dark:text-gray-200">
            With respect to Agent Mode, StudySync&apos;s liability is limited to assisting you in revoking access and correcting tokens; StudySync is not responsible for third-party platform outages or incorrect API responses.
          </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">12. Indemnification</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          You agree to indemnify and hold harmless StudySync and its affiliates from any claims, damages, or expenses arising from your use of the Services, your User Content, or your violation of these Terms.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">13. Changes to Terms</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          We may update these Terms at any time. We will notify users by email, in-app banner, or website notice at least 30 days before substantial changes take effect. If you do not agree to the new terms, you must stop using the Services before the effective date.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">14. Notices</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          Legal notices to you will be sent to your email on file or via in-app notification. Notices to StudySync must be sent to <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a> or by certified mail to 1234 Example Street, San Francisco, CA 94101, USA.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">15. DMCA Policy & Repeat Infringer Clause</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          If you believe your copyright is infringed, send a notice to our DMCA Agent at <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a> or by mail to PO Box 12345, San Francisco, CA 94101, USA. Repeat infringers&apos; accounts may be terminated.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">16. Dispute Resolution & Arbitration</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          If you have a dispute with StudySync, please contact us first so we can try to resolve it informally. If we cannot resolve the dispute, you and StudySync agree to resolve any claim, dispute, or controversy arising out of or relating to these Terms or the Services by binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules. The arbitration will take place in Montgomery County, Maryland, USA, unless both parties agree otherwise. Either party may bring an individual claim in small-claims court instead of arbitration. You may opt out of arbitration within 30 days of first accepting these Terms by emailing us at <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a> with your name and account email. Each party will bear its own legal fees and costs, except as otherwise required by law or the arbitrator. StudySync will pay all AAA filing and administration fees for claims up to $5000. You and StudySync agree to resolve disputes only on an individual basis, and not as a plaintiff or class member in any purported class or representative proceeding. The arbitrator may award any relief permitted by law, but may not consolidate claims or preside over any form of a representative or class proceeding.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">17. Governing Law</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          These Terms and any dispute or claim arising out of or in connection with them (including non-contractual disputes or claims) are governed by and construed in accordance with the laws of the State of Maryland, USA, without regard to its conflict of law principles. You agree that any legal action not subject to arbitration must be brought exclusively in the state or federal courts located in Maryland, and you consent to the jurisdiction and venue of those courts.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">18. Force Majeure</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          StudySync will not be liable for any failure or delay in performance of its obligations under these Terms due to events beyond its reasonable control, including but not limited to natural disasters, acts of God, war, terrorism, civil unrest, labor disputes, government actions, power outages, internet or telecommunications failures, or other events of force majeure. If such an event occurs, we will make reasonable efforts to notify you and to resume service as soon as possible.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">19. Export Control & Sanctions</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          You agree to comply with all applicable U.S. and international export control and sanctions laws and regulations. You may not use, export, re-export, import, or transfer the Services or any related technology except as authorized by U.S. law, the laws of the jurisdiction in which you obtained the Services, and any other applicable laws. You represent and warrant that you are not located in, under the control of, or a national or resident of any country or territory subject to U.S. embargoes or sanctions, and are not on any U.S. government restricted party list.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">20. Severability & Waiver</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court or arbitrator of competent jurisdiction, that provision will be enforced to the maximum extent permissible and the remaining provisions will remain in full force and effect. The failure of StudySync to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">21. User Data and Privacy Rights</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          StudySync collects, uses, and protects your personal data (including audio recordings and transcription data) as described in our <Link href="/privacy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</Link>. You have the right to access, correct, download, or delete your data, and to object to or restrict certain processing. This includes the right to delete audio recordings and associated transcriptions. Requests can be made through your account or by contacting us. We do not sell your personal information or audio content to third parties. Audio data may be processed by third-party AI services solely for transcription purposes as outlined in our Privacy Policy. For more details about your rights and how to exercise them, please review our Privacy Policy.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">22. API Terms of Service</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          If you access the StudySync API, you must comply with all API-specific terms, including payment of applicable fees, usage restrictions, and data handling requirements. API access is a paid service and may be suspended or terminated for violations. You may not store, cache, or redistribute data received from the API, and you must provide attribution to StudySync in your application. For full details, see the API documentation or contact us.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">23. Payment Processing & Payment Data Security</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          StudySync subscriptions and API access are billed through a secure third-party payment processor. We do not store or process your full payment card details on our servers. All payment information is handled in accordance with industry standards, including PCI DSS compliance. You are responsible for providing accurate payment information and for keeping it up to date. If a payment fails or your subscription cannot be renewed, your access to paid features may be suspended until payment is received.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">24. Assignment</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          StudySync may assign or transfer these Terms, in whole or in part, in connection with a merger, acquisition, sale of assets, or by operation of law. You may not assign or transfer your rights or obligations under these Terms without our prior written consent.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">25. Entire Agreement & Headings</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          These Terms (together with all linked policies) constitute the entire agreement between you and StudySync regarding the Services and supersede all prior agreements. Headings are for convenience only and do not affect interpretation.
        </p>
        <Footer />
      </div>
    </div>
  );
}
