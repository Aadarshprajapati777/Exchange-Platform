
# Distributed and Scalable Exchange Platform

Welcome to the Distributed and Scalable Exchange Platform project! This platform is currently under development and is designed to handle high volumes of user traffic and data efficiently. The architecture employs a microservices approach with independent scaling capabilities, ensuring that each component can grow as the number of users increases.

## Key Components

- API Service
  :- The core backend service responsible for managing user traffic.
    Handles CRUD operations for users and communicates with queues and pub/sub systems.

- WebSocket (WS) Service:- Manages WebSocket connections between the frontend and backend engine.Ensures real-time data exchange and communication.

- Engine:- Processes incoming user data and updates the WebSocket connections, database, and frontend as needed.Acts as the central processing unit for user interactions.

- Database (DB) Service:- Manages all database operations and seeding.Ensures reliable data storage and retrieval.

- Docker Service:- Pulls Docker images and executes them within containers.Facilitates containerized deployment and management.

- Market Maker (MM) Service:- Temporarily feeds dummy data into the backend for testing and development purposes.Helps simulate real market conditions and data flows.
## Current Status

- Under Development: The platform is still in the development phase.

- Bugs: There are known bugs that are actively being addressed.

- UI Improvements: Significant improvements are needed in the user interface to enhance usability and aesthetics.




## Architecture

The platform uses a combination of Pub/Sub and Queues for communication between services. This design allows for:

- Decoupling: Services communicate asynchronously, reducing dependencies and improving reliability.

- Scalability: Each service can scale independently based on demand and user growth.



## Future Enhancements

- Bug Fixes: Ongoing work to identify and resolve existing bugs.

- UI/UX Improvements: Major upgrades planned to improve the user interface and overall user experience.

- Performance Optimization: Enhancements to improve the platform's performance and efficiency.




## Installation

Clone the Repository:
```bash
  https://github.com/Aadarshprajapati777/Web3-exchange
```
Install Dependencies:
 navigate to each service directory and run:
```bash
 npm install
```

Run Services:
 Use Docker to build and start the services:

```bash
docker-compose up
```
navigate to each service directory and run: 
```bash
npm run dev
```

## Contributing

We welcome contributions from the community! If you would like to contribute, please fork the repository and submit a pull request. Be sure to follow the project's coding standards and guidelines.

## Contact
For any questions or feedback, please reach out to geekaadarsh.dev@gmail.com



## Screenshots

![exchange](https://github.com/user-attachments/assets/4ca7fca2-787f-4e9d-a20b-618172d38cd8)



## Support

Thank you for your interest in the Distributed and Scalable Exchange Platform! Your support and contributions are greatly appreciated as we work towards building a robust and scalable solution.


## Tech Stack

**Frontend:** Next-JS 14, Tailwind CSS, lightweight-chart

**Backend:** Node, Express, Redis Queue, Redis PubSub, docker, PostgreSQL, Next-JS backend, typescript, websocket, vitest

