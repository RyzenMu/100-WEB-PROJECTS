import React from "react";

const Auth1 = () => {
  return (
    <div className="p-6 space-y-8 text-gray-800 dark:text-white max-w-4xl mx-auto bg-gray-700">
      {/* Header */}
      <h1 className="text-3xl font-bold">🔐 Authentication vs Authorization</h1>

      {/* Definitions */}
      <table className="w-full table-auto border border-gray-300 dark:border-gray-600">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="p-2 text-left">Term</th>
            <th className="p-2 text-left">Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-300 dark:border-gray-600">
            <td className="p-2 font-medium">Authentication</td>
            <td className="p-2">Verifying who the user is (e.g., login with username & password).</td>
          </tr>
          <tr className="border-t border-gray-300 dark:border-gray-600">
            <td className="p-2 font-medium">Authorization</td>
            <td className="p-2">Verifying what the user has access to (e.g., admin vs regular user privileges).</td>
          </tr>
        </tbody>
      </table>

      {/* Technologies */}
      <section>
        <h2 className="text-2xl font-semibold">🧰 Popular Technologies</h2>
        <ul className="list-disc pl-6 space-y-4">
          <li>
            <strong>JWT (JSON Web Token)</strong><br />
            Used for stateless authentication. Includes Header.Payload.Signature. Often used in REST APIs.
          </li>
          <li>
            <strong>Passport.js</strong><br />
            Middleware for Node.js with local and social login support. Works well with Express.
          </li>
          <li>
            <strong>OAuth 2.0</strong><br />
            Authorization framework (used by Google, GitHub) with access/refresh tokens and scopes.
          </li>
          <li>
            <strong>Session-Based Authentication</strong><br />
            Stores session ID on server, cookie on client. Simple, secure over HTTPS.
          </li>
          <li>
            <strong>OpenID Connect</strong><br />
            Authentication layer over OAuth 2.0. Used to get user identity.
          </li>
        </ul>
      </section>

      {/* Core Concepts */}
      <section>
        <h2 className="text-2xl font-semibold">🧠 Core Concepts</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Access Token:</strong> Short-lived, bearer token for accessing resources.</li>
          <li><strong>Refresh Token:</strong> Used to get a new access token without logging in again.</li>
          <li><strong>Authorization Code:</strong> Used in OAuth 2.0 to get an access token.</li>
          <li><strong>Scopes:</strong> Define what resources or actions a token can access (e.g., email, profile).</li>
          <li><strong>Grant Types:</strong> Authorization Code, Client Credentials, Password (legacy), Implicit (legacy), Device Code.</li>
        </ul>
      </section>

      {/* Use Cases */}
      <section>
        <h2 className="text-2xl font-semibold">🔧 When to Use What</h2>
        <table className="w-full table-auto border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left">Use Case</th>
              <th className="p-2 text-left">Recommended Tech</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-300 dark:border-gray-600">
              <td className="p-2">Web app login (email/pass)</td>
              <td className="p-2">Passport.js + Sessions or JWT</td>
            </tr>
            <tr className="border-t border-gray-300 dark:border-gray-600">
              <td className="p-2">API authentication</td>
              <td className="p-2">JWT</td>
            </tr>
            <tr className="border-t border-gray-300 dark:border-gray-600">
              <td className="p-2">Social login (Google, GitHub)</td>
              <td className="p-2">Passport.js with OAuth2</td>
            </tr>
            <tr className="border-t border-gray-300 dark:border-gray-600">
              <td className="p-2">Mobile app + API</td>
              <td className="p-2">JWT + Refresh Token</td>
            </tr>
            <tr className="border-t border-gray-300 dark:border-gray-600">
              <td className="p-2">Enterprise SSO</td>
              <td className="p-2">OAuth 2.0 + OpenID Connect</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Learning Path */}
      <section>
        <h2 className="text-2xl font-semibold">🚀 Suggested Learning Path</h2>
        <ol className="list-decimal pl-6 space-y-2 text-white">
          <li>Start with <strong>Passport.js</strong> – implement session-based login/register/logout.</li>
          <li>Learn <strong>JWT</strong> – issue token on login and protect routes.</li>
          <li>Explore <strong>OAuth 2.0</strong> – use GitHub/Google login via Passport.</li>
          <li>Dive into advanced topics – token renewal, RBAC, MFA, and secure storage.</li>
        </ol>
      </section>

      {/* Resources */}
      <section>
        <h2 className="text-2xl font-semibold">📚 Resources</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="https://jwt.io/introduction" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">JWT.io Introduction</a></li>
          <li><a href="http://www.passportjs.org/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Passport.js Docs</a></li>
          <li><a href="https://oauth.net/2/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">OAuth 2.0 Overview</a></li>
          <li><a href="https://openid.net/connect/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">OpenID Connect Guide</a></li>
          <li><a href="https://github.com/passport/express-4.x-local-example" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Node.js Auth Examples</a></li>
        </ul>
      </section>
    </div>
  );
};

export default Auth1;
