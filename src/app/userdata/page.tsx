"use client";

import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

interface UserFile {
  _id?: string;
  [key: string]: unknown;
}
interface UserTranscription {
  _id?: string;
  [key: string]: unknown;
}
interface UserData {
  files?: UserFile[];
  transcriptions?: UserTranscription[];
  memory?: unknown[];
  user?: {
    memory?: unknown[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export default function UserDataPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [expandedFiles, setExpandedFiles] = useState<number[]>([]);
  const [expandedTrans, setExpandedTrans] = useState<number[]>([]);

  const toggleFileExpand = (idx: number) => {
    setExpandedFiles((prev) => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };
  const toggleTransExpand = (idx: number) => {
    setExpandedTrans((prev) => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const handleDownload = () => {
    if (!userData) return;
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: "application/json" });
    saveAs(blob, "studysync-userdata.json");
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete all your data? This will permanently delete all your files, transcriptions, and your user account itself. This action cannot be undone.")) return;
    setDeleting(true);
    const token = localStorage.getItem("authToken");
    const userDataStr = localStorage.getItem("userData");
    let userId = "";
    try {
      userId = userDataStr ? JSON.parse(userDataStr).userId : "";
    } catch {
      userId = "";
    }
    try {
      const res = await fetch(`http://localhost:3001/userdata/DeleteAllUserData?id=${userId}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) throw new Error("Failed to delete user data");
      setUserData(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("authExpiration");
      localStorage.clear();
      if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
      }
      alert("All your data and your account have been deleted. You will be logged out.");
      window.location.href = "/login";
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to delete data";
      alert(errorMsg);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const userDataStr = typeof window !== 'undefined' ? localStorage.getItem("userData") : null;
    let userId = "";
    try {
      userId = userDataStr ? JSON.parse(userDataStr).userId : "";
    } catch {
      userId = "";
    }
    const token = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null;
    if (!userId) {
      setError("User not logged in or user ID not found.");
      setLoading(false);
      return;
    }
    fetch(`http://localhost:3001/userdata/GetAllUserData?id=${userId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        return res.json();
      })
      .then((data: UserData) => setUserData(data))
      .catch((err: unknown) => {
        const errorMsg = err instanceof Error ? err.message : String(err);
        setError(errorMsg);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-12">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Stored Data</h1>
        {loading && <p>Loading...</p>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="flex gap-4 mb-6">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            onClick={handleDownload}
            disabled={!userData}
            type="button"
          >
            Download All Data
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            onClick={handleDelete}
            disabled={!userData || deleting}
            type="button"
          >
            {deleting ? 'Deleting...' : 'Delete All Data'}
          </button>
        </div>
        {userData && Array.isArray(userData.memory) && userData.memory.length > 0 && (
          <div className="mb-6">
            <div className="font-semibold mb-2">Memory:</div>
            <div className="space-y-3">
              {userData.memory.map((mem, idx) => (
                <div key={idx} className="border rounded p-3 bg-yellow-50 dark:bg-yellow-900/20">
                  {typeof mem === 'object' && mem !== null ? (
                    <ul className="list-disc pl-5 text-sm">
                      {Object.entries(mem).map(([k, v]) => (
                        <li key={k}><span className="font-semibold capitalize">{k}:</span> {Array.isArray(v) ? v.join(', ') : String(v)}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>{String(mem)}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {userData && userData.user && Array.isArray(userData.user.memory) && userData.user.memory.length > 0 && (
          <div className="mb-6">
            <div className="font-semibold mb-2">User Memory:</div>
            <div className="space-y-3">
              {userData.user.memory.map((mem: unknown, idx: number) => {
                if (typeof mem === 'object' && mem !== null) {
                  return (
                    <div key={idx} className="border rounded p-3 bg-blue-50 dark:bg-blue-900/20">
                      <ul className="list-disc pl-5 text-sm">
                        {Object.entries(mem as Record<string, unknown>).map(([k, v]) => (
                          <li key={k}><span className="font-semibold capitalize">{k}:</span> {Array.isArray(v) ? v.join(', ') : String(v)}</li>
                        ))}
                      </ul>
                    </div>
                  );
                } else {
                  return (
                    <div key={idx} className="border rounded p-3 bg-blue-50 dark:bg-blue-900/20">
                      <span>{String(mem)}</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
        {userData && userData.files && Array.isArray(userData.files) && userData.files.length > 0 && (
          <div className="mb-6">
            <div className="font-semibold mb-2">Files:</div>
            <div className="space-y-3">
              {userData.files.map((file, idx) => (
                <div key={file._id || idx} className="border rounded p-3 bg-gray-50 dark:bg-gray-700">
                  {Object.entries(file).filter(([k]) => k !== 'path').map(([k, v]) => (
                    <div key={k} className="flex flex-row gap-2">
                      <span className="font-semibold capitalize w-32 text-gray-700 dark:text-gray-200">{k}:</span>
                      <span className="break-all text-gray-900 dark:text-gray-100">{typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v)}</span>
                    </div>
                  ))}
                  <button
                    className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    onClick={() => toggleFileExpand(idx)}
                    type="button"
                  >
                    {expandedFiles.includes(idx) ? 'Hide All Info' : 'Show All Info'}
                  </button>
                  {expandedFiles.includes(idx) && (
                    <pre className="bg-gray-100 dark:bg-gray-800 rounded p-2 mt-2 text-xs overflow-x-auto">{JSON.stringify(file, null, 2)}</pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {userData && userData.transcriptions && Array.isArray(userData.transcriptions) && userData.transcriptions.length > 0 && (
          <div className="mb-6">
            <div className="font-semibold mb-2">Transcriptions:</div>
            <div className="space-y-3">
              {userData.transcriptions.map((t, idx) => (
                <div key={t._id || idx} className="border rounded p-3 bg-gray-50 dark:bg-gray-700">
                  {Object.entries(t).filter(([k]) => k !== 'transcript').map(([k, v]) => (
                    <div key={k} className="flex flex-row gap-2">
                      <span className="font-semibold capitalize w-32 text-gray-700 dark:text-gray-200">{k}:</span>
                      <span className="break-all text-gray-900 dark:text-gray-100">{typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v)}</span>
                    </div>
                  ))}
                  <button
                    className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    onClick={() => toggleTransExpand(idx)}
                    type="button"
                  >
                    {expandedTrans.includes(idx) ? 'Hide All Info' : 'Show All Info'}
                  </button>
                  {expandedTrans.includes(idx) && (
                    <pre className="bg-gray-100 dark:bg-gray-800 rounded p-2 mt-2 text-xs overflow-x-auto">{JSON.stringify(t, null, 2)}</pre>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {userData && typeof userData === 'object' && !Array.isArray(userData) ? (
          <div className="space-y-2">
            {Object.entries(userData).filter(([key]) => key !== 'files' && key !== 'transcriptions' && key !== 'memory').map(([key, value]) => (
              key === 'user' && value && typeof value === 'object' && !Array.isArray(value) ? (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center sm:gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                  <span className="font-semibold capitalize w-32 text-gray-700 dark:text-gray-200">{key}:</span>
                  <span className="break-all text-gray-900 dark:text-gray-100">{JSON.stringify({ ...value, memory: undefined }, null, 2)}</span>
                </div>
              ) : (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center sm:gap-2 border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                  <span className="font-semibold capitalize w-32 text-gray-700 dark:text-gray-200">{key}:</span>
                  <span className="break-all text-gray-900 dark:text-gray-100">{typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}</span>
                </div>
              )
            ))}
          </div>
        ) : userData ? (
          <pre className="bg-gray-100 dark:bg-gray-700 rounded p-4 overflow-x-auto text-sm">
            {JSON.stringify(userData, null, 2)}
          </pre>
        ) : null}
        {!loading && !error && !userData && (
          <p>No data found for your account.</p>
        )}
      </div>
    </div>
  );
}
