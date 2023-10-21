# Url Shortener :tada:

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Build a service for shortening url, idea will generate a unique ID (Twitter snowflake) and convert that unique id (base10) to base64

- Backend service: Golang (1.20) - [README](./backend/README.md)
- Telegram Notify service: Golang (1.20) - [README](./telegram-notify/README.md)
- Expiration service: Python - [README](./expiration/README.md)
- Auth service: Nodejs - [README](./auth/README.md)
- Frontend: ReactJs (18.2.0) - [README](./web-app/README.md)


## Setup
- Build images
```bash
# Build auth service
$ cd ./auth && docker build -t auth-service -f Dockerfile .

# Build core service
$ cd ./backend && docker build -t core-service -f Dockerfile .
```
- Install helm chart
```bash
# Auth service
$ cd ./infra/auth-service && helm install auth-service . -f values.yaml
```
```bash
# Postgresql DB
$ cd ./postgresql && helm install postgresql-db . -f values.yaml
```
```bash
# To get the password for "postgres" run:
$ export POSTGRES_PASSWORD=$(kubectl get secret --namespace default postgresql -o jsonpath="{.data.postgres-password}" | base64 -d)

# Display password
$ env | grep POSTGRES_PASSWORD

# To connect to your database from outside the cluster execute the following commands:
$ kubectl port-forward --namespace default svc/postgresql-db 5432:5432 &
    PGPASSWORD="$POSTGRES_PASSWORD" psql --host 127.0.0.1 -U postgres -d url_shortener -p 5432
```

- Exec pod
```bash
# Example exec pod of auth service
$ kubectl exec -it {pod name} -- sh
```

- For test, but without setup Kong Gate. We need forwarding port to check, example for auth service
```bash
$ make forwardport
```

## The project is still in progress (WIP :rocket:)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://nguyendai.dev/"><img src="https://avatars.githubusercontent.com/u/37446552?v=4?s=100" width="100px;" alt="Dai Nguyen"/><br /><sub><b>Dai Nguyen</b></sub></a><br /><a href="https://github.com/ngtrdai197/url-shortener/commits?author=ngtrdai197" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/toannt97"><img src="https://avatars.githubusercontent.com/u/54499867?v=4?s=100" width="100px;" alt="toannt97"/><br /><sub><b>toannt97</b></sub></a><br /><a href="https://github.com/ngtrdai197/url-shortener/commits?author=toannt97" title="Code">💻</a>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
