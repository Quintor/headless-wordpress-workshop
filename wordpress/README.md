# WPDC - Wordpress Docker Compose

Based on Wordpres 5 with following plugins installed:

    * Advanced Custom Fields
    * CPT UI
    * ACF TO REST
    * wp-rest-api-v2-menus

## Starting a new project

Make sure you have the latest versions of **Docker** and **Docker Compose** installed on your machine.
Copy the files from this repository into a blank folder. In the **docker-compose.yml** file you may change the IP address (in case you run multiple containers) or the database from mysql to mariadb.

Make sure to add your user to the docker group when using linux:
<https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user>

##### Create containers

Open a terminal and _cd_ to the folder you have the docker-compose.yml and run:

```sh
docker-compose up
```

This create 2 new folders beside your docker-compose.yml file.

- **wp-data** - used to store and restore database dumps
- **wp-app** - the location of your Wordpress application

The containers are now build and running. You should be able to access the Wordpress installation with the configured IP in the browser address. For convenience you may add a new entry into your hosts file.

##### Starting containers

You can start the containers with the up command in daemon mode (by adding **-d** as a param) or by using the start command:

```sh
docker-compose start
```

##### Stopping containers

```sh
docker-compose stop
```

##### Remove containers

To stop and remove all the containers use the **down** command

```sh
docker-compose down
```

Use **-v** if you need to remove the database volume which is used to persist the database:

```sh
docker-compose down -v
```

## Creating database dumps

```sh
./export.sh
```

---

## WP CLI

The docker compose configuration also provides a service for using the [Wordpress CLI](https://developer.wordpress.org/cli/commands/).

Sample command:

```sh
docker-compose run --rm wpcli plugin list
```

For an easier usage you may consider adding an alias for the CLI:

```sh
alias wp="docker-compose run --rm wpcli"
```

This way you can use the CLI command above as follows:

```sh
wp plugin list
```
