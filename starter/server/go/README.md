# Office Hours Starter

An [Echo](https://echo.labstack.com/) implementation.

## Requirements

* Go
* [stripe-go](https://github.com/stripe/stripe-go)
* [Echo](https://echo.labstack.com/guide/installation)
* [godotenv](https://github.com/joho/godotenv)
* [Configured .env file](../README.md)

## How to run

1. Install dependencies

```
go get -u github.com/labstack/echo/...
go get github.com/joho/godotenv
go get -u github.com/stripe/stripe-go
go get github.com/foolin/goview
```

2. Run the application

```
go run server.go
```

3. Go to `localhost:4242` in your browser to see the demo
