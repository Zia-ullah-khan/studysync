/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* 
Next up is to figure out how to handle permanent tokens from google
And how to refesh the tokens, and after that is how to connect them to agent mode 
*/
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";

type GapiToken = {
  access_token: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
};

export default function Page() {
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

  const router = useRouter();

  const tokenClient = useRef<any>(null);
  const codeClient = useRef<any>(null);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [events, setEvents] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<GapiToken | null>(null);
  const autoInitDone = useRef(false);

  useEffect(() => {
    const userToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (!userToken) {
      router.push('/login?redirect=gcoauth2');
    }
  }, [router]);

  function setCookie(
    name: string,
    value: string,
    opts: { expires?: Date; path?: string; secure?: boolean; sameSite?: "lax" | "strict" | "none" } = {}
  ) {
    const parts = [
      `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
      `Path=${opts.path || "/"}`,
      `SameSite=${(opts.sameSite || "lax").charAt(0).toUpperCase() + (opts.sameSite || "lax").slice(1)}`,
    ];
    if (opts.expires) parts.push(`Expires=${opts.expires.toUTCString()}`);
    if (opts.secure) parts.push("Secure");
    document.cookie = parts.join("; ");
  }

  function getCookie(name: string): string | null {
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    for (const c of cookies) {
      const [k, ...v] = c.split("=");
      if (decodeURIComponent(k) === name) return decodeURIComponent(v.join("="));
    }
    return null;
  }

  function deleteCookie(name: string) {
    document.cookie = `${encodeURIComponent(name)}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`;
  }

  function maskSecret(secret: string, visibleStart = 4, visibleEnd = 4) {
    if (!secret) return "";
    const len = secret.length;
    if (len <= visibleStart + visibleEnd) {
      return `${secret.slice(0, 1)}${"*".repeat(Math.max(len - 2, 0))}${secret.slice(-1)}`;
    }
    return `${secret.slice(0, visibleStart)}${"*".repeat(len - visibleStart - visibleEnd)}${secret.slice(-visibleEnd)}`;
  }

  useEffect(() => {
    if (!CLIENT_ID) {
      setError("Missing Google OAuth client id. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID.");
      return;
    }

    if (!document.querySelector('#gapi-script')) {
      const s = document.createElement("script");
      s.src = "https://apis.google.com/js/api.js";
      s.async = true;
      s.defer = true;
      s.id = "gapi-script";
      s.onload = () => gapiLoaded();
      document.body.appendChild(s);
    } else {
      if (window.gapi) gapiLoaded();
    }

    if (!document.querySelector('#gis-script')) {
      const s2 = document.createElement("script");
      s2.src = "https://accounts.google.com/gsi/client";
      s2.async = true;
      s2.defer = true;
      s2.id = "gis-script";
      s2.onload = () => gisLoaded();
      document.body.appendChild(s2);
    } else {
      if (window.google) gisLoaded();
    }

  }, []);

  function gapiLoaded() {
    if (!window.gapi) return;
    window.gapi.load("client", initializeGapiClient);
  }

  async function initializeGapiClient() {
    try {
      const initConfig: any = { discoveryDocs: [DISCOVERY_DOC] };
      if (API_KEY) initConfig.apiKey = API_KEY;
      await window.gapi.client.init(initConfig);
      setGapiInited(true);
    } catch (err: unknown) {
      setError((err as Error)?.message || String(err));
    }
  }

  function gisLoaded() {
    if (!window.google) return;
    tokenClient.current = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "",
    });
    codeClient.current = window.google.accounts.oauth2.initCodeClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      ux_mode: 'popup',
      prompt: 'consent',
      access_type: 'offline' as any,
      callback: async (resp: any) => {
        if (resp?.error) {
          const errMsg = typeof resp.error === 'string' ? resp.error : JSON.stringify(resp.error);
          setError(errMsg);
          return;
        }
        console.log("Authorization code received:", resp);
        if (resp?.code) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('[OAuth][Code Flow] Authorization code:', resp.code);
          } else {
            console.log('[OAuth][Code Flow] Authorization code (masked):', maskSecret(resp.code));
          }
        }
        if (!resp?.code) {
          setError('No authorization code received.');
          return;
        }
        const userToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (!userToken) {
          router.push('/login?redirect=gcoauth2');
          return;
        }
        try {
          await axios.post(
            `${API_BASE_URL}/userdata/SaveGoogleCalendarCredentials`,
            { authorizationCode: resp.code },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          setAuthorized(true);
          tokenClient.current?.requestAccessToken({ prompt: '' });
        } catch (e) {
          setError('Failed to save offline credentials to server.');
          console.warn('Failed to persist Google offline creds to API', e);
        }
      },
    });
    console.log(codeClient)
    setGisInited(true);
  }

  async function handleAuthClick() {
    setError(null);

    if (!tokenClient.current) {
      setError("Token client not initialized.");
      return;
    }

    tokenClient.current.callback = async (resp: unknown) => {
      if (typeof resp === 'object' && resp !== null && 'error' in (resp as any)) {
        const e = (resp as any).error;
        const errMsg = typeof e === 'string' ? e : JSON.stringify(e);
        setError(errMsg);
        return;
      }

      if ((resp as any)?.error !== undefined) {
        const e = (resp as any).error;
        const errMsg = typeof e === 'string' ? e : JSON.stringify(e);
        setError(errMsg);
        return;
      }

      const t = window.gapi.client.getToken() as GapiToken | null;
      if (t?.access_token) {
        setToken(t);
        const expiresSec = t.expires_in ?? 3600;
        const expDate = new Date(Date.now() + expiresSec * 1000);
        const secure = typeof window !== "undefined" && window.location.protocol === "https:";
        setCookie("gc_at", t.access_token, { expires: expDate, path: "/", sameSite: "lax", secure });
        setCookie("gc_exp", String(expDate.getTime()), { expires: expDate, path: "/", sameSite: "lax", secure });
      }
      const userToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      if (!userToken) {
        router.push('/login?redirect=gcoauth2');
        return;
      }
      try {
          await axios.post(
            `${API_BASE_URL}/userdata/SaveGoogleCalendarCredentials`,
            {
              accessToken: t?.access_token,
              expiresAt: new Date(Date.now() + (t?.expires_in ?? 3600) * 1000).toISOString(),
            },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
        } catch (e) {
          console.warn('Failed to persist Google creds to API', e);
        }

      setAuthorized(true);
      try {
        await listUpcomingEvents();
      } catch (err: unknown) {
        setError((err as Error)?.message || String(err));
      }
    };

    const token = window.gapi.client.getToken();
    if (token === null) {
      tokenClient.current.requestAccessToken({ prompt: "consent" });
    } else {
      tokenClient.current.requestAccessToken({ prompt: "" });
    }
  }

  function handleOfflineAuthClick() {
    setError(null);
    if (!codeClient.current) {
      setError('Offline code client not initialized.');
      return;
    }
    console.log('[OAuth][Code Flow] Requesting authorization code (offline access)…');
    codeClient.current.requestCode();
  }

  function handleSignoutClick() {
    try {
      const tokenObj = window.gapi.client.getToken() as GapiToken | null;
      if (tokenObj !== null && tokenObj.access_token) {
        window.google.accounts.oauth2.revoke(tokenObj.access_token, () => {
        });
        window.gapi.client.setToken(null);
      }
    } catch {
    }
    setEvents([]);
    setAuthorized(false);
    setToken(null);
    deleteCookie("gc_at");
    deleteCookie("gc_exp");
    try {
      localStorage.removeItem('googleCalendarAccessToken');
    } catch {}
  }

  useEffect(() => {
    if (!token?.access_token || !token.expires_in) return;
    const ms = Math.max((token.expires_in - 60) * 1000, 0);
    const id = window.setTimeout(() => {
      if (tokenClient.current) {
        tokenClient.current.requestAccessToken({ prompt: "" });
      }
    }, ms);
    return () => window.clearTimeout(id);
  }, [token]);

  useEffect(() => {
    if (!gapiInited || !window.gapi?.client) return;
    const at = getCookie("gc_at");
    if (!at) return;
    try {
      window.gapi.client.setToken({ access_token: at });
      let expires_in: number | undefined = undefined;
      const expStr = getCookie("gc_exp");
      if (expStr) {
        const msLeft = parseInt(expStr, 10) - Date.now();
        if (msLeft > 0) expires_in = Math.floor(msLeft / 1000);
      }
      setToken({ access_token: at, expires_in });
      setAuthorized(true);
    } catch {
    }
  }, [gapiInited]);

  useEffect(() => {
    if (!gapiInited || !gisInited || autoInitDone.current) return;
    autoInitDone.current = true;

    const tryAutoAuthorize = async () => {
      try {
        if (getCookie('gc_at')) return;

        const userToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (!userToken) return;

        try {
          const resp = await axios.get(
            `${API_BASE_URL}/userdata/GoogleCalendarAccessToken`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          const data = resp?.data || {} as any;
          const accessToken: string | undefined = data.accessToken || data.access_token;
          if (accessToken) {
            let expires_in: number | undefined = undefined;
            if (typeof data.expires_in === 'number') {
              expires_in = data.expires_in;
            } else if (data.expiresAt) {
              const msLeft = new Date(data.expiresAt).getTime() - Date.now();
              if (msLeft > 0) expires_in = Math.floor(msLeft / 1000);
            }
            if (window.gapi?.client) {
              window.gapi.client.setToken({ access_token: accessToken });
            }
            setToken({ access_token: accessToken, expires_in });
            const expDate = expires_in ? new Date(Date.now() + expires_in * 1000) : new Date(Date.now() + 55 * 60 * 1000);
            const secure = typeof window !== 'undefined' && window.location.protocol === 'https:';
            setCookie('gc_at', accessToken, { expires: expDate, path: '/', sameSite: 'lax', secure });
            setCookie('gc_exp', String(expDate.getTime()), { expires: expDate, path: '/', sameSite: 'lax', secure });
            setAuthorized(true);
            return;
          }
        } catch {

        }

        if (tokenClient.current) {
          tokenClient.current.callback = (resp: any) => {
            if (resp?.error) return;
            const t = window.gapi.client.getToken() as GapiToken | null;
            if (t?.access_token) {
              setToken(t);
              const expiresSec = t.expires_in ?? 3600;
              const expDate = new Date(Date.now() + expiresSec * 1000);
              const secure = typeof window !== 'undefined' && window.location.protocol === 'https:';
              setCookie('gc_at', t.access_token, { expires: expDate, path: '/', sameSite: 'lax', secure });
              setCookie('gc_exp', String(expDate.getTime()), { expires: expDate, path: '/', sameSite: 'lax', secure });
              setAuthorized(true);
            }
          };
          try {
            tokenClient.current.requestAccessToken({ prompt: '' });
          } catch {
          }
        }
      } catch {
      }
    };

    tryAutoAuthorize();
  }, [gapiInited, gisInited]);

  useEffect(() => {
    if (!authorized || !gapiInited) return;
    if (events.length > 0 || loading) return;
    (async () => {
      try {
        await listUpcomingEvents();
      } catch (err) {
        setError((err as Error)?.message || String(err));
      }
    })();
  }, [authorized, gapiInited, events.length, loading]);

  async function listUpcomingEvents() {
    setLoading(true);
    setError(null);
    try {
      const request: Record<string, unknown> = {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      };

      const response = await window.gapi.client.calendar.events.list(request as any);
      const items = response.result?.items || [];
      setEvents(items);
      if (!items || items.length === 0) {
        setError("No events found.");
      }
    } catch (err: unknown) {
      setError((err as Error)?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-neutral-950 dark:to-black py-12">
      <div className="mx-auto max-w-3xl px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Connect Google Calendar</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-neutral-400">Authorize access to view your upcoming events in StudySync.</p>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </div>
        )}

        {!CLIENT_ID ? (
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/50">
            <p className="text-slate-700 dark:text-neutral-300">
              Set <code className="rounded bg-slate-100 px-1 py-0.5 text-slate-800 dark:bg-neutral-800 dark:text-neutral-100">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> in your environment.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white/70 shadow-lg backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="flex flex-col gap-3 border-b border-slate-200 p-6 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Google Calendar</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-neutral-400">Securely connect and manage tokens right from your browser.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${authorized ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300'}`}>
                  {authorized ? 'Authorized' : 'Not authorized'}
                </span>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${gapiInited ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : 'bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300'}`}>GAPI</span>
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${gisInited ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' : 'bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-neutral-300'}`}>GIS</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAuthClick}
                  disabled={!gapiInited || !gisInited || loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M6 2a1 1 0 1 1 2 0v1h8V2a1 1 0 1 1 2 0v1h.5A2.5 2.5 0 0 1 21 5.5v13A2.5 2.5 0 0 1 18.5 21h-13A2.5 2.5 0 0 1 3 18.5v-13A2.5 2.5 0 0 1 5.5 3H6V2Zm12 5H6v12.5c0 .276.224.5.5.5h13a.5.5 0 0 0 .5-.5V7Z" />
                  </svg>
                  {authorized ? "Refresh" : "Authorize"}
                </button>
                <button
                  onClick={handleOfflineAuthClick}
                  disabled={!gapiInited || !gisInited || loading}
                  title="Requests an authorization code for offline access (server will store refresh token)"
                  className="inline-flex items-center gap-2 rounded-lg border border-emerald-600 px-4 py-2 text-emerald-700 transition hover:bg-emerald-50/60 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a4.5 4.5 0 1 0 2.997 7.965l3.003 3.003a1.5 1.5 0 0 1 0 2.121l-1.5 1.5a1.5 1.5 0 0 1-2.121 0l-.879-.879-.879.879a1.5 1.5 0 0 1-2.121 0l-1.5-1.5a1.5 1.5 0 0 1 0-2.121l3.003-3.003A4.5 4.5 0 0 0 15.75 5.25Z" />
                  </svg>
                  Authorize (Offline)
                </button>
                <button
                  onClick={handleSignoutClick}
                  disabled={!authorized}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-600 px-4 py-2 text-red-700 transition hover:bg-red-50/70 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M11 3a1 1 0 0 1 1 1v6h-2V5H7.5A1.5 1.5 0 0 0 6 6.5v11A1.5 1.5 0 0 0 7.5 19H10v-5h2v6a1 1 0 0 1-1 1H7.5A3.5 3.5 0 0 1 4 17.5v-11A3.5 3.5 0 0 1 7.5 3H11Zm7.293 7.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L15 12.586V11a1 1 0 1 1 2 0v1.586l1.293-1.293Z" />
                  </svg>
                  Sign Out
                </button>
              </div>

              <div className="mt-6">
                {loading ? (
                  <div className="space-y-3">
                    <div className="h-20 w-full animate-pulse rounded-lg border border-slate-200 bg-slate-100 dark:border-neutral-800 dark:bg-neutral-900" />
                    <div className="h-20 w-full animate-pulse rounded-lg border border-slate-200 bg-slate-100 dark:border-neutral-800 dark:bg-neutral-900" />
                    <div className="h-20 w-full animate-pulse rounded-lg border border-slate-200 bg-slate-100 dark:border-neutral-800 dark:bg-neutral-900" />
                  </div>
                ) : events.length > 0 ? (
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Upcoming events</h3>
                    <ul className="space-y-3">
                      {events.map((ev, i) => {
                        const start = ev.start?.dateTime || ev.start?.date || "";
                        return (
                          <li key={i} className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white/70 p-4 transition hover:bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-900">
                            <div>
                              <div className="font-medium">{ev.summary || "(no title)"}</div>
                              <div className="mt-1 text-sm text-slate-600 dark:text-neutral-400">{start}</div>
                            </div>
                            <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-neutral-800 dark:text-neutral-300">Primary</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-5 text-slate-700 dark:border-neutral-800 dark:bg-neutral-900/40 dark:text-neutral-300">
                    No events to display.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-slate-600 dark:text-neutral-400">
          This page uses the Google Calendar API in the browser. It keeps credentials on the client only.
        </p>
      </div>
    </main>
  );
}