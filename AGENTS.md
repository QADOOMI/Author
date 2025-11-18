# AGENTS.md

## Project Overview
**Authors Backend** - A Node.js/Express backend service for an authors' social platform that manages book publishing, sharing, reviews, messaging, and user interactions.

---

## Recent Development Activity

### Initial Project Setup (2019-11-20)
**Commit:** `1ddf8de` - Create web.config

Complete backend infrastructure established with the following components:

#### Core Architecture
- **Framework**: Express.js with body-parser middleware
- **Authentication**: Passport.js with multiple strategies (local, Google, LinkedIn, OpenID)
- **Real-time Communication**: Socket.io for chat and Pusher for real-time notifications
- **Database**: MySQL with connection pooling
- **Session Management**: Express-session middleware
- **Security**: BCrypt for password hashing

#### Key Features Implemented

**Authentication & Authorization**
- Sign in/Sign up functionality with local strategy
- OAuth integration (Google, LinkedIn)
- Token-based authentication management
- Session handling with Passport.js

**Book Management**
- Book publishing and sharing system
- Draft management for work-in-progress books
- Book categorization and filtering
- Book content retrieval
- Book details and metadata

**User Interactions**
- Follow/unfollow authors
- Review and rating system
- Feedback collection
- User profile management

**Library & Shopping**
- Personal library management
- Shopping cart functionality
- Book purchasing workflow

**Communication Features**
- Real-time chat system (Socket.io)
- Contact list management
- Message history retrieval
- Push notifications (Azure Service Bus integration)

**Search & Discovery**
- Global search for books and users
- Category-based filtering
- Feed/posts system for shared content

**Data Operations**
- CRUD operations for all entities
- Update functionality for user data
- Delete operations with proper cleanup

#### Technology Stack
- **Runtime**: Node.js
- **Web Framework**: Express 4.17.1
- **Database**: MySQL 2.17.1
- **Authentication**: Passport 0.4.0 with multiple strategies
- **Real-time**: Socket.io 2.2.0, Pusher 2.2.2
- **Security**: BCrypt 3.0.6
- **Cloud Services**: Azure Service Bus
- **Utilities**: UUID, Async, Promise, CSV-stringify

#### Project Structure
```
/authentication     - Sign in/up and token management
/actions-on-posts   - Book publishing, fetching, sharing
/books-reviews      - Review system
/chat              - Real-time messaging
/drafted-books     - Draft management
/following         - Author follow system
/library-books     - Personal library
/shopping          - Cart and purchases
/search-for-all    - Search functionality
/profile           - User profile operations
/delete-actions    - Delete operations
/update-data       - Update operations
/database-connection - MySQL connection handling
/modules           - Module exports
```

#### API Endpoints
The server exposes RESTful endpoints for:
- `/signIn`, `/signUp` - Authentication
- `/publishABook`, `/shareABook` - Book publishing
- `/fetchAllBooks`, `/fetchSpcificBooksCategory` - Book retrieval
- `/addReview`, `/fetchReviews` - Review system
- `/addToDraft`, `/fetchDrafted` - Draft management
- `/fetchFollowers`, `/followAnAuthor` - Following system
- `/addToCart`, `/fetchCartItems` - Shopping cart
- `/fetchBookDetails`, `/fetchBookContent` - Book details
- `/search` - Global search
- `/fetchContacts`, `/fetchMessages` - Messaging
- `/fetchNotifications` - Notifications
- `/fetchFeedback` - Feedback system
- `/delete`, `/update` - Data operations
- `/fetchProfileInfo` - User profiles
- `/insertNewToken` - Token management

---

## Development Environment

**Configuration**
- Web.config for IIS deployment
- Environment variable port configuration
- Nodemon for development hot-reloading

**Repository**: https://github.com/QADOOMI/Authors

**Author**: .IDEA

---

## Next Steps / Potential Improvements

- Add API documentation (Swagger/OpenAPI)
- Implement rate limiting and request throttling
- Add comprehensive error handling middleware
- Implement data validation schemas
- Add unit and integration tests
- Set up CI/CD pipeline
- Add API versioning
- Implement pagination for list endpoints
- Add caching layer (Redis)
- Enhance security with CORS, helmet.js
- Add logging and monitoring
- Database migrations and seeding
- Environment-specific configurations
- API response standardization

---

**Last Updated**: 2019-11-20  
**Agent Session**: Generated with [Continue](https://continue.dev)
