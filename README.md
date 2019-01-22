# Headless WordPress with react

## What's inside

- A WordPress installation with:
  - [Gutenberg](https://wordpress.org/gutenberg/), WordPress' next-generation post editor
  - [Advanced Custom Fields](https://www.advancedcustomfields.com/) and [Custom Post Type UI](https://wordpress.org/plugins/custom-post-type-ui/).
  - Plugins which expose ACF fields and WordPress menus in the [WP REST API](https://developer.wordpress.org/rest-api/) ([ACF to WP API](https://wordpress.org/plugins/acf-to-wp-api/) and [WP-REST-API V2 Menus](https://wordpress.org/plugins/wp-rest-api-v2-menus/)).
  - All the starter WordPress theme code and settings headless requires, including pretty permalinks, CORS `Allow-Origin` headers, and useful logging functions for easy debugging.
- A starter frontend React app powered by [Next.js](https://nextjs.org/).
- A [Docker](https://www.docker.com/) compose configuration to manage it

Let's get started.

## Prerequisites

- vscode / webstorm
- docker
- node 10, npm 6
- yarn optional
- postman optional

## Wordpress Backend

Before you install WordPress, make sure you have [Docker](https://www.docker.com) installed. On Linux, you might need to install [docker-compose](https://docs.docker.com/compose/install/#install-compose) separately.

### Install

The following commands will get WordPress running on your machine using Docker, along with the WordPress plugins you'll need to create and serve custom data via the WP REST API.

```sh
cd wordpress
```

- start docker containers

```sh
docker-compose up
```

- check if wordpress api is working / or use postman

```sh
curl -H "Content-Type: application/json" http://localhost:8081/wp-json/wp/v2/movies/21?_embed
curl -H "Content-Type: application/json" http://localhost:8081/wp-json/menus/v1/menus/header-menu
```

When the installation process completes successfully:

- The WordPress REST API is available at <http://localhost:8081>
- The WordPress admin is at <http://localhost:8081/wp-admin/> default login credentials `admin` / `Quintor!`

## React Frontend

There is a bare bones frontend project to start you off. In order to get it up and running use the following commands.

- `cd frontend`
- `npm install`
- `npm run dev`

- This will start up a dev server on http://localhost:3000

### Tech docs

- [React](https://reactjs.org)
- [Nextjs](https://nextjs.org)
- [Typescript](https://www.typescriptlang.org/)

## List of endpoints

- /wp-json/wp/v2/posts (list of all posts)
- /wp-json/wp/v2/pages (list of all pages)
- /wp-json/wp/v2/categories (list of all categories)
- /wp-json/menus/v1/menus/header-menu
- /wp-json/headless/v1/post?slug= (find single post by slug)
- /wp-json/headless/v1/page?slug= (find single post by slug)

## Frontend assignments

### 1. Listing Posts

To start off we will display a list of posts in the `index.tsx` component. Whatever you return from the `getInitialProps` method is included in `this.props` in the component. There is an API service shell in `wordpress.service.ts` which can be expanded.

- Implement `getPosts` in the API service\
- Use the API service to return posts from `getInitialProps`
- Display the posts in a simple list

List example

```ts
// Rest of component code in index.tsx
render() {
  return (
    <ul>
      {this.props.posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
}
```

### 2. Displayings Posts

Now that we have a list of posts on our main page, we want to be able to navigate to a page with further details. Create a `page.tsx`. Paste the following code in this file:

```ts
import { NextContext } from "next";
import Error from "next/error";
import { Component } from "react";
import Layout from "../components/Layout";
import { IMenuProps } from "../hoc/withHeaderMenu";
import API from "../services/wordpress.service";
import { IWpPost } from "../types/post";

interface IOwnProps {
  post: IWpPost;
}

type IProps = IOwnProps & IMenuProps;

class Post extends Component<IProps> {
  public static async getInitialProps(context: NextContext) {
    const { slug } = context.query;

    const post = await API.getPost(slug as string);
    return { post };
  }

  public render() {
    if (!this.props.post.title) {
      return <Error statusCode={404} />;
    }

    return (
      <Layout>
        <h1>{this.props.post.title.rendered}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: this.props.post.content.rendered
          }}
        />
      </Layout>
    );
  }
}
export default Post;
```

- Implement the `getPost` method in the API service.
- The first parameter of `getInitialProps` is a context, this allowes you to get query string values through `context.query`. In `index.tsx` change your list items into links to this new page.

Example link:

```ts
import Link from 'next/link';

  <Link
    as="/post/post-slug"
    href="/post?slug=post-slug"}
  >
    <a>My Post</a>
  </Link>

```

You can find more information on Nextjs routing [here](https://github.com/zeit/next.js/#routing).

### 3. Displayings Pages

Besides posts wordpress has the build-in content-type pages. Create a `page.tsx` in the pages directory, this page should display the details of a page. Follow the same method you did to implements posts.
Add a menu item linking to one of your pages.

**Tips**

- Implement the `getPages` and `getPage` method in the API service.

### 3. Creating a dynamic menu

Up untill now the menu has been static. Change the `Menu.tsx` component so that the menu can be managed in wordpress.

**Tips**

- Have a look at `hoc/withHeaderMenu`, see how you can use this with your existing components in the pages directory.
- The main menu can be managed in wordpress under `Appearance -> Menus`

### 4. Extra assigments

- Create a page for your own post type.
- Add extra styling.
- Assign categories to your posts, create a category page which shows posts of the selected category.

## Outline

- presenation about what & why headless cms
- handson
  - start wordpress with docker
  - config custom post movies
  - create custom fields
  - add movies in wordpress
  - check data in postman
  - add postman test?
  - setup frontend app
  - Show a list of posts on the index page
  - Implement getPost in services/wordpress.service.ts
  - Add a post route + component
  - Add a page route + component
  - Make the header menu dynamic (see hoc/withHeaderMenu.ts)
  - add styling (material?)
- demo next level with sitecore jss
- headless cms challenges check with Arjen, Kramp en Essent

## Tips

React Typescript:

- [Ultimate React Component Patterns with Typescript 2.8](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)
- [React Typescript Cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet)

Wordpress headless:

- <https://github.com/elevati/wp-api-multiple-posttype>
- <https://react-etc.net/entry/graphql-and-next-js-for-building-wordpress-sites-with-react-js>

Next js:

- <https://nextjs.org/learn/>

## Examples in production

Wordpress & Next js:

- <https://www.worldcentralkitchen.org>
- <https://dinendash.info>

Next js:

- <https://spectrum.chat/next-js?thread=e425a8b6-c9cb-4cd1-90bb-740fb3bd7541>

## Troubleshooting

### Windows & docker volumes

- If on a windows machine plugins aren't loaded in Wordpress, follow these steps:
  - Open Docker settings
  - Go to 'Shared Drives' tab
  - Click on 'Reset Credentials'
  - Select the drive you want to share
  - Click apply
  - Enter windows credentials

### Clean docker state

```sh
docker system prune --volumes -a
```
