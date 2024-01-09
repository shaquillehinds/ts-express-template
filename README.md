## Node Version 18 Required

## Required Env Vars

#### You can copy and paste this into your .env and provide the values each variable

```
# secret for jwt signing
SECRET=sha256Secret
MONGO_URI=mongodbLink
PORT=4000

# replace SET fields with appropriate data found in service account json file.
SERVICE_ACCOUNT_CREDENTIALS='{"type":"service_account","project_id":"SET_PROJECT_ID","private_key":"SET_PRIVATE_KEY_HERE","client_email":"SET_EMAIL","client_id":"SET_CLIENT_ID","universe_domain":"googleapis.com"}'
```

## Optional Env Vars

```
# The allowed frontend application version. Accepts one version or multiple versions that can be separated by commas
# e.g "1.0.1,1.0.2,1.0.3"
VERSION=
```

Download your own serviceAccountKey to get the private key for the SERVICE_ACCOUNT_CREDENTIALS https://console.cloud.google.com/iam-admin/serviceaccounts

## Commands

Yarn is being used for this project, npm can be used as well but for the integrity of the lock file commits use yarn.

- `yarn docker:dev` - starts nodemon server in a docker container in development mode
- `yarn docker:test` - runs jest in a docker container to simulate cloud test
- `yarn docker:stripe:listen` - starts a local listener for stripe webhooks in a docker container
- `yarn dev` - starts local nodemon server in development mode
- `yarn dev:prod` - starts nodemon server in production mode
- `yarn build` - compiles the typescript in src folder and outputs it to dist folder
- `yarn start` - starts node server in production mode from dist folder
- `yarn start:staging` - starts node server in staging mode from dist folder
- `yarn test` - runs jest with runInBand mode and collects coverage
- `yarn test:ci` - runs jest with runInBand mode without coverage report
- `yarn test:positive` - runs jest for positive test cases with runInBand mode
- `yarn test:negative` - runs jest for negative test cases with runInBand mode
- `yarn load:test` - runs artillery from artillery.yml file
- `yarn postman:export:collection` - exports a postman collection in the src/postman folder

### Automated Testing Procedures:

Automated testing uses software tools to run a suite of tests without human intervention.

1. **Automated Regression Testing:**
   - Implement automated tests to check critical workflows after updates to ensure no existing features are broken.
   - Use Continuous Integration (CI) tools to automate regression tests after every commit or periodically.
2. **API Testing Automation:**
   - Develop automated tests for API endpoints, including positive, negative, and destructive scenarios as outlined in the provided table.
   - Implement tests for performance sanity to ensure APIs respond within acceptable time frames, especially under load.

### Regressions

Sometimes an update to the app will break a feature that used to work. That is why we must run the full automated test suite each time and re-run through these tests each time at minimum before we send it to the Stakeholders for review.
