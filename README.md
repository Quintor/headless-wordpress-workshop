# Headless WordPress with react

- `cd wordpress`
- `docker-compose up --build`
  - sometimes starting up the database takes to long. Try to manual restart the docker container.
  - `docker ps -a`
  - look for the stopped wordpress container
  - `docker restart wordpressdockercompose_wordpress_1` or use `docker restart $CONTAINER ID`
- check if wordpress api is working
  - `curl -H "Content-Type: application/json" http://localhost/wp-json/wp/v2/movies/21?_embed`
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
