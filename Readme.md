# Api

## User (mostly not secured roots)
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

### validate (secured)
GET _/user/validate_

```
HEADER
Authorization: token

Response: {
    user
    }
```

## Albums (secured)

Security means the presence of a special field in the request headers

```
HEADER
Authorization: token
```

### create
POST _/album/create_
 
```
Request: {
    title
    description
}

Response: album
```
 
 
### findById 
GET _/album/findById/:id_

```
Response: album
```

### findByUser
GET _/album/findByUser/:userId_

```
Get Queries: {
    limit: int in range 0..n
    offset: int
}

Response: [album]
```


### changeType
GET _/album/changeType/:id/:type_

type: public, private

```
Response: album
```


### edit
POST _/album/edit/:id_

```
Request: {
    title
    description
}

Response: album
```
