# Giphy Diary

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## This project has been an experiment to understand Next.js & [Prisma](https://www.prisma.io/)
It claims to give the best developer experience and I cannot agree more. Allows the developer to focus in building instead of setting up. For example, it was a matter of `yarn add -D sass` and change the `.css` files to `.scss` to continue the styling development with Sass. No configs.

My favourite part was to see that I had the pages structure and a Full REST API ready to go. Naming conventions can be really powerful for a quick start. This remind me my first time with Ruby on Rails. 🥰
As all new software it has got a backlog to work on like the annoying example bellow. The images domains cannot be a wildcard 😅.
```js
module.exports = {
    // ideally *.giphy.com
    images: {
        domains: ['media0.giphy.com', 'media1.giphy.com', 'media2.giphy.com', 'media3.giphy.com', 'media4.giphy.com', 'media5.giphy.com', 'media6.giphy.com'],
    },
}
```
Also I find very useful ALL the examples in github. That's a [BIG REPO](https://github.com/vercel/next.js/tree/canary/examples) with a long list of the most popular technology although I could not find how to unit test my API in that list. Seems like they've got cover the UI with jest and cypress but I had to google it. After having a quick look to this [post](https://seanconnolly.dev/unit-testing-nextjs-api-routes) it seems very straight forward. 🤷

One of mind blowing features is the [SSR and SSG](https://blog.logrocket.com/ssg-vs-ssr-in-next-js/). Having said that it was interesting to understand the solutions for shared state with Redux.

In conclusion, I think is a really good framework for new and veteran developers for quick up and run project that keeps you on the right track. 

# What to expect from this project
It's a small app that creates and "signs in" user with a unique username, allows the user to save a list of favourites gif served from Giphy.
Shared state is implemented with useContext for simplicity. 
> **Attention!** On refresh you need to Log in again

## What not to expect
Heavy error handling
Testing
Routing handling
Style system
Strict typing

## Getting Started

First, generate db schema:

```bash
yarn db:schema:gen
```

Second, update Giphy API Key in next.config.js:
```js
module.exports = {
    env: {
        GIPHY_API_KEY: "YOUR_API_KEY"
    }
}
```

Third, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Improvements


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
