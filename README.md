#######Packages:
1. argon2
Purpose: Hashing and verifying user passwords
Alternatives: bcrypt
Advantages:
Very secure, especially against modern hardware attacks
Recommended as a modern standard for password hashing
Disadvantages:
Newer library, smaller community compared to bcrypt
Decision:
(argon2) was chosen for its superior security and resistance to modern attacks, while still providing a relatively simple implementation for password hashing and verification

2. body-parser
Purpose: Parsing request bodies in Express applications
Alternatives: Built-in express.json()
Advantages:
Provides explicit configuration and control over body parsing
Backward compatible with older Express versions
Disadvantages:
No longer necessary in modern Express (v4.16+)
Adds a minor layer of redundancy
Decision:
 Kept for compatibility and clarity, though it may be removed later in refactoring

3. dotenv
Purpose: Managing environment variables from a .env file
 Alternatives: env-cmd
Advantages:
Lightweight and easy to us
Framework-agnostic
Improves security by separating sensitive data
Disadvantages:
Only works during runtime (not build-time)
Minimal validation of variables
Decision:
(dotenv) was chosen for its simplicity and reliability in managing environment configurations

4. jsonwebtoken
Purpose: Handling authentication through JWT tokens
 Alternatives: jose
Advantages:
Lightweight and straightforward
Works perfectly with Express middleware
Great documentation and maintenance
Disadvantages:
Only handles token generation/verification, not full auth flow
Limited built-in security options
Decision:
(jsonwebtoken) Chosen for implementing a simple and efficient authentication system using JWTs

5. mongoose
Purpose: Object Data Modeling (ODM) library for MongoDB
 Alternatives: Prisma
Advantages:
Mature and stable ODM library
Great for schema-based data modeling
Wide community support and documentation
Disadvantages:
Moderate TypeScript support compared to Prisma
Slight learning curve for advanced queries
Decision:
(mongoose) was chosen due to its mature ecosystem, schema-based modeling, and ease of integration with Express.

6. nodemon
Purpose: Automatically restarts the server during development when files change
 Alternatives: ts-node-dev
Advantages:
Simple and lightweight
Easy to set up
Improves development workflow
Disadvantages:
Not suitable for production environments
Can cause memory leaks in large projects
Decision:
 (nodemon) used as a development tool for faster iteration during local testing



#################



#######Frame works:
1. express
Purpose: Core backend framework for building REST APIs
 Alternatives: Fastify
Advantages:
Extremely simple and flexible
Huge ecosystem and community support
Fast development for MVPs
Disadvantages:
Requires manual structure and organization
Slightly slower than Fastify in performance tests
Decision:
(express) was selected for its simplicity, huge ecosystem, and team familiarity — perfect for building an MVP quickly