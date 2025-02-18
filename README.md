# About News Aggregator Frontend

```
cd frontend
docker-compose up -d
```

This build and start the container

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

Access the frontend via localhost:3000
Public view:
```
docker pull anuthedeveloper/react-app:v1
```
