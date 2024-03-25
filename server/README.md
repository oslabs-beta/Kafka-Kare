# Server Documentation

## Setup Instructions

1. You will need a `.env` file. Look at the `.env.example` file for inspiration. 
2. Install depenendencies: `npm install`
3. Start the server: `npm run server`

## Docker Setup

- Note: This server application was designed to run in Docker
- Please visit the README.md file in the project root directory for Docker setup instructions

## Endpoints

/auth
- **POST /auth/signup**: Route for user signup
- **POST /auth/login**: Route for user login
- **GET /auth/logout**: Route for user logout
- **UPDATE /auth/password/update**: Route for updating user password
- **DELETE /account/delete**: Route for deleting a user account

/clusters
- **GET /clusters/userClusters**: Route for getting all clusters from a user
- **POST /clusters/addCluster**: Route for adding a cluster
- **DELETE /clusters/:clusterId**: Route for deleting a cluster
- **PATCH /clusters/:clusterId**: Route for editing a cluster
- **PATCH /clusters/favorites/:clusterId**: Route for toggling favorite status of a cluster
- **GET /clusters/favorites**: Route for getting favorite clusters
- **GET /clusters/notFavorites**: Route for getting not-favorite clusters

/slack
- **PATCH /slack/update**: Route for editing Slack link
- **GET /slack**: Route for retrieving a Slack link

/metrics
- **GET /metrics/:clusterId**: Route for obtaining metrics from a cluster

/settings
- **GET /settings/colormode**: Route for obtaining user's color mode
- **GET /settings/colormode/toggle**: Route for toggling a user's color mode

## Configuration

Environment vairables: 
- 'MONGO_DB_USERNAME': Username for MongoDB. Look in docker-compose.yml file
- 'MONGO_DB_PWD': Password for MongoDB. Hop over to the docker-compose.yml file

MongoURI Connection String in server.js: 
- Use `mongoose.connect(mongoURI)` to connect to Docker containerized MongoDB image
- Use `mongoose.connect(mongoURIAtlas)` to connect to external service MongoDB such as MongoDB Atlas

## Troubleshooting

- Ensure MongoURI connection string is correct

## Contribution Guidelines

- Message on Github or Slack
- Good luck