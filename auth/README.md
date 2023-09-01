# Auth service - Service for user/session management (WIP)

### Create .env file

```bash
cp .env.example .env
```

### Create jwt key

```bash
make jwt
```

## Usable technologies, with checklist to be implemented

- Framework - [Nestjs](https://nestjs.com/)
- Token - [Paseto](https://www.npmjs.com/package/paseto)
- Database - [Postgresql](https://www.postgresql.org/)
- For communicate internal service - [gRPC](https://grpc.io/docs/languages/node/)
