# Production infrastructure

`cloudformation/production.yml` defines the low-cost production resources in `eu-west-2`:

- private, versioned `browser-heroes` frontend bucket and CloudFront OAC
- the `browserheroes.com` CloudFront distribution and its frontend, API, and socket behaviors
- single-instance Node.js 22 Elastic Beanstalk API
- API and frontend CodeBuild projects and CodePipelines
- scoped runtime/build roles, short log retention, and expiring pipeline artifacts
- generated session secret and an external MongoDB URI secret reference
- permission to send through the existing verified eu-west-1 SES domain identity

The API build produces a standalone JavaScript bundle. Its deployment manifest installs only `argon2`, the native password-hashing dependency that cannot be included in that bundle.

## Prerequisites

Before creating the stack:

1. Create a Secrets Manager JSON secret with key `MONGO_URI` and the production Atlas URI as its value. Do not store the URI in this repository or a shell history file.
2. Confirm SES production access in `eu-west-1` for the verified `browserheroes.com` identity.
3. Push the buildspec and infrastructure changes to `main`; creating the pipelines before those files exist remotely causes their first executions to fail.

## Deployment sequence

1. Validate and create a reviewed CloudFormation change set with `CAPABILITY_IAM`, passing `MongoUriSecretArn` without exposing its value and `AdminEmail` for the registered operator account.
2. Execute the stack and wait for the Beanstalk sample environment to become healthy.
3. Add the environment's Elastic IP to the Atlas network allowlist.
4. Release the API pipeline and verify `/api/health` directly through the Beanstalk origin.
5. Release the web pipeline and verify the game through `https://browserheroes.com`.
6. Release the admin pipeline and verify the allowlisted sign-in flow through `https://browserheroes.com/admin`, then test API/socket paths.

CloudFront terminates viewer HTTPS while the low-cost single-instance API origin remains HTTP-only. The API origin request policy forwards `CloudFront-Forwarded-Proto` so Express can issue secure session cookies using the original viewer protocol. Cookies and query strings are forwarded for both `/api/*` and `/socket.io/*`, with caching disabled.
