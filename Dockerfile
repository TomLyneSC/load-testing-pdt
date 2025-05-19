FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY main.go ./
COPY go.mod ./

RUN CGO_ENABLED=0 go build -a -ldflags '-s' -o api

FROM scratch
COPY --from=builder app/api ./

CMD [ "./api" ]

EXPOSE 8080