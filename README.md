## THE MINDER CONTROL PLANE WEB CLIENT

Minder by [Stacklok](https://stacklok.com/) is an open source platform that helps development teams and open source communities build more
secure software, and prove to others that what they’ve built is secure. Minder helps project owners proactively manage
their security posture by providing a set of checks and policies to minimize risk along the software supply chain,
and attest their security practices to downstream consumers.
Learn more about Minder CLI [here](https://docs.stacklok.com/minder/)

This <b>Minder Control Plane Web Client</b> is an open source platform to help development teams performs all their Minder tasks via a Web Client. 

# Development

This section describes how to build and run Minder web client locally.


## Set Up your local Server

Set up your local server to test the client by following this [guide](https://minder-docs.stacklok.dev/developer_guide/get-hacking)

Before Running the server application, run this command 
```bash
bin/minder-server migrate up
```

Then run your local server 
```bash
bin/minder-server serve
```

## Set Up The Minder Web Client
#### Clone The Repository
```bash
git clone git@github.com:AGMETEOR/minder-web.git
```
#### Install dependencies
```bash
npm install
```
#### Set Environment Variables
Create a .env.local file at the root of your project and add the following environment variables:
```
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET="abc"
```
#### Run The Project
```
npm run dev
```

By default it points to your local minder server

NOTE: This project is very much a WIP. Contributions at this point that help improve upon it are very welcome.
