# Browser Heroes 2 - Deployment

## 1. Purpose

This document defines the stable contract that the separately managed CodePipeline and CodeBuild configuration should satisfy. It does not prescribe how the pipeline packages or promotes artifacts.

## 2. Runtime and Builds

Use Node.js 22 and pnpm 10.14.0. Install dependencies with `pnpm install --frozen-lockfile` before running the repository checks and builds.

The deployable build outputs are:

- `apps/web/dist` for the frontend
- `apps/api/dist/server.cjs` for the bundled API, together with the files in `apps/api/deployment`

The API is bundled into `dist/server.cjs`, including its workspace packages and ordinary JavaScript dependencies. The build options live in `apps/api/esbuild.config.mjs` so the package script remains readable.

`argon2` securely hashes account passwords and contains native code, so it remains outside the JavaScript bundle and is installed on Elastic Beanstalk's Linux runtime. CodeBuild combines the bundle with the small manifest and `Procfile` in `apps/api/deployment`. No source files, local environment files, workspace links, or development dependencies enter the artifact.

## 3. Production Topology

Use a single public CloudFront hostname with these ordered behaviors:

| Path           | Origin            | Caching  | Methods and forwarding                                                  |
| -------------- | ----------------- | -------- | ----------------------------------------------------------------------- |
| `/api/*`       | Elastic Beanstalk | Disabled | Allow required API methods; forward headers, cookies, and query strings |
| `/socket.io/*` | Elastic Beanstalk | Disabled | Forward the WebSocket handshake, headers, cookies, and query strings    |
| Default `*`    | Private S3 bucket | Enabled  | Serve the built frontend without application cookies                    |

Redirect viewer HTTP requests to HTTPS. The initial low-traffic deployment uses a single-instance Elastic Beanstalk environment without a load balancer. CloudFront therefore uses HTTP to that origin, and the instance security group permits port 80 only from the AWS-managed CloudFront origin-facing prefix list. A future load-balanced environment should use HTTPS from CloudFront to the load balancer.

Serve `index.html` with a short or disabled cache and hashed assets with a long immutable cache. Handle extensionless frontend routes within the default S3 behavior so genuine API errors are not rewritten to frontend HTML.

Production uses same-origin defaults, so the web build should not set `VITE_API_BASE_URL` or `VITE_SOCKET_URL` unless intentionally changing this topology.

## 4. Frontend Environment

Frontend environment values are compiled into the static build. Set `VITE_HOLDING_PAGE_ENABLED=true` to show the holding page and set `VITE_HOLDING_PAGE_BYPASS_KEY` to enable preview access through `?holding_bypass=<key>`. The bypass is client-side convenience rather than an authorization boundary.

See `apps/web/.env.example` for the complete frontend configuration.

## 5. API Environment

Provide these values outside the source artifact:

- `NODE_ENV=production`
- `MONGO_URI`
- `SESSION_SECRET`
- `APP_URL`
- `TRUST_PROXY_HOPS`
- `SES_REGION=eu-west-1`
- `SES_FROM_EMAIL`
- `EMAIL_DELIVERY=ses`

Set `APP_URL` to the public CloudFront-backed HTTPS origin. Verify the proxy-hop count against the deployed request path because it affects secure-cookie detection and IP rate limiting.

Use the Elastic Beanstalk instance role for SES rather than shipping AWS access keys.

## 6. CI/CD

Production uses separate `browser-heroes-api` and `browser-heroes-web` pipelines sourced from `main` through the existing GitHub CodeStar connection. Both pipelines run their affected lint, typecheck, test, and build tasks.

The API pipeline emits the standalone Beanstalk bundle and deploys it with the native Elastic Beanstalk action. Elastic Beanstalk checks `/api/health` when evaluating the deployed environment. The web pipeline builds with the holding page enabled, syncs normal documents with `no-cache`, syncs hashed assets with immutable one-year caching, and invalidates the CloudFront entry document.

The new AWS resources are defined in `infra/cloudformation/production.yml`. The existing CloudFront distribution is intentionally not adopted into that stack; update it only after the new S3 and API origins are healthy.

## 7. Atlas and Rollback

Give the application a dedicated Atlas database user. The initial single-instance Beanstalk environment receives an Elastic IP; add that address as the sole Atlas network allowlist entry and do not allow `0.0.0.0/0`. If the environment later becomes load-balanced, replace this with stable NAT egress or PrivateLink.

Enable the backup capability available to the chosen Atlas tier and test restoration.

Retain versioned frontend and API artifacts. A rollback should restore the previous Elastic Beanstalk application version and S3 artifact, then invalidate the frontend entry document. Database changes must remain compatible with at least the current and previous application versions.
