# Browser Heroes 2 - Deployment

## 1. Purpose

This document defines the stable contract that the separately managed CodePipeline and CodeBuild configuration should satisfy. It does not prescribe how the pipeline packages or promotes artifacts.

## 2. Runtime and Builds

Use Node.js 22 and pnpm 10.14.0. Install dependencies with `pnpm install --frozen-lockfile` before running the repository checks and builds.

The deployable build outputs are:

- `apps/web/dist` for the frontend
- `apps/api/dist` for the API, together with the API's production dependencies and workspace package runtime output

The API artifact must be built on Linux because `argon2` includes native binaries. Its root `Procfile` starts Elastic Beanstalk with `node dist/server.js`.

The exact API artifact assembly belongs to CodeBuild and should be chosen and tested when the pipeline is implemented. Elastic Beanstalk cannot install the API directly from `apps/api/package.json` because its `workspace:*` dependencies require workspace-aware packaging.

## 3. Production Topology

Use a single public CloudFront hostname with these ordered behaviors:

| Path           | Origin            | Caching  | Methods and forwarding                                                  |
| -------------- | ----------------- | -------- | ----------------------------------------------------------------------- |
| `/api/*`       | Elastic Beanstalk | Disabled | Allow required API methods; forward headers, cookies, and query strings |
| `/socket.io/*` | Elastic Beanstalk | Disabled | Forward the WebSocket handshake, headers, cookies, and query strings    |
| Default `*`    | Private S3 bucket | Enabled  | Serve the built frontend without application cookies                    |

Redirect viewer HTTP requests to HTTPS and use HTTPS from CloudFront to Elastic Beanstalk. Keep the S3 bucket private and grant CloudFront access through Origin Access Control.

Serve `index.html` with a short or disabled cache and hashed assets with a long immutable cache. Handle extensionless frontend routes within the default S3 behavior so genuine API errors are not rewritten to frontend HTML.

Production uses same-origin defaults, so the web build should not set `VITE_API_BASE_URL` or `VITE_SOCKET_URL` unless intentionally changing this topology.

## 4. API Environment

Provide these values outside the source artifact:

- `NODE_ENV=production`
- `MONGO_URI`
- `SESSION_SECRET`
- `APP_URL`
- `TRUST_PROXY_HOPS`
- `AWS_REGION`
- `SES_FROM_EMAIL`
- `EMAIL_DELIVERY=ses`

Set `APP_URL` to the public CloudFront-backed HTTPS origin. Verify the proxy-hop count against the deployed request path because it affects secure-cookie detection and IP rate limiting.

Use the Elastic Beanstalk instance role for SES rather than shipping AWS access keys.

## 5. Atlas and Rollback

Give the application a dedicated Atlas database user and allow connections only from the Elastic Beanstalk network path. Do not allow `0.0.0.0/0`. Dedicated Atlas clusters may use AWS PrivateLink; smaller tiers can use a narrow IP access-list entry.

Enable the backup capability available to the chosen Atlas tier and test restoration.

Retain versioned frontend and API artifacts. A rollback should restore the previous Elastic Beanstalk application version and S3 artifact, then invalidate the frontend entry document. Database changes must remain compatible with at least the current and previous application versions.
