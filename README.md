# About News Aggregator Frontend

```
cd frontend
docker-compose up -d
```

This buid and start the container

```
docker-compose up --build
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
