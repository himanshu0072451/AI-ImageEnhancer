import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom"; // Import Link for navigation

const RestoreCredits = () => {
  const [apiKey, setApiKey] = useState("");
  const [isRestored, setIsRestored] = useState(false);

  const handleApiKeySubmit = (e) => {
    e.preventDefault();

    if (!apiKey) {
      toast.error("Please enter a valid API key.");
      return;
    }

    // Simulate API check for the key (replace this with your actual check)
    if (apiKey === "") {
      setIsRestored(true);
      toast.success("Your credits have been restored!");
    } else {
      toast.error("Invalid API key. Please check and try again.");
    }
  };

  return (
    <div className="RestoreCredits min-h-screen w-full flex items-center flex-col px-4 py-10 bg-[#0D1B2A]">
      {/* Header */}
      <div className="top min-h-[25%] max-w-3xl text-center mb-10">
        <h1 className="text-[2.5rem] sm:text-[3.5rem] font-semibold leading-tight mb-4 text-white">
          Restore Your Credits
        </h1>
        <p className="text-lg text-zinc-300">
          Follow the steps below to restore your credits and get back to
          enhancing images!
        </p>
      </div>

      {/* Steps to Restore */}
      <div className="steps w-full max-w-3xl flex flex-col items-center gap-6">
        <div className="step bg-[#1A2634] p-5 rounded-md w-full text-white shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Step 1: Go to Picwish</h2>
          <p>
            Visit the Picwish signup page and register using a temporary email.
          </p>
          <Link
            to="https://www.picwish.com/signup"
            target="_blank"
            className="text-[#9D00FF] hover:underline mt-2 block"
          >
            Go to Picwish Signup Page
          </Link>
        </div>

        <div className="step bg-[#1A2634] p-5 rounded-md w-full text-white shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Step 2: Navigate API</h2>
          <p>
            After signing up, Navigate to account section on Picwish and
            navigate to the API section.
          </p>
        </div>

        <div className="step bg-[#1A2634] p-5 rounded-md w-full text-white shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            Step 3: Get Your API Key
          </h2>
          <p>
            Obtain your API key from the Picwish dashboard and copy it to use in
            the next step.
          </p>
          <Link
            to="https://picwish.com/my-account?subRoute=api-key"
            target="_blank"
            className="text-[#9D00FF] hover:underline mt-2 block"
          >
            Go to Picwish Signup Page
          </Link>
        </div>

        <div className="step bg-[#1A2634] p-5 rounded-md w-full text-white shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            Step 4: Paste the API Key
          </h2>
          <p>
            Paste your API key below to restore your 50 credits and continue
            using the image enhancement service.
          </p>
        </div>
      </div>

      {/* API Key Input Form */}
      <div className="api-key-section w-full max-w-lg mt-10 flex flex-col items-center">
        <form
          onSubmit={handleApiKeySubmit}
          className="w-full max-w-md p-6 bg-[#1A2634] rounded-md shadow-lg"
        >
          <label htmlFor="apiKey" className="text-lg text-white mb-2 block">
            Enter Your API Key:
          </label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-md text-black"
            placeholder="Your API key"
          />
          <button
            type="submit"
            className="w-full px-6 py-2 bg-[#9D00FF] text-white rounded-md hover:bg-[#7d00cc] transition"
          >
            Restore Credits
          </button>
        </form>
      </div>

      {/* Success Message */}
      {isRestored && (
        <div className="success-message mt-10 text-center text-lg font-medium text-green-500">
          <p>
            Your credits have been successfully restored! You now have 50
            credits.
          </p>
        </div>
      )}

      {/* Footer (optional) */}
      <div className="footer mt-10 text-center text-zinc-300">
        <p>&copy; 2025 Picwish. All rights reserved.</p>
      </div>

      {/* Navigation Links */}
      <div className="navigation-links mt-8 text-center text-lg">
        <p className="text-zinc-300">
          Need Help? Check the steps above or visit:
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Link to="/" className="text-[#9D00FF] hover:underline">
            Back to Home (Hero Page)
          </Link>
          <Link
            to="https://www.picwish.com/help"
            target="_blank"
            className="text-[#9D00FF] hover:underline"
          >
            Picwish Help Center
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestoreCredits;
