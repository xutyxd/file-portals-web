# File Portals Web

File Portals is an application designed to share files between different devices such as mobile phones, computers or servers.
And always keeping in mind the philosophy of always free.

## Resources to get all free
- For peer connections: https://dashboard.metered.ca/
    - Free: 50GB
- For signaling server: https://render.com/
    - Free 512MB RAM & 0.1 CPU
    - Deployed a [Peer DNS](https://github.com/xutyxd/peer-dns) in some clicks
- For hosting: https://firebase.google.com/
    - Free 10GB of storage and 360MB/day
- Fonts: https://fontesk.com/license/ofl-gpl/
    - Open source fonts with free commercial use
- Icons: https://www.flaticon.com/free-icon/
    - Free icons sometimes need atributtion


## Add FireBase to deploy

### Install globally
```
npm install -g firebase-tools@12.8.1
```
Version at the moment of write this: 12.8.1

### Login to FireBase
Make sure of run this command in the root of the project
```
firebase login
```

### Init FireBase
```
firebase init
```

### Test before deploy

```
ng build
```

```
firebase serve
```

### Manual Deploy

```
firebase deploy
```

### Get token to deploy from pipeline
```
firebase login:ci
```
Then use it to deploy
```
firebase deploy --token "$FIREBASE_TOKEN"
```