# Next-Js by Codevolution : Part-5

### Topics Covered :

- Data Fetching
- Fetching Data in Client Components
- Fetching Data with Server Components
- Loading and Error States
- Sequential Data Fetching
- Parallel Data Fetching
- Fetching From a Database
- Data Mutations
- Forms with Server Actions
- useFormStatus Hook
- useActionState Hook
- Separating Server Actions
- useFormStatus vs useActionState
- Update Server Action
- Delete Server Action
- Optimistic Updates with useOptimistic Hook
- Form Component

### Topics covered so far :

Section 1 : Routing
Section 2 : Rendering

## Data Fetching (Section 3)

- So far, we've been working with hard-coded content in our routes and components.

- In actual enterprise apps, you're usually pulling data from external sources.

- The App router is built on React Server Components (RSC) architecture which gives us the flexibility to fetch data using either server components or client components.

- It is usually preferable to use server components for data operations because :

    - You can directly communicate with your databases and file systems on the server side.
    - You get better performance since you're closer to your data sources.
    - Your client-side bundle stays lean because the heavy lifting happens server-side.
    - Your sensitive operations and API keys remain secure on the server.

## Fetching Data in Client Components

- Use Client component for data fetching only when you absolutely need to, like when you need realtime updates or when your data depends on client side interactions that you can't predict on the server side.

- Refer `users-client/page.tsx` file for demo.

## Fetching Data with Server Components

- The RSC architecture supports async and await keywords in Server Components.

- This means we can write our data fetching code just like regular JavaScript, using async functions coupled with the await keyword.

- Refer `users-server/page.tsx` file for demo.

### Request memoization : 

<img src="./assets/Pic-1.png" />

- This means you can fetch data wherever you need it in your component tree without worrying about duplicate network requests.

- React will only make the actual fetch once and reuses the result for subsequent calls during the same render pass.

- It's a React feature and thereby available in Next.js.

- Lets you write data fetching code exactly where you need it rather than having to centralize fetches and pass data down through props.

## Loading and Error States (In server components)

- While client component requires you to manage these states with separate state variables and conditional rendering, server components make this process much cleaner.

- To implement a loading state, all we need to do is define and export a React component in `loading.tsx`.

```js
export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-t-2 border-white" />
    </div>
  );
}
```

- For handling errors, define and export a React component in `error.tsx`.

```js
"use client";

import { useEffect } from "react";

export default function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.log(`${error}`);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-2xl text-red-500">Error fetching users data!!</div>
    </div>
  );
}
```

**NOTE :** `error.tsx` should always be a client component.

- In summary, to manage data fetching states add a `loading.tsx` file with the React component for the loading state and an `error.tsx` file with a client component to handle error states.

### Data Fetching patterns 

- When fetching data inside components, you need to be aware of two data fetching patterns :

    1. Sequential Data Fetching 
    2. Parallel Data Fetching 

## 1. Sequential Data Fetching

- In sequential data fetching, requests in a component tree are dependent on each other. This can lead to longer loading time.

### Demo 

- We'll create a Post component.

    - Fetches all posts from `https://jsonplaceholder.typicode.com/posts` endpoint.
    - For each post, fetch author using the userId property from `https://jsonplaceholder.typicode.com/users` endpoint..
    - This would be the perfect example of sequential data fetching because we need the userId from each post before we can fetch it's author.

**Summary :** First we fetch all posts from `https://jsonplaceholder.typicode.com/posts`. Then for each post we render, we make another fetch request to fetch its author's details from `https://jsonplaceholder.typicode.com/users` edpoint. Each author's request has to wait for the post request to complete because we need the user Id from the individual post.

## 2. Parallel Data Fetching

- In parallel data fetching, requests in a route are eagerly initiated and will load data at the same time. This reduces the total time it takes to laod the data.

- Parallel data fetching is particularly useful when you have multiple independent pieces of data that you need to fetch. 

- Instead of fetching them one after another, you can fetch them all at once and reduce the total loading time.

## Parallel Data Fetching

- We've looked at how to fetch data from API endpoints using the Fetch API.

- Let's dive into fetching data from a database in Server Components.

- What we're about to cover is super important - it's the foundation for data mutations and server actions coming up next.

- Two key reasons why fetching data directly from a database is powerful:

  1. Server Components have direct access to server-side resources, which makes database interactions seamless.

  2. Since everything happens on the server, we don't need API routes or worry about exposing sensitive information to the client.

- We're going to be working with two super helpful tools - SQLite and Prisma.

<ins>**SQLite**</ins>

  - A simple, file-based database to store information in your project.
  - It doesn't require a server or a complex setup and it's perfect for learning and prototyping.
  
<ins>**Prisma**</ins>

  - A tool that makes it really easy to talk to your database
  - It's like a translator that helps your code communicate with SQLite.

### Demo/Setup (Prisma + SQLite) :

- Install prisma-cli as dev dependency.

```bash
npm install prisma -D
```

- Initialize prisma with SQLite

```bash
npx prisma init --datasource-provider sqlite
```

- After running the above command there would be a folder named `prisma` would be generated.

- After adding the models inside `prisma/schema.prisma` file, run a migration to create the database tables from the Prisma's schema, by running the following command.

```bash
npx prisma migrate dev --name init
```

- Then create a file named `prisma-db.ts` in the root folder. Inside that file, initialize the prisma client and define the methods which performs the CRUD operations on our SQLite database.

- Then, inside the app folder create a route called `products-db` and inside that route create a file named `page.tsx`, where you can write a server component which can talk to our database directly.