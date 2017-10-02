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
 
 
### authorization 
POST _/user/auth_

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
GET _/user/validate_

```
HEADER
Authorization: token
```