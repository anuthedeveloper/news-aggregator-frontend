# About News Aggregator Frontend

```
cd frontend
docker-compose up -d
```

This buid and start the container

```
docker-compose up --build
```

Start up the container and migrate the database tables

```
docker-compose up -d
docker exec -it laravel-app php artisan migrate

```

Run the scrape news command to save data locally

```
docker exec -it laravel-app php artisan scrape:news
```

container name: react-container

If you're running the container without Docker Compose, you can specify the name using the --name flag like this:

```
docker run --name react-container -p 3000:3000 react-app
```

To check the container running

```
docker ps
```
