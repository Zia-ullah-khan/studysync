"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function PaymentProcessing() {
  const [tier, setTier] = useState("basic");
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paypalRef = useRef<HTMLDivElement>(null);
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  const handleFastlanePayPal = () => {
    let amount = "5.00";
    if (tier === "enhanced") amount = "10.00";
    if (tier === "full") amount = "15.00";
    const params = new URLSearchParams({
      cmd: "_xclick",
      business: "khansokan1234@gmail.com",
      item_name: `StudySync Subscription (${tier.charAt(0).toUpperCase() + tier.slice(1)})`,
      amount,
      currency_code: "USD",
      no_shipping: "1",
      return: typeof window !== "undefined" ? window.location.origin + "/payment?success=1" : "",
      cancel_return: typeof window !== "undefined" ? window.location.origin + "/payment?cancel=1" : "",
    }).toString();
    window.open(`https://www.paypal.com/cgi-bin/webscr?${params}`, "_blank");
  };

  useEffect(() => {
    if (submitted || loading) return;
    if (!paypalClientId) return;

    if (paypalRef.current) {
      paypalRef.current.innerHTML = "";
    }

    if (typeof window !== "undefined" && !(window as Window & typeof globalThis & { paypal?: { Buttons?: unknown } }).paypal) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD`;
      script.async = true;
      script.onload = () => renderPayPalButton();
      document.body.appendChild(script);
    } else if ((window as Window & typeof globalThis & { paypal?: { Buttons?: unknown } }).paypal) {
      renderPayPalButton();
    }

    function renderPayPalButton() {
      type PayPalActions = {
        order: {
          create: (options: { purchase_units: { amount: { value: string } }[] }) => unknown;
          capture: () => Promise<void>;
        };
      };
      type PayPalButtonsOptions = {
        style: Record<string, unknown>;
        createOrder: (data: Record<string, unknown>, actions: PayPalActions) => unknown;
        onApprove: (data: Record<string, unknown>, actions: PayPalActions) => Promise<void>;
        onError: () => void;
      };
      interface PayPalNamespace {
        Buttons: (options: PayPalButtonsOptions) => { render: (container: HTMLElement) => void };
      }
      const paypal = (window as Window & typeof globalThis & { paypal: PayPalNamespace }).paypal;
      if (paypalRef.current && paypal) {
        paypal.Buttons({
          style: { layout: "vertical", color: "blue", shape: "rect", label: "paypal" },
          createOrder: (_data, actions) => {
            let amount = "5.00";
            if (tier === "enhanced") amount = "10.00";
            if (tier === "full") amount = "15.00";
            return actions.order.create({
              purchase_units: [
                {
                  amount: { value: amount }
                }
              ]
            });
          },
          onApprove: async (_data, actions) => {
            setLoading(true);
            setError(null);
            try {
              await actions.order.capture();
              setSubmitted(true);
            } catch {
              setError("PayPal payment failed. Please try again.");
            }
            setLoading(false);
          },
          onError: () => {
            setError("PayPal payment failed. Please try again.");
          }
        }).render(paypalRef.current);
      }
    }
  }, [tier, submitted, loading, paypalClientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("Direct credit card payments are not supported. Please use PayPal to complete your transaction.");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-12">
        <h1 className="text-2xl font-bold mb-6 text-center">Subscribe to StudySync</h1>
        <div className="mb-4 p-3 rounded bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700/50 text-sm text-blue-800 dark:text-blue-300">
          <strong>Security Notice:</strong> Your payment details are processed securely by our PCI DSS-compliant payment provider. <br />
          <span className="block mt-1">We do <strong>not</strong> store your card information or payment credentials on our servers. No payment API endpoints or sensitive payment logic are exposed in this application.</span>
        </div>
        {submitted ? (
          <div className="text-center">
            <p className="mb-4 text-green-600 dark:text-green-400 font-semibold">
              Thank you! Your payment has been submitted (demo only).
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              You will receive a confirmation email shortly.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="font-medium">Subscription Tier</span>
                <select
                  className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                  value={tier}
                  onChange={e => setTier(e.target.value)}
                  required
                >
                  <option value="basic">Basic – $5/month</option>
                  <option value="enhanced">Enhanced – $10/month</option>
                  <option value="full">Full – $15/month</option>
                </select>
              </label>
              <label className="block">
                <span className="font-medium">Name on Card</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="font-medium">Email</span>
                <input
                  type="email"
                  className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="font-medium">Card Number</span>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9\s]{13,19}"
                  maxLength={19}
                  className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                  value={card}
                  onChange={e => setCard(e.target.value)}
                  required
                  placeholder="1234 5678 9012 3456"
                />
              </label>
              <div className="flex gap-4">
                <label className="block flex-1">
                  <span className="font-medium">Expiry</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d{2}/\d{2}"
                    maxLength={5}
                    className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    required
                    placeholder="MM/YY"
                  />
                </label>
                <label className="block w-24">
                  <span className="font-medium">CVC</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d{3,4}"
                    maxLength={4}
                    className="mt-1 block w-full rounded border-gray-300 dark:bg-gray-700 dark:text-white"
                    value={cvc}
                    onChange={e => setCvc(e.target.value)}
                    required
                    placeholder="CVC"
                  />
                </label>
              </div>
              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
              )}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Processing..." : "Subscribe"}
              </button>
            </form>
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="mx-4 text-gray-500 dark:text-gray-400 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div ref={paypalRef} />
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleFastlanePayPal}
                className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded shadow transition"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 32 32" fill="currentColor"><path d="M29.4 7.6c-.6-.7-1.5-1.1-2.6-1.1H10.7c-.6 0-1.1.4-1.2 1l-4.2 19.1c-.1.4.2.8.6.8h4.7c.5 0 .9-.3 1-.8l1.2-5.5c.1-.5.5-.8 1-.8h2.2c5.6 0 10-2.3 11.3-8.9.2-1.1 0-2-.7-2.8zM25.7 13c-1.1 5.2-5.1 7.1-10.2 7.1h-1.7c-.5 0-.9.3-1 .8l-1.2 5.5c-.1.5-.5.8-1 .8h-3.2l3.8-17.2c.1-.4.5-.8 1-.8h15.8c.7 0 1.2.2 1.5.6.3.4.4 1 .2 1.7z"/></svg>
                PayPal Fastlane
              </button>
            </div>
          </>
        )}
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 dark:text-blue-400 underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
