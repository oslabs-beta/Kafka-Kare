# Server Documentation

## Setup Instructions

1. You will need a .env file. Look at the .env.example file for inspiration. 
2. Install depenendencies: 'npm install'
3. Start the server: `npm run server`

## Docker Setup

- Note: This server application was designed to run in Docker
- Please visit the README.md file in the project root directory for setup instructions

## Endpoints

/auth
- **POST /auth/signup**: Route for user signup
- **POST /auth/login**: Route for user login
- **GET /auth/logout**: Route for user logout
- **UPDATE /auth/password/update**: Route for updating user password

/clusters
- **GET /clusters/userClusters**: Route for getting all clusters from a user
- **POST /clusters/addCluster**: Route for adding a cluster
- **DELETE /clusters/:clusterId**: Route for deleting a cluster
- **PATCH /clusters/:clusterId**: Route for editing a cluster
- **PATCH /clusters/favorites/:clusterId**: Route for toggling favorite status of a cluster
- **GET /clusters/favorites**: Route for getting favorite clusters
- **GET /clusters/notFavorites**: Route for getting not-favorite clusters

/slack
- **POST /slack/add**: Route for adding Slack link
- **PATCH /slack/update**: Route for editing Slack link
- **GET /slack**: Route for retrieving a Slack link



## Configuration

Environment vairables: 
- 'MONGO_DB_USERNAME': Description
- 'MONGO_DB_PWD': Description

## Troubleshooting

- Ensure MongoURI connection string is correct

## Contribution Guidelines

- Message on Github or Slack
- Good luck