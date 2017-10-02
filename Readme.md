# Api

### register
POST _/user/reg_
 
```
Request: {
    displayName: string (optional)
    email: string (required)
    password (required) 
}

Response: the user
```
 
 
## authorization 
POST '/user/auth'

```
Request: {
    email: string (required)
    password (required) 
}

Response: {
    token
    }
```

### validate
GET '/user/validate'

```
HEADER
Authorization: token
```