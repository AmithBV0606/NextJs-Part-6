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

- In actual enterprise apps, you're usually pullng data from external sources.

- The App router is built on React Server Components (RSC) architecture which gives us the flexibility to fetch data using either server components or client components.

- It is usually preferable to use server components for data operations because :

    - You can directly communicate with your databases and file systems on the server side.
    - You get better performance since you're closer to your data sources.
    - Your client-side bundle stays lean because the heavy lifting happens server-side.
    - Your sensitive operations and API keys remain secure on the server.

## Fetching Data in Client Components

- Use Client component for data fetching only when you absolutely need to, like when you need realtime updates or when your data depends on client side interactions that you can't predict on the server side.

- Refer `users-client/page.tsx` file for demo.