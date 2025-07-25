"use client";
import { useState } from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
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
            {isPirate ? "Show Original Policy" : "Show Pirate Policy"}
          </button>
        </div>
        {isPirate ? (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center">Pirate&apos;s Code o&apos; Privacy</h1>
            <p className="text-center italic text-lg mb-6 text-gray-600 dark:text-gray-400">
              &quot;Yer data be safe with us, or we&apos;ll be feedin&apos; it to the sharks!&quot; - Cap&apos;n Zia
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              <strong>StudySync</strong> swears on the Jolly Roger to guard yer secrets. This here code explains what booty we collect, how we use it, and yer rights as a loyal matey. We follow the laws o&apos; the GDPR and CCPA, so ye can rest easy.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              By signin&apos; aboard StudySync, ye agree to these here practices. Arrr!
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">What Booty We Collect</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
              <li>Yer name, email, and user ID</li>
              <li>Files ye upload and their transcriptions</li>
              <li>Yer voice recordings and the words we hear in &apos;em (transcribed by our AI parrot)</li>
              <li>Yer interactions with our AI crew, like EduBot and SmartNotes</li>
              <li>Yer chat logs, flashcards, quizzes, and scores</li>
              <li>AI-generated recommendations and progress reports</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Yer Booty</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
              <li>To make StudySync shipshape and improve yer experience</li>
              <li>To turn yer voice into text with our magical AI scribes</li>
              <li>To craft AI-powered responses, quizzes, and recommendations</li>
              <li>To keep the ship&apos;s systems runnin&apos; smooth and secure</li>
              <li>We share yer voice with trusted AI shipmates (like AssemblyAI) to do the transcribin&apos;</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">Yer Rights as a Matey</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
              <li>Ye can ask to see, download, or delete yer data anytime (including yer voice recordings and transcripts)</li>
              <li>Ye can correct any wrong info we have on ye (even fix what our AI parrot heard wrong)</li>
              <li>Ye can object to how we use yer data, if ye have a good reason</li>
              <li>Ye can take yer data and sail to another service</li>
              <li>Ye can tell us to stop recordin&apos; yer voice anytime ye want</li>
              <li>Yer audio treasure gets thrown overboard after 30 days, but the transcribed words stay in yer treasure chest until ye delete &apos;em</li>
            </ul>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              If ye have any questions, send a message in a bottle to{" "}
              <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">
                khansokan1234@gmail.com
              </a>.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-4 text-right text-xs text-gray-500 dark:text-gray-400">
              <span>Last updated: July 22, 2025 &nbsp;|&nbsp; Version 1.2</span>
            </div>
            <div className="mb-6 p-3 rounded bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-200">
              <strong>Summary for Everyone:</strong> We collect only what we need to run StudySync (including voice recordings for transcription), keep your data safe, and let you control it. Audio files are automatically deleted after 30 days, but transcriptions are kept until you delete them. You can always see, download, or delete your data. We don&apos;t sell your info. If you have questions, email us. This page is screen-reader friendly.
            </div>
            <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
            <h2 className="text-xl font-semibold mt-6 mb-2">Definitions</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
              <li><strong>Personal Data:</strong> Any information relating to an identified or identifiable individual (e.g., name, email, user ID, voice recordings).</li>
              <li><strong>Audio Data:</strong> Voice recordings, audio files, and related metadata collected through our recording and transcription services.</li>
              <li><strong>Transcription Data:</strong> Text generated from audio content, including interim transcripts, final transcripts, summaries, and AI-generated insights.</li>
              <li><strong>Processing:</strong> Any operation performed on personal data, such as collection, storage, use, transcription, or deletion.</li>
              <li><strong>Third Party:</strong> Any organization or person other than StudySync and the user.</li>
              <li><strong>AI Features:</strong> Automated tools and services that use artificial intelligence to generate responses, recommendations, transcriptions, or analyze data.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">Who We Are</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              <strong>StudySync</strong> is operated by Zia Ullah Khan, Rockville, MD 20852, USA. Email: <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a>
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              <strong>StudySync</strong> is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights regarding your information. We comply with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA) where applicable.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              By creating an account and using StudySync, you consent to the practices described in this Privacy Policy.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Cookies & Tracking Technologies</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              StudySync uses cookies and similar technologies (such as local storage, analytics SDKs, and pixels) to operate the platform, remember your preferences, and analyze usage. You can control cookies through your browser settings. For more details, see our <Link href="/cookie-policy" className="text-blue-600 dark:text-blue-400 underline">Cookie Policy</Link> (coming soon).
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Audio Data Collection and Processing</h2>
            <div className="mb-4 text-gray-700 dark:text-gray-200">
              <h3 className="text-lg font-medium mb-2">What Audio Data We Collect</h3>
              <ul className="list-disc list-inside mb-3 ml-4">
                <li><strong>Audio Recordings:</strong> Voice recordings from file uploads, live recording sessions, and real-time transcription sessions</li>
                <li><strong>Audio Metadata:</strong> File size, duration, recording quality, timestamp, and session information</li>
                <li><strong>Transcription Data:</strong> AI-generated text transcripts, confidence scores, speaker identification (when applicable), and processing timestamps</li>
                <li><strong>Usage Analytics:</strong> Recording session duration, feature usage patterns, error logs, and performance metrics</li>
              </ul>
              
              <h3 className="text-lg font-medium mb-2">How We Process Audio Data</h3>
              <ul className="list-disc list-inside mb-3 ml-4">
                <li><strong>Real-Time Processing:</strong> Live audio streams are processed through secure WebSocket connections for immediate transcription</li>
                <li><strong>Third-Party AI Services:</strong> We use AssemblyAI and other AI services to transcribe audio content and generate summaries</li>
                <li><strong>Temporary Storage:</strong> Audio files are temporarily stored on our servers for processing, typically for up to 30 days</li>
                <li><strong>Transcription Generation:</strong> Audio is converted to text using AI services, with transcripts stored as part of your account data</li>
                <li><strong>Quality Enhancement:</strong> We may process audio to improve transcription accuracy (noise reduction, normalization)</li>
              </ul>
              
              <h3 className="text-lg font-medium mb-2">Audio Data Security</h3>
              <ul className="list-disc list-inside mb-3 ml-4">
                <li><strong>Encryption:</strong> Audio data is encrypted in transit using TLS/SSL and at rest using industry-standard encryption</li>
                <li><strong>Access Controls:</strong> Strict access controls limit who can access audio data to authorized personnel only</li>
                <li><strong>Secure Transmission:</strong> Real-time audio streams use secure WebSocket connections with authentication</li>
                <li><strong>Data Minimization:</strong> We collect only the audio data necessary for transcription and service functionality</li>
              </ul>
              
              <h3 className="text-lg font-medium mb-2">Audio Data Retention</h3>
              <ul className="list-disc list-inside mb-3 ml-4">
                <li><strong>Audio Files:</strong> Original audio files are automatically deleted after 30 days unless explicitly saved by you</li>
                <li><strong>Transcriptions:</strong> Text transcripts are retained as part of your account data until you delete them or close your account</li>
                <li><strong>Live Session Data:</strong> Real-time transcription data is processed immediately and not permanently stored unless you save the session</li>
                <li><strong>Backup Data:</strong> Audio data in backups is retained for up to 30 days for disaster recovery purposes</li>
              </ul>
              
              <h3 className="text-lg font-medium mb-2">Your Rights Regarding Audio Data</h3>
              <ul className="list-disc list-inside mb-3 ml-4">
                <li><strong>Access:</strong> You can access all your audio transcriptions and metadata through your account dashboard</li>
                <li><strong>Download:</strong> You can download your transcription data in machine-readable formats</li>
                <li><strong>Deletion:</strong> You can delete individual audio files, transcriptions, or all audio-related data at any time</li>
                <li><strong>Correction:</strong> You can edit and correct transcription text to improve accuracy</li>
                <li><strong>Opt-Out:</strong> You can choose not to use audio features while still accessing other StudySync services</li>
              </ul>
            </div>
            <h2 className="text-xl font-semibold mt-6 mb-2">CCPA/CPRA Data Disclosure Table</h2>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full text-xs border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Source</th>
                    <th className="p-2 border">Purpose</th>
                    <th className="p-2 border">Disclosure</th>
                    <th className="p-2 border">Retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Identifiers (name, email, user ID)</td>
                    <td className="p-2 border">User</td>
                    <td className="p-2 border">Account creation, login, support</td>
                    <td className="p-2 border">Service providers</td>
                    <td className="p-2 border">Until account deletion or 12 months inactivity</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Audio Recordings & Voice Data</td>
                    <td className="p-2 border">User</td>
                    <td className="p-2 border">Transcription, AI analysis, service features</td>
                    <td className="p-2 border">AI transcription services (AssemblyAI)</td>
                    <td className="p-2 border">30 days (audio files), until deletion (transcripts)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Transcription & AI-Generated Content</td>
                    <td className="p-2 border">User, AI processing</td>
                    <td className="p-2 border">Learning features, content analysis</td>
                    <td className="p-2 border">None (unless user shares)</td>
                    <td className="p-2 border">Until user deletes or account deletion</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Usage Data (logs, interactions)</td>
                    <td className="p-2 border">User, system</td>
                    <td className="p-2 border">Improve service, analytics</td>
                    <td className="p-2 border">Analytics providers</td>
                    <td className="p-2 border">12 months</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Uploaded Files</td>
                    <td className="p-2 border">User</td>
                    <td className="p-2 border">Learning features</td>
                    <td className="p-2 border">None (unless user shares)</td>
                    <td className="p-2 border">Until user deletes or account deletion</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Payment Data</td>
                    <td className="p-2 border">User</td>
                    <td className="p-2 border">Subscription processing</td>
                    <td className="p-2 border">Payment processor</td>
                    <td className="p-2 border">Not stored by StudySync</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">AI-Generated Content</td>
                    <td className="p-2 border">User, AI</td>
                    <td className="p-2 border">Learning features</td>
                    <td className="p-2 border">None</td>
                    <td className="p-2 border">Until user deletes or account deletion</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h2 className="text-xl font-semibold mt-6 mb-2">Data Retention Schedule</h2>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
              <li>Account data: Deleted upon user request or after 12 months of inactivity.</li>
              <li>Audio recordings: Automatically deleted after 30 days unless explicitly saved by user.</li>
              <li>Transcription data: Retained until user deletion or account closure.</li>
              <li>Live transcription sessions: Not permanently stored unless user saves the session.</li>
              <li>Uploaded files, chat logs, flashcards, quizzes: Deleted when you delete them or your account.</li>
              <li>Analytics data: Retained for up to 12 months.</li>
              <li>Payment data: Not stored by StudySync; see payment processor policy.</li>
              <li>Backups (including audio data): Retained for up to 30 days for disaster recovery.</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">International Data Transfers</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              If your data is transferred outside your country (e.g., to the US), we use Standard Contractual Clauses (SCCs), the UK International Data Transfer Agreement (IDTA), or the EU-U.S. Data Privacy Framework (DPF) as appropriate to protect your rights.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Subprocessors</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              We use trusted third-party service providers (subprocessors) for hosting, analytics, payment processing, and AI services including audio transcription. Key subprocessors include AssemblyAI (for audio transcription), cloud hosting providers, and payment processors. A current list is available upon request and will be published at <Link href="/subprocessors" className="text-blue-600 dark:text-blue-400 underline">/subprocessors</Link> (coming soon).
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Automated Decision-Making & Profiling</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              StudySync&apos;s AI features may provide recommendations, generate content, or transcribe audio, but do not make decisions that have legal or similarly significant effects on users. Audio transcription is performed by AI services to convert speech to text, but does not involve profiling or automated decision-making about individuals. No fully automated decisions are made regarding your rights or access. If this changes, we will update this policy and explain the logic and consequences.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Data Protection Impact Assessments</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              We conduct Data Protection Impact Assessments (DPIAs) for new features that may affect your privacy, especially those involving AI, audio processing, voice recordings, or sensitive data. Audio recording and transcription features have been assessed for privacy risks and appropriate safeguards have been implemented.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Breach Notification</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              If we become aware of a data breach affecting your personal data, we will notify you without undue delay and, where required, within 72 hours, in accordance with applicable law.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Supervisory Authority & Complaints</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              If you are in the EU or UK, you have the right to lodge a complaint with your local Data Protection Authority. Our lead authority is the Irish Data Protection Commission, 21 Fitzwilliam Square South, Dublin 2, D02 RD28, Ireland (<a href="https://www.dataprotection.ie/" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">dataprotection.ie</a>).
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
            <p className="mb-2 text-gray-700 dark:text-gray-200">
              Under GDPR and CCPA, you have the following rights regarding your personal data, including chat sessions, flashcards, quizzes, quiz scores, audio recordings, transcriptions, and recommendations:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
              <li>Access, download, or delete your data (including chat history, flashcards, quizzes, quiz scores, audio recordings, transcriptions, and recommendations) at any time from the <Link href="/userdata" className="text-blue-600 dark:text-blue-400 underline">User Data</Link> page or via available API endpoints</li>
              <li>Right to rectify inaccurate data (including correcting transcription errors)</li>
              <li>Right to restrict or object to processing of your data in certain situations</li>
              <li>Right to data portability (download your data including transcriptions in a machine-readable format)</li>
              <li>Right to withdraw consent for audio recording and processing at any time</li>
              <li>Right to opt-out of audio features while continuing to use other StudySync services</li>
            </ul>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
              <li>We do <strong>not</strong> sell your personal information to third parties.</li>
              <li>California users have the right to request access to, or deletion of, their personal data.</li>
              <li>If you have questions or requests regarding your data, or wish to confirm that your data is not being sold, please visit our <Link href="/userdata" className="text-blue-600 dark:text-blue-400 underline">User Data</Link> page or contact us below. <strong>To submit a verifiable request under the CCPA, please use these channels. To verify your identity, we may ask for additional information, such as account details or confirmation via your registered email address, before processing your request.</strong></li>
              <li><strong>Although we do not sell your personal information, California residents have the right to opt-out of the sale of their personal information. You can exercise this right by contacting us or visiting our [Do Not Sell My Personal Information page - Link to be added when page exists].</strong></li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-2">Children&apos;s Privacy (COPPA)</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-200">
              StudySync is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information and terminate the child&apos;s account. <strong>If you believe we might have any information from or about a child under 13, please contact us immediately at <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a>, and we will delete the information as required.</strong>
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-2">Contact & Data Protection Officer</h2>
            <p className="mb-2 text-gray-700 dark:text-gray-200">
              <strong>Our Data Protection Officer (DPO) is responsible for overseeing compliance with data protection laws.</strong> For privacy-related questions or to exercise your rights, please contact our DPO at <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a>.
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
