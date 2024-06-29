This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

Add .env file with your supabase url and key

```javascript
# Update these with your Supabase details from your project settings > API
# https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

```

Next, Install the dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The website should encompass the following functionalities: 

### Secure User Login and Registration 
- I used supabase as it uses brcrypt and jwt together with supabase's cookie based authentication

### Form for adding/editing records 
- I used supabase's realtime subscription to update the table in realtime

### Table to display records with search filter
- sort and search filter is available

### Contact Us form 
- /contact is a form that sends a message to my email

### About Us page 
- /about is a page that explains about the project

## Security Requirements: 
### Implement secure user registration and login functionalities. Utilize secure hashing algorithms like bcrypt for password storage and avoid storing passwords in plain text. 
- I used supabase as it uses brcrypt and jwt

### Secure Data Storage: Explain how you plan to securely store data retrieved from the remote API. Consider using a secure database solution and encrypting sensitive data at rest.
- I used supabase, a Firebase alternative which uses relational database
### User Access Control: Implement user access control mechanisms (e.g., JWT tokens) to ensure only authorized users can create, read, update, and delete data. 
- cookie based authentication (wasn't able to finish the delete part)
### Input Validation: Validate all user input on the server-side to prevent vulnerabilities like Cross-Site Scripting (XSS) and SQL Injection. 
- validated registration and login

