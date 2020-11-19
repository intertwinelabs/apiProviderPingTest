# apiProviderPingTest

Simple API Provider Ping Test used to verify API consumer using either GET or POST method.
This is used for connectivity testing between systems.

#### Pre-requisite:
1. NodeJS
2. Curl

#### To setup:
1. Create **apiProvider** directory.

```
$ mkdir apiProvider
$ cd apiProvider
```

2. Download **apiProvider-http.js** and **apiProvider-https.js** to [apiProvider] directory. 
3. Initialise environment and download Express NodeJS library to local **node_modules** directory.
```
$ npm init
$ npm install express --save
$ npm install dotenv --save
```

4. Create [certSSL] directory to store your private/public certificates. 
E.g. purchase SSL from Public CA provider 
```
   www_mydomain_com.key
   www_mydomain_com.crt
   www_mydomain_com.ca-bundle
```

5. Create file ***.env** in [apiProvider] directory with the following:
The .env file provides dynamic configuration through file.

```
#PORT=443
CAKeyFile="./certssl/www_mydomain_com.key"
CACrtFile="./certssl/www_mydomain_com.crt"
CABundleFile="./certssl/www_mydomain_com.ca-bundle"
```

Note: Uncomment PORT parameter if you want to enable use of PORT 443 instead.
```
PORT=443
...
```

6. Start up API Provider/Server:

6a. API Provider with HTTP Server
```
$ node apiProvider-http.js
```
6b. API Provider with HTTPS Server - SSL (using port 8443)
```
$ node apiProvider-https.js
```
6c. API Provider with HTTPS Server - SSL (using port 443)
```
$ sudo node apiProvider-https.js
```

7. To test API Provider:

7a. API Provider with HTTP Server

**GET Method:** 
```
$ curl -X GET http://<domain>:<port>/rest/api/ping
```

**POST Method:** 
```
$ curl -X POST -H "Content-Type: application/json" -d '{ "pingMsg":"Hello World" }' http://<domain>:<port>/rest/api/ping
```


7b. API Provider with HTTPS Server - SSL

**GET Method:**
```
$ curl -X GET -cacert <CACERT.ca-bundle> https://<domain>:<port>/rest/api/ping
```

**POST Method:** 
```
$ curl -X POST -cacert <CACERT.ca-bundle> -H "Content-Type: application/json" -d '{ "pingMsg":"Hello World" }' https://<domain>:<port>/rest/api/ping
```
