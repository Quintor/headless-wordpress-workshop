# Headless WordPress with react

- `cd wordpress`
- `docker-compose up`

  - sometimes starting up the database takes to long. Try to manual restart the docker container.
  - `docker ps -a`
  - look for the stopped wordpress container
  - `docker restart wordpressdockercompose_wordpress_1` or use `docker restart $CONTAINER ID`

- check if wordpress api is working
  - `curl -H "Content-Type: application/json" http://localhost:8081/wp-json/wp/v2/movies/21?_embed`
  - `curl -H "Content-Type: application/json" http://localhost:8081/wp-json/menus/v1/menus/menu-1`
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
  # or
  yarn start
  ```

- Enjoy Star Wars movies!

## Wordpress admin

User: admin
WW: Quintor!

## Requirements

- vscode
- docker
- node 10, npm 6
- yarn optional
- postman optional

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

`docker system prune --volumes -a`

## Troubleshooting

- If on a windows machine plugins aren't loaded in Wordpress, follow these steps:
  - Open Docker settings
  - Go to 'Shared Drives' tab
  - Click on 'Reset Credentials'
  - Select the drive you want to share
  - Click apply
  - Enter windows credentials
