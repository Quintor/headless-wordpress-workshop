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
curl -H "Content-Type: application/json" http://localhost:8081/wp-json/menus/v1/menus/menu-1
```

When the installation process completes successfully:

- The WordPress REST API is available at <http://localhost:8081>
- The WordPress admin is at <http://localhost:8081/wp-admin/> default login credentials `admin` / `Quintor!`

## React Frontend

- `cd ../`
- `npx create-react-app frontend`
- `cd frontend`
- Add typescript

  ```sh
  npm install --save typescript @types/node @types/react @types/react-dom @types/jest
  # or
  yarn add typescript @types/node @types/react @types/react-dom @types/jest
  ```

- Install dependencies and start

  ```sh
  npm install && npm start
  ```

- Enjoy Star Wars movies!

## Outline

- presenation about what & why headless cms
- handson
  - start wordpress with docker
  - config custom post movies
  - create custom fields
  - add movies in wordpress
  - check data in postman
  - add postman test?
  - create react app
    - add typescript (optional?)
  - add add api call
  - show simple list
  - create movie component
  - add styling (material?)
- demo next level with sitecore jss
- headless cms challenges check with Arjen, Kramp en Essent

## Tips

<https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935>

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
