import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { genericOAuth } from "better-auth/plugins";
import { db } from "@/db/index";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "dauth",
          clientId: process.env.DAUTH_CLIENT_ID!,
          clientSecret: process.env.DAUTH_SECRET!,
          authorizationUrl: "https://auth.delta.nitt.edu/authorize",
          authorizationUrlParams: {
            client_id: process.env.DAUTH_CLIENT_ID!,
            response_type: "code",
            grant_type: "authorization_code",
            scope: "openid email profile user",
          },
          tokenUrl: "https://auth.delta.nitt.edu/api/oauth/token",
          async getToken({ code, redirectURI }) {
            const res = await fetch(
              "https://auth.delta.nitt.edu/api/oauth/token",
              {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                  client_id: process.env.DAUTH_CLIENT_ID!,
                  client_secret: process.env.DAUTH_SECRET!,
                  code: code,
                  grant_type: "authorization_code",
                  redirect_uri: redirectURI,
                }),
              },
            );

            const tokens = await res.json();

            if (!res.ok || !tokens.access_token) {
              throw new Error(tokens.error_description ?? "dauth token exchange failed");
            }

            const toExpiryDate = (value: unknown): Date | undefined => {
              const n = Number(value);
              if (!Number.isFinite(n) || n <= 0) return undefined;
              // Dauth can be silly and return a duration in seconds or an absolute timestamp in milliseconds
              // Hence we do these shenanigans to determine which one it is and convert it to a Date object accordingly
              // Will follow this logic in future Dauth applications
              if (n > 1e11) {
                return new Date(n); // already an absolute ms timestamp
              }
              return new Date(Date.now() + n * 1000); // standard spec-compliant duration
            };

            return {
              accessToken: tokens.access_token,
              refreshToken: tokens.refresh_token,
              accessTokenExpiresAt: toExpiryDate(tokens.expires_in),
              refreshTokenExpiresAt: tokens.refresh_token
                ? toExpiryDate(tokens.refresh_expires_in)
                : undefined,
              idToken: tokens.id_token,
              scopes: tokens.scope ? tokens.scope.split(" ") : [],
              tokenType: tokens.token_type,
            };
          }
        }
      ]
    })
  ]
});

