import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AgentModePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />


      <section className="text-center px-6 py-20">
        <h1 className="text-5xl font-bold mb-4">Your Personal AI Assistant for Managing Lectures and Coursework</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Stay on top of your assignments, grades, and lectures effortlessly.
        </p>
        <Link href="/edubot" className="bg-yellow-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-yellow-700 transition-colors">
          Try Agent Mode Now
        </Link>
      </section>

      <section id="features" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Key Commands & Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Lecture Assistance</h3>
            <p><code>getPreviousLecture</code></p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Course Management</h3>
            <p><code>getCanvasCourses</code><br/><code>getCanvasAssignments</code></p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Assignment Tracking</h3>
            <p>
              <code>getUpcomingCanvasAssignments</code><br/>
              <code>getNextDueCanvasAssignment</code><br/>
              <code>getCanvasAssignmentsDueIn</code>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Grades Overview</h3>
            <p><code>getCanvasGrades</code></p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Detailed Info</h3>
            <p><code>getCanvasAssignmentDetails</code></p>
          </div>
        </div>
      </section>

      <section id="scenarios" className="bg-gray-100 dark:bg-gray-800/50 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Real-World Scenarios</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-gray-700 dark:text-gray-300">
          <p>“Never miss a deadline — get your next due assignment instantly.”</p>
          <p>“Easily review your last lecture transcript before your exam.”</p>
          <p>“Track all your course grades in one place.”</p>
        </div>
      </section>

      <section id="demo" className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Agent Mode in Action</h2>
        <iframe
          src="/edubot"
          title="Agent Mode Demo"
          className="w-full h-64 rounded-lg border-0"
        />
      </section>

      <section id="cta" className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Ready to simplify your study workflow?</h2>
        <Link href="/edubot" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors">
          See It In Action
        </Link>
      </section>

      <section id="faq" className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works & Privacy</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Secure OAuth Integration</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Agent Mode connects securely to your Canvas account using OAuth 2.0 authentication. Your login credentials are never stored by StudySync. OAuth tokens are encrypted in transit and at rest, and used solely to retrieve your academic data.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Data Privacy & Retention</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Academic data is cached for up to 7 days to improve performance, then automatically purged</li>
              <li>Command logs are stored for service improvement but can be deleted upon request</li>
              <li>You can revoke OAuth access at any time through your account settings</li>
              <li>We never share your academic data with third parties</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Your Rights & Control</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-2">
              <li>Access all your Agent Mode data and logs</li>
              <li>Delete OAuth tokens and cached data at any time</li>
              <li>Correct any inaccurate information retrieved</li>
              <li>Opt-out of Agent Mode while using other StudySync features</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Security & Compliance</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Agent Mode operates under industry-standard security practices, including encryption, access controls, and regular security audits. We comply with GDPR, CCPA, and other applicable data protection regulations.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            Learn more in our <Link href="/privacy" className="font-medium underline text-blue-600 dark:text-blue-400">Privacy Policy</Link> and <Link href="/tos" className="font-medium underline text-blue-600 dark:text-blue-400">Terms of Service</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
