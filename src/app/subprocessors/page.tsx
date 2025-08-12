"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
export default function Subprocessors() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-12">
        <div className="mb-4 text-right text-xs text-gray-500 dark:text-gray-400">
          <span>Last updated: July 28, 2025 &nbsp;|&nbsp; Version 1.1<br />Effective date: July 28, 2025</span>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Subprocessors</h1>
        <div className="mb-6 p-3 rounded bg-blue-50 dark:bg-blue-900 text-blue-900 dark:text-blue-200" aria-label="Summary">
          <strong>Summary:</strong> This page lists all third-party service providers (subprocessors) that StudySync uses to deliver our services. We carefully select trusted partners who meet our security and privacy standards.
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">What Are Subprocessors?</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          Subprocessors are third-party service providers that process personal data on behalf of StudySync to help us deliver our services. We maintain strict contractual agreements with all subprocessors to ensure your data is protected according to our privacy standards and applicable data protection laws.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">How We Select Subprocessors</h2>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>Security and privacy assessments</li>
          <li>Compliance with GDPR, CCPA, and other applicable regulations</li>
          <li>Data processing agreements (DPAs) with appropriate safeguards</li>
          <li>Regular security audits and monitoring</li>
          <li>Contractual requirements for data protection and deletion</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Current Subprocessors</h2>
        
        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">AI and Transcription Services</h3>
            
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className="font-medium">AssemblyAI</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">Audio Transcription</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Purpose:</strong> Real-time and batch audio transcription, speech-to-text conversion, audio analysis
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Data Processed:</strong> Audio recordings, voice data, transcription metadata
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Location:</strong> United States
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Website:</strong> <a href="https://www.assemblyai.com" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">assemblyai.com</a>
              </p>
            </div>

            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className="font-medium">OpenAI</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">AI Content Generation</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Purpose:</strong> Chat responses, content generation, educational AI features, text analysis
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Data Processed:</strong> User queries, chat messages, educational content
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Location:</strong> United States
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Website:</strong> <a href="https://openai.com" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">openai.com</a>
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-green-600 dark:text-green-400">Hosting and Infrastructure</h3>
            
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className="font-medium">Render</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">Backend Hosting</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Purpose:</strong> API hosting, server infrastructure, backend services
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Data Processed:</strong> All user data, application logs, system metadata
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Location:</strong> United States
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Website:</strong> <a href="https://render.com" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">render.com</a>
              </p>
            </div>

            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className="font-medium">Vercel</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">Frontend Hosting</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Purpose:</strong> Frontend application hosting, CDN services, static site delivery
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Data Processed:</strong> User interactions, page analytics, session data
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Location:</strong> United States, Global CDN
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Website:</strong> <a href="https://vercel.com" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">vercel.com</a>
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-purple-600 dark:text-purple-400">Database and Storage</h3>
            
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className="font-medium">MongoDB Atlas</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">Database Services</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Purpose:</strong> Primary database storage, user data management, application data
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Data Processed:</strong> User profiles, chat history, transcriptions, flashcards, quiz data
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Location:</strong> United States (configurable regions)
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Website:</strong> <a href="https://www.mongodb.com/atlas" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">mongodb.com/atlas</a>
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-orange-600 dark:text-orange-400">Payment Processing</h3>

            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className="font-medium">PayPal</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">Alternative Payment Gateway</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Purpose:</strong> Alternative payment processing, subscription management
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Data Processed:</strong> Payment information, PayPal account details
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Location:</strong> United States, Global
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Website:</strong> <a href="https://paypal.com" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">paypal.com</a>
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">Analytics and Monitoring</h3>
            
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className="font-medium">Vercel Analytics</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">Web Analytics</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Purpose:</strong> Website usage analytics, user behavior analysis, performance monitoring
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Data Processed:</strong> Anonymized usage data, page views, user interactions
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Location:</strong> United States, Global
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Website:</strong> <a href="https://vercel.com/analytics" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">vercel.com/analytics</a>
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-indigo-600 dark:text-indigo-400">Communication Services</h3>
            
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className="font-medium">Nodemailer</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">Email Services</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Purpose:</strong> Automated transactional emails including payment confirmations, payment renewals, account signup notifications, data deletion confirmations, and data download notifications
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Data Processed:</strong> Email addresses, user names, payment confirmation details, account status information, data request confirmations
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Location:</strong> Global (library-based email service)
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Website:</strong> <a href="https://nodemailer.com" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">nodemailer.com</a>
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-teal-600 dark:text-teal-400">Canvas</h3>
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                <h4 className="font-medium">Canvas LMS</h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">Educational Platform API</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Purpose:</strong> Retrieve courses, assignments, grades, and assignment details to power features including Agent Mode.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Data Processed:</strong> Course listings, assignment metadata, due dates, grades, user identifiers.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                <strong>Location:</strong> United States (Canvas cloud infrastructure)
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Website:</strong> <a href="https://canvas.instructure.com" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">canvas.instructure.com</a>
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-2">Data Transfer Safeguards</h2>
        <div className="mb-4 text-gray-700 dark:text-gray-200">
          <p className="mb-3">
            When subprocessors are located outside your country, we implement appropriate safeguards including:
          </p>
          <ul className="list-disc list-inside mb-4 ml-4">
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
            <li>UK International Data Transfer Agreement (IDTA) for UK transfers</li>
            <li>EU-U.S. Data Privacy Framework (DPF) participation where applicable</li>
            <li>Additional technical and organizational measures</li>
            <li>Regular compliance assessments and audits</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">Subprocessor Changes</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          We may update this list from time to time as we add, remove, or change subprocessors. When we make material changes to our subprocessors that may affect the processing of your personal data, we will:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200">
          <li>Update this page with the changes</li>
          <li>Notify users via email or in-app notification</li>
          <li>Provide at least 30 days notice for significant changes</li>
          <li>Allow users to object to the use of new subprocessors</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
        <p className="mb-4 text-gray-700 dark:text-gray-200">
          You have the right to object to the use of specific subprocessors. If you object to a subprocessor and we cannot provide the service without using that subprocessor, you may need to discontinue using the affected features or services. You can exercise your rights by contacting us at <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Questions?</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-200">
          If you have questions about our subprocessors or data processing practices, please contact our Data Protection Officer at <a href="mailto:khansokan1234@gmail.com" className="text-blue-600 dark:text-blue-400 underline">khansokan1234@gmail.com</a>.
        </p>

        <Footer />
      </div>
    </div>
  );
}
