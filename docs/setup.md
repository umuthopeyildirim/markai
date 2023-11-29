# Markflare Setup

## Requirements

-   [Clerk](https://clerk.dev) for authentication
-   [Supabase Project](https://supabase.com) for database and vector search
-   [Cloudflare Account](https://cloudflare.com) (Optional) for custom domain and AI Gateway(Monitoring)
-   [Vercel Account](https://vercel.com) for deployment, CI/CD and serverless functions
-   [OpenAI API Key](https://openai.com) for AI API calls

## Setup

Convert the `.env.example` file to `.env.local` and fill in the required values.

### 1. Create a Supabase Project

MarkAI uses Supabase for database and vector search. Create a Supabase project and copy the URL and API Key. Paste secrets in `.env.local` make sure they are correctly formatted. Copy SQL from `tables.sql` and run it in the Supabase SQL editor. This will create the required tables and functions.

### 2. Create a Clerk Application

MarkAI uses Clerk for authentication. Create a Clerk application and copy the API Key. Paste secrets in `.env.local` make sure they are correctly formatted.
After creating the application, go to [this docs page and follow the instructions to setup the application](https://clerk.com/docs/integrations/databases/supabase).
Don't forget to activate organizatiions and teams in the Clerk dashboard.

### 3. OpenAI API Key

MarkAI uses OpenAI for AI API calls. Create an OpenAI account and copy the API Key. Paste secrets in `.env.local` make sure they are correctly formatted.

### Midpoint Check

After last step MarkAI should be able to run locally. Run `npm run dev` and check if the application is running. If it is not, check if all the secrets are correctly formatted and saved in `.env.local`.

### 4. Deploy to Vercel

MarkAI uses Vercel for deployment, CI/CD and serverless functions. Create a Vercel account and connect it to your GitHub account. Create a new project and connect it to your GitHub repository. Make sure the Vercel project is connected to the correct repository and branch. Add the secrets from `.env.local` to the Vercel project. Make sure they are correctly formatted. Deploy the project to Vercel.
