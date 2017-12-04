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

Response: {
     id,
     email,
     displayName
}
```
 
 
### authorization 
POST _/user/auth_

```
Request: {
    email: string (required)
    password (required) 
}

Response: {
     id,
     email,
     displayName,
     token
    }
```

### validate (secured)
GET _/user/validate_

```
HEADER
Authorization: token

Response: {
     id,
     email,
     displayName
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
    user
    title
    description
}

Response: album
```

### search
GET /album/search/:query
 
 
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

Response: {
    count,
    albums: [album]
    }
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

### remove
POST _/album/remove/:id_

```
Request: {
    title
    description
}

Response: {
    success
    }
```

## Links (secured)

Security means the presence of a special field in the request headers

```
HEADER
Authorization: token
```

### create
POST _/link/create_
 
```
Request: {
    albumId
    url
}

Response: link
```
 
 
### findById 
GET _/link/findById/:id_

```
Response: link
```

### findByAlbum
GET _/link/findByAlbum/:albumId_

```
Get Queries: {
    limit: int in range 0..n
    offset: int
}

Response: {
    count,
    links: [link]
    }
```

### remove 
GET _/link/findById/:id_

```
Response: {
    success
    }
```
