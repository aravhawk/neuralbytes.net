"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Image from "next/image";

function useTypewriter(text: string, speed = 80) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      indexRef.current++;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

export default function Home() {
  const headerText = useTypewriter("Building AI-integrated experiences and experiments");

  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("No spam. Unsubscribe anytime.");

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) {
      setSubscribeMessage("Please enter your email.");
      return;
    }
    if (!emailRegex.test(email)) {
      setSubscribeMessage("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setSubscribeMessage(data.message || data.error);
    } catch {
      setSubscribeMessage("Something went wrong. Please try again.");
    }
  }

  function handleContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
    const contactEmail = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    window.location.href =
      "mailto:contact@neuralbytes.net?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(message) +
      "%0A%0AFrom:%0A" +
      encodeURIComponent(name) +
      ",%0A" +
      encodeURIComponent(contactEmail);
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto flex flex-wrap px-6 py-4 flex-col md:flex-row items-center">
          <a className="flex items-center text-white mb-3 md:mb-0 font-semibold tracking-tight" href="https://neuralbytes.net">
            <Image src="/images/neuralbytes_logo.png" alt="NeuralBytes" width={40} height={40} className="rounded-lg" />
            <span className="ml-3 text-lg">NeuralBytes</span>
          </a>
          <nav className="md:ml-auto flex items-center text-sm space-x-8">
            <a className="text-gray-400 hover:text-white transition-colors duration-200" href="https://intergalacticpro.neuralbytes.net">IntergalacticPro</a>
            <a className="text-gray-400 hover:text-white transition-colors duration-200" href="https://alphapredict.neuralbytes.net">AlphaPredict</a>
          </nav>
        </div>
      </header>

      <section className="bg-gray-900 min-h-screen flex items-center">
        <div className="container mx-auto px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 id="main_page_header" className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              {headerText}<span className="blinking-cursor">▌</span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              We&apos;re dedicated to integrating AI into products and services to create experiences that were never possible before.
            </p>

            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-1 flex items-center border border-gray-700 focus-within:border-red-500 transition-colors duration-200">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent text-white px-4 py-3 outline-none placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-md transition-all duration-200 transform hover:scale-105"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-sm text-gray-500">{subscribeMessage}</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
              <p className="text-gray-400 text-lg">Have questions? We&apos;d love to hear from you.</p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-8 md:p-12 border border-gray-700">
              <form onSubmit={handleContact} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors duration-200"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors duration-200 resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Send Message
                </button>

                <p className="text-sm text-gray-500 text-center mt-4">We typically respond within 24-48 hours.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <Image src="/images/neuralbytes_logo.png" alt="NeuralBytes" width={40} height={40} className="rounded-lg" />
              <span className="ml-3 text-white font-semibold text-lg">NeuralBytes</span>
            </div>

            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <a href="https://www.linkedin.com/company/neuralbytes/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-white transition-colors duration-200">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-6 h-6" viewBox="0 0 24 24">
                  <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" stroke="none" />
                </svg>
              </a>
            </div>

            <p className="text-sm text-gray-500">&copy; 2024-2025 NeuralBytes, Inc.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
