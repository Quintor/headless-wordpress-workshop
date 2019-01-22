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

## Docker

Before you install WordPress, make sure you have [Docker](https://www.docker.com) installed. On Linux, you might need to install [docker-compose](https://docs.docker.com/compose/install/#install-compose) separately.

## Onward!

Okay, so now that we’ve established this awesome stack, let’s dive in!

### What We’ll Be Building

For this tutorial, we’ll be building a simple app that displays data about each of the Star Wars movies. The data will be supplied by a WordPress REST API we’ll build, and we’ll consume it with a React frontend built with Next.js

### Step One: Start the WordPress Installation

The following commands will get WordPress running on your machine using Docker, along with the WordPress plugins you'll need to create and serve custom data via the WP REST API.

```sh
cd wordpress
```

Start docker containers with docker compose

```sh
docker-compose up
```

Once you have your new WordPress install set up, go ahead and visit your admin dashboard. The WordPress admin is available at <http://localhost:8081/wp-admin/> default login credentials `admin` / `Quintor!`

![Look at that fancy new install! ✨](./images/dashboard.png)

### Step Two: Sanity Check

Fire up your favorite API request tool (I like to use Postman) or a Terminal window if you prefer.

When the installation process completes successfully, the WordPress REST API is available at <http://localhost:8081/wp-json/>:

```sh
curl -H "Content-Type: application/json" http://localhost:8081/wp-json/wp/v2/posts/1?_embed
```

### Step Three: Setup WP plugins for this project

The next thing to do is setup the plugins we’ll need for this awesome project. Go ahead and install these and then come back for the explanation of each.

#### [CPT UI](https://wordpress.org/plugins/custom-post-type-ui/)

Custom Post Types (CPTs) is one of the most powerful features of WordPress. It allow you to create custom content types to go beyond the default Posts and Pages that WordPress ships with.

While it’s certainly possible (and pretty trivial) to create CPTs via PHP, I really like how easy CPT UI is to use. Plus, if you’re reading this with no prior WordPress experience, I’d rather you be able to focus on the WP-API itself instead of WordPress and PHP.

For our app, we’ll be creating a CPT called `Movies`.

We are going to cover how to manually add the `Movies` CPT, but if you’d like to skip that and just import the data, go to [CPT UI>Tools](http://127.0.0.1:8081/wp-admin/admin.php?page=cptui_tools) and paste in the following file:

[./wordpress/import-data/cpt-movies-export.json](./wordpress/import-data/cpt-movies-export.json)

Now for the manual process:

1. Go to [CPT UI>Add/Edit Post Types](http://127.0.0.1:8081/wp-admin/admin.php?page=cptui_manage_post_types)
1. For the Post Type Slug, enter `movies`  —  this is the URL slug WordPress will use.
1. For the Plural Label, enter `Movies`
1. For the Singular Label, enter `Movie`
1. **IMPORTANT:** Scroll down to the Settings area and find the _“REST API base slug”_ option,  you should enter `movies` here.
1. Scroll all the way down and select `Categories (WP Core)` in _Built-in Taxonomies_
1. You can click Add Post Type.

You should see a new Movies option appear in the sidebar:

![](./images/movies.png)

#### [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/)

Speaking in database terms, if CPTs are the tables, Custom Fields are the columns. This isn’t actually how WordPress stores CPTs and Custom Fields in its database, but I find this illustration helpful to those who have limited to no WordPress experience. CPTs are the resource (i.e. _“Movies”_) and Custom Fields are the metadata about that resource (i.e. _“Release Year, Rating, Description”_).

Advanced Custom Fields (ACF) is the plugin for WordPress Custom Fields. Of course, you can create Custom Fields with PHP (just like CPTs), but ACF is such a time-saver (and it's a GUI 😇).

Because the manual setup of ACF takes a while, we are going to use the import functionality 😉. Go to [Custom Fields>Tools](http://127.0.0.1:8081/wp-admin/edit.php?post_type=acf-field-group&page=acf-tools). You then import the following file: [./wordpress/import-data/acf-export-2019-01-22.json](./wordpress/import-data/acf-export-2019-01-22.json)

After the import you should see `Movie Data` in _Custom Fields_:

![](./images/acf.png)

#### [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/)

Now that we have our Custom Fields, we need to expose them to the WP-API. ACF doesn’t currently ship with WP-API support, but there’s a great plugin solution from the community called ACF to REST API. All you have to do is install and activate it (we have done this for you 😉), and it will immediately expose your ACF custom fields to the API.

If we had created our Custom Fields directly via PHP (without the use of a plugin), there’s also a couple of nifty functions for exposing the field to the API. [More on that here](https://developer.wordpress.org/rest-api/extending-the-rest-api/modifying-responses/).

### Step Four: Post Data Import

First, we need to import all the Movies. Lucky for you, We already did all the manual work and all you have to do is import a nifty file. :-)

Go to [Tools>Import](http://127.0.0.1:8081/wp-admin/admin.php?import=wordpress). You should see a link to run the importer. Click that and import this file: [./wordpress/import-data/wp-movies-page.xml](./wordpress/import-data/wp-movies-page.xml).

The next screen will ask you to assign the imported posts to an author. You can just assign them to your default admin account and click Submit:

![](./images/import.png)

Lastly, go to [Movies>All Movies](&paged=1&trashed=8&ids=1433%2C21%2C20%2C19%2C18%2C17%2C16%2C15&locked=0). You should see a listing of Star Wars movies (Episodes 1–8)

![](./images/movies-posts.png)

### Step Five: Setup menu

This is the last step to get our WordPress installation ready to serve our Star Wars data.

We want our users enable to navigate through our awesome website. Luckily wordpress has us covered. Go to [Apprearance>Menus](http://127.0.0.1:8081/wp-admin/nav-menus.php).

You can choose to create a menu manually or use the import tool. To import the menu navigate to [Tools>Import](http://127.0.0.1:8081/wp-admin/admin.php?import=wordpress) and use the following file [./wordpress/import-data/wp-menu.xml](./wordpress/import-data/wp-menu.xml)

To create menu manually add the pages _"About Us, Over star wars"_ to the menu. Next click on _"Categories"_ in the accordion and the the three Star wars categories to the menu. You should also check _"Header Menu"_ in _"Display location"_. Don't forget to save 😇!

![](./images/menu.png)

We should also check if the menu appears in the WP Rest API

```sh
curl -H "Content-Type: application/json" http://localhost:8081/wp-json/menus/v1/menus/header-menu
```

Now you’re good to go! Now leave your WordPress server running and let’s move on.

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
  - Add a post route + component
  - Make the header menu dynamic ()
  - Add a component and route for your custom
  - Add categories
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
