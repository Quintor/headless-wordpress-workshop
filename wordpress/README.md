# WPDC - Wordpress Docker Compose

Based on Wordpres 5 with following plugins installed:

- Advanced Custom Fields
- CPT UI
- ACF TO REST
- wp-rest-api-v2-menus
- headless wordpress theme

## Starting a new project

Make sure you have the latest versions of **Docker** and **Docker Compose** installed on your machine.
Copy the files from this repository into a blank folder. In the **docker-compose.yml** file you may change the IP address (in case you run multiple containers) or the database from mysql to mariadb.

Make sure to add your user to the docker group when using linux:
<https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user>

## Configuration

Edit the `.env` file to change the default IP address, MySQL root password and WordPress database name.

## Installation

Open a terminal and `cd` to the folder in which `docker-compose.yml` is saved and run:

```sh
docker-compose up
```

This creates two new folders next to your `docker-compose.yml` file.

- `wp-data` – used to store and restore database dumps
- `wp-app` – the location of your WordPress application

The containers are now built and running. You should be able to access the WordPress installation with the configured IP in the browser address. By default it is `http://127.0.0.1:8081`.

For convenience you may add a new entry into your hosts file.

## Usage

### Starting containers

You can start the containers with the up command in daemon mode (by adding **-d** as a param) or by using the start command:

```sh
docker-compose start
```

### Stopping containers

```sh
docker-compose stop
```

### Remove containers

To stop and remove all the containers use the **down** command

```sh
docker-compose down
```

Use **-v** if you need to remove the database volume which is used to persist the database:

```sh
docker-compose down -v
```

### The uploaded file could not be moved to wp-content/uploads

<https://github.com/docker-library/wordpress/issues/162>

```sh
docker-compose exec wp /bin/bash
## in the containter
chown -R www-data:www-data ./wp-content/uploads
```

## Creating database dumps

```sh
./export.sh
```

---

## WP CLI

The docker compose configuration also provides a service for using the [WordPress CLI](https://developer.wordpress.org/cli/commands/).

Sample command to install WordPress:

```sh
docker-compose run --rm wpcli core install --url=http://localhost --title=test --admin_user=admin --admin_email=test@example.com
```

Or to list installed plugins:

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

## phpMyAdmin

You can also visit `http://127.0.0.1:8080` to access phpMyAdmin after starting the containers.

The default username is `root`, and the password is the same as supplied in the `.env` file.

## Import / Export

## CPT UI

Import [CPT Movies Data](./import-data/cpt-movies-export.json) on the [Custom Post Type UI Tools](http://127.0.0.1:8081/wp-admin/admin.php?page=cptui_tools) page.

On this page you can also export your CPT configuration.

### ACF

Import [ACF export](./import-data/acf-export-2019-01-22.json) on the [Advanced Custom Fields Tools](http://127.0.0.1:8081/wp-admin/edit.php?post_type=acf-field-group&page=acf-tools) page.

On this page you can also export your ACF configuration.

### Movies & Pages

#### Import

You can choose between import though the interface or with the wp-cli

- [Wordpress import](http://127.0.0.1:8081/wp-admin/admin.php?import=wordpress)
- `cp ./import-data/wp-movies-page.xml ./wp-app/ && docker-compose run --rm wpcli import ./wp-movies-page.xml --authors=skip`
  - more info on [import command](https://developer.wordpress.org/cli/commands/import/)

#### Export

Export `docker-compose run --rm wpcli export --skip_comments --post_type=movies,page` , more info on [export command](https://developer.wordpress.org/cli/commands/export/)

### Menu

Import `cp ./import-data/wp-menu.xml ./wp-app/ && docker-compose run -rm wpcli import ./wp-menu.xml --authors=skip`

Export `docker-compose run --rm wpcli export --post_type=nav_menu_item --post_status=publish`
