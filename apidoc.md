## List of Available Endpoints:
- POST /send-notif


### POST /register

#### Request
```json
{
    userEmail: string,
}
```
#### Response
- 201
```json
{
    message: "Email notif sent!"
}
```

- 500
```json
{
    message: "ISE"
}
```