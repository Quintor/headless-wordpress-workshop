# Headless WordPress with react 

- `npm install -g create-react-app`
- `cd wordpress`
- `docker-compose up`
    - sometimes starting up the database takes to long. Try to manual restart the docker container. 
    - `docker ps -a`
    - look for the stopped wordpress container
    - `docker restart wordpressdockercompose_wordpress_1` or use `docker restart $CONTAINER ID`
- check if wordpress api is working
    - `curl -H "Content-Type: application/json" http://localhost/wp-json/wp/v2/movies/21?_embed`
- `cd ../frontend`
- `npm install && npm start`
- Enjoy Star Wars movies!

## Wordpress admin

User: admin
WW: Quintor!