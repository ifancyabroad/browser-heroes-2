# Production infrastructure

`cloudformation/production.yml` defines the low-cost production resources in `eu-west-2`:

- private, versioned `browser-heroes` frontend bucket and CloudFront OAC
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

1. Validate and create a reviewed CloudFormation change set with `CAPABILITY_IAM`, passing `MongoUriSecretArn` without exposing its value.
2. Execute the stack and wait for the Beanstalk sample environment to become healthy.
3. Add the environment's Elastic IP to the Atlas network allowlist.
4. Release the API pipeline and verify `/api/health` directly through the Beanstalk origin.
5. Update distribution `E1SBYI7G6KFV8U`:
    - replace the default origin with the new private S3 regional origin and OAC
    - point `/api/*` and `/socket.io/*` at the Beanstalk domain over HTTP
    - redirect viewer HTTP to HTTPS for both API behaviors
    - preserve disabled caching and forwarded cookies, headers, and query strings
    - remove the legacy `/admin*` behavior and global 404-to-index rewrite
6. Release the frontend pipeline, verify the holding page through `https://browserheroes.com`, then test the bypass flow and API/socket paths.

The CloudFront update remains separate because the distribution predates this stack and serves the live domain. This keeps the initial change reviewable and avoids importing a legacy global resource during the first deployment.
