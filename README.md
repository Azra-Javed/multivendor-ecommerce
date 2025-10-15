# Trendora – Multi-Vendor E-Commerce Platform

## Overview
**Trendora** is a scalable and interactive multi-vendor e-commerce platform designed to connect **customers**, **sellers**, and **administrators** in a unified marketplace.  

It allows customers to explore product catalogs, participate in promotions, place secure orders, and communicate with sellers in real-time.  
Sellers can create online shops, manage products, fulfill orders, and analyze performance.  
Administrators monitor platform health, manage users and vendors, and ensure data integrity.  

The platform integrates **real-time messaging**, **secure payment processing (Stripe)**, **cloud-based media storage**, and **automated email notifications**, delivering a complete and responsive e-commerce experience.

---

## Goals of the Project
- Build a **modern, scalable, and interactive marketplace**.  
- Enable multiple vendors to manage shops independently.  
- Provide customers with seamless product browsing, wishlist, cart management, and order tracking.  
- Facilitate real-time communication between buyers and sellers.  
- Ensure secure authentication, responsive design, and a reliable platform for all users.  

---

## Key Features
- **Role-Based User System:** Customers, sellers, and admins have dedicated dashboards and workflows.  
- **Product Catalog & Shopping:** Advanced search, category-based navigation, cart management, and wishlist.  
- **Payments:** Stripe integration for secure transactions.  
- **Messaging:** Real-time chat between buyers and sellers with text/image support.  
- **Seller Tools:** Revenue tracking, order management, product analytics, and discount codes.  
- **API Endpoints:** Organized by functional areas for users, sellers, products, orders, payments, and messaging.  
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices.  
- **Animations:** Built with **Framer Motion** for smooth UI transitions.  

---

## Technology Stack
| Layer | Technology Stack | Purpose / Functionality |
|-------|-----------------|------------------------|
| Frontend | React 18 + Vite | Fast, responsive, and animated user interface |
| State Management | Redux Toolkit | Efficient global state management |
| Backend | Express.js | Handles RESTful API requests and server-side logic |
| Database | MongoDB + Mongoose | Flexible, document-based data storage |
| Real-Time Communication | Socket.io | Instant messaging and live updates |
| Authentication | JWT + bcrypt | Secure, token-based authentication |
| Payment Gateway | Stripe | Processes online payments securely |
| File Storage | Cloudinary + Multer | Handles product image uploads and media storage |
| Email Service | Nodemailer | Sends transactional and notification emails |
| Deployment | Vercel | Frontend and backend hosting |

---

## System Architecture Overview
**Trendora** follows a modern full-stack architecture optimized for performance, scalability, and real-time interactions.  
- Frontend: React with Framer Motion for smooth animations and responsive design.  
- Backend: Express.js REST APIs with role-based authorization.  
- Database: MongoDB with Mongoose schemas for users, sellers, products, orders, chats, and events.  
- Real-Time: Socket.io for messaging and notifications.  
- Payment: Stripe for secure transactions.  
- Deployment: Vercel for production hosting.  

**System Architecture Diagram:**  
```mermaid
graph TD
  %% Clients
  subgraph Clients
    U[User / Customer]
    S[Seller]
    A[Admin]
  end

  FE["Frontend (React + Redux)"]
  BE["Backend API (Express.js)"]

  subgraph BackendModules [Backend Modules]
    Auth["Authentication & Authorization"]
    Products["Product & Catalog"]
    Shops["Shop & Seller Management"]
    Orders["Order Processing & Tracking"]
    Events["Promotional Events"]
    Messaging["Conversations & Messages (Socket.io)"]
    Payments["Payment Integration (Stripe)"]
    Uploads["File Uploads (Cloudinary + Multer)"]
    Emails["Transactional Emails"]
  end

  DB["MongoDB + Mongoose"]
  StripeExternal["Stripe"]
  CloudinaryExternal["Cloudinary"]
  EmailService["SMTP / Nodemailer"]
  Vercel["Vercel Hosting"]

  %% Connections
  U --> FE
  S --> FE
  A --> FE
  FE --> BE
  FE -. "WebSocket" .-> Messaging

  BE --> Auth & Products & Shops & Orders & Events & Messaging & Payments & Uploads & Emails
  Products --> DB
  Shops --> DB
  Orders --> DB
  Events --> DB
  Auth --> DB
  Messaging --> DB
  Uploads --> DB
  Payments --> StripeExternal
  Uploads --> CloudinaryExternal
  Emails --> EmailService
  BE --> Vercel
  FE --> Vercel

  %% Styles with brighter text
  classDef clients fill:#cce5ff,stroke:#333,stroke-width:1px,color:#003366,rx:8,ry:8;
  classDef frontend fill:#d4edda,stroke:#333,stroke-width:1px,color:#064420,rx:8,ry:8;
  classDef backend fill:#f8f9fa,stroke:#333,stroke-width:1px,color:#212529,rx:8,ry:8;
  classDef db fill:#ffeeba,stroke:#333,stroke-width:1px,color:#7a4d00,rx:8,ry:8;
  classDef external fill:#f9c2ff,stroke:#333,stroke-width:1px,color:#660066,rx:8,ry:8;
  classDef deploy fill:#e2e3e5,stroke:#333,stroke-width:1px,color:#111,rx:8,ry:8;

  class U,S,A clients;
  class FE frontend;
  class BE,Auth,Products,Shops,Orders,Events,Messaging,Payments,Uploads,Emails backend;
  class DB db;
  class StripeExternal,CloudinaryExternal,EmailService external;
  class Vercel deploy;

```
---

## Database Design
- Structured around **users, shops, products, orders, messages, reviews, coupons, events, and withdraw requests**.  
- Relations implemented via **foreign keys** and embedded documents.  
- Ensures data integrity and scalability.  

**Database ER Diagram:**  
```mermaid
erDiagram
    USER {
        String _id PK
        String fullName
        String email
        String password
        Number phoneNumber
        String role
        Object avatar
        Date createdAt
    }
    SHOP {
        String _id PK
        String name
        String email
        String password
        String phoneNumber
        String address
        Number zipCode
        String role
        Object avatar
        Number availableBalance
        Date createdAt
    }
    PRODUCT {
        String _id PK
        String name
        String description
        String category
        String tags
        Number originalPrice
        Number discountPrice
        Number stock
        Number sold_out
        String shopId FK
        Object shop
        Date createdAt
    }
    WITHDRAWREQ {
        String _id PK
        Object seller
        Number amount
        String status
        Date createdAt
        Date updatedAt
    }
    CONVERSATION {
        String _id PK
        String groupTitle
        Array members
        String lastMessage
        String lastMessageId
    }
    MESSAGE {
        String _id PK
        String conversationId FK
        String sender
        String text
        Object images
        Date createdAt
    }
    COUPON {
        String _id PK
        String name
        Number value
        Number minAmount
        Number maxAmount
        String shopId FK
        String selectedProduct
        Date createdAt
    }
    EVENT {
        String _id PK
        String name
        String description
        String category
        Date start_Date
        Date finish_Date
        String status
        Number discountPrice
        Number originalPrice
        Number stock
        String shopId FK
        Object shop
        Number sold_out
        Date createdAt
    }
    ORDER {
        String _id PK
        Array cart
        Object shippingAddress
        Object user
        Number totalPrice
        String status
        Object paymentInfo
        Date paidAt
        Date deliveredAt
        Date createdAt
    }

    USER ||--o{ PRODUCT : "reviews"
    SHOP ||--o{ PRODUCT : "sells"
    SHOP ||--o{ WITHDRAWREQ : "requests"
    SHOP ||--o{ COUPON : "issues"
    SHOP ||--o{ EVENT : "hosts"
    CONVERSATION ||--o{ MESSAGE : "has messages"
    USER ||--o{ ORDER : "places"
    SHOP ||--o{ ORDER : "receives"

```
---

## Application Flows
### User Flow
- Browse products, search and filter.
- Add to cart or wishlist.
- Make Stripe payments.
- Track order status.
- Communicate with sellers via chat.

### Seller Flow
- Create and customize shop.
- Add/edit products.
- Process and fulfill orders.
- Analyze revenue and product performance.
- Manage discount codes.

### Admin Flow
- Monitor platform activity.
- Manage users, sellers, and products.
- Ensure security and data integrity.
- Oversee reports and notifications.

## Application Flow Diagram


```mermaid
flowchart TB
    %% Frontend Layer
    subgraph FrontendLayer["Frontend Layer"]
        subgraph UserInterface["User Interface"]
            CustomerUI["Customer Interface<br/>- Product Discovery<br/>- Cart Management<br/>- Checkout Process"]
            SellerUI["Seller Dashboard<br/>- Product Management<br/>- Order Processing<br/>- Messaging"]
            AdminUI["Admin Panel<br/>- User Management<br/>- System Oversight"]
        end
        
        subgraph ReactComponents["React Components"]
            ProductDetails["ProductDetails Component"]
            UserInbox["UserInbox Component"]
            DashboardMessages["DashboardMessages Component"]
        end
        
        subgraph StateManagement["State Management"]
            ReduxStore["Redux Store<br/>- User State<br/>- Product State<br/>- Cart/Wishlist"]
        end
    end
    
    %% Communication Layer
    subgraph CommunicationLayer["Communication Layer"]
        HTTPREST["HTTP/REST"]
        CORS["CORS Middleware<br/>Credentials: true"]
        Auth["JWT Cookie Authentication"]
        SocketIO["Socket.io WebSocket<br/>socket-server-89h0.onrender.com"]
    end
    
    %% Backend Layer
    subgraph BackendLayer["Backend Layer"]
        ExpressServer["Express.js Server<br/>API Gateway Port 5000"]
        subgraph RouteModules["Route Modules"]
            UserRoutes["/api/v2/user/*<br/>Authentication & Profiles"]
            SellerRoutes["/api/v2/seller/*<br/>Shop Management"]
            ProductRoutes["/api/v2/product/*<br/>Catalog Operations"]
            OrderRoutes["/api/v2/order/*<br/>Order Processing"]
            ConversationRoutes["/api/v2/conversation/*<br/>Chat Management"]
            MessageRoutes["/api/v2/messages/*<br/>Message Operations"]
            PaymentRoutes["/api/v2/payment/*<br/>Stripe Integration"]
            CouponRoutes["/api/v2/coupons/*<br/>Coupons"]
            EventRoutes["/api/v2/events/*<br/>Events"]
            WithdrawRoutes["/api/v2/withdraw-request/*<br/>Withdraw Requests"]
        end
    end
    
    %% Data Layer
    subgraph DataLayer["Data Layer"]
        MongoDB["MongoDB Database<br/>Document Storage"]
        Cloudinary["Cloudinary<br/>Image Storage"]
        Stripe["Stripe API<br/>Payment Processing"]
    end
    
    %% Connections: Frontend -> Communication
    CustomerUI --> CORS
    SellerUI --> CORS
    AdminUI --> CORS
    
    ProductDetails --> ReduxStore
    UserInbox --> SocketIO
    DashboardMessages --> SocketIO
    
    %% Connections: Communication -> Backend
    CORS --> Auth
    Auth --> ExpressServer
    SocketIO -.-> MessageRoutes
    
    %% Connections: Backend -> Routes
    ExpressServer --> UserRoutes
    ExpressServer --> SellerRoutes
    ExpressServer --> ProductRoutes
    ExpressServer --> OrderRoutes
    ExpressServer --> ConversationRoutes
    ExpressServer --> MessageRoutes
    ExpressServer --> PaymentRoutes
    ExpressServer --> CouponRoutes
    ExpressServer --> EventRoutes
    ExpressServer --> WithdrawRoutes
    
    %% Connections: Backend -> Data
    UserRoutes --> MongoDB
    SellerRoutes --> MongoDB
    ProductRoutes --> MongoDB
    OrderRoutes --> MongoDB
    ConversationRoutes --> MongoDB
    MessageRoutes --> MongoDB
    MessageRoutes --> Cloudinary
    PaymentRoutes --> Stripe
    CouponRoutes --> MongoDB
    EventRoutes --> MongoDB
    WithdrawRoutes --> MongoDB
    
    %% Real-time Flow
    UserInbox -.->|"Real-time Messages"| DashboardMessages

```

---

## User Flow

```mermaid

sequenceDiagram
    participant User
    participant Frontend
    participant UserController
    participant Database
    participant EmailService
    participant Cloudinary

    %% Registration & Activation
    User->>Frontend: Register Account
    Frontend->>UserController: POST /users/create-user
    UserController->>UserController: createActivationToken()
    UserController->>EmailService: Send activation email
    UserController->>Cloudinary: Upload avatar
    UserController-->>Frontend: Registration success

    User->>Frontend: Click activation link
    Frontend->>UserController: POST /user/activation
    UserController->>Database: User.create()
    UserController-->>Frontend: User created + Auth token

    %% Login
    User->>Frontend: Login
    Frontend->>UserController: POST /user/login
    UserController->>Database: User.findOne({email})
    UserController->>UserController: comparePassword()
    UserController-->>Frontend: Login success + Token

    %% Post-login Actions
    User->>Frontend: Browse products, add to cart/wishlist, send message

```

---
## Seller Flow

```mermaid
sequenceDiagram
    participant Seller
    participant Frontend
    participant shopController
    participant Database
    participant EmailService
    participant Cloudinary

    %% Registration
    Seller->>Frontend: Register Shop
    Frontend->>shopController: POST /seller/create-shop
    shopController->>Database: shop.findOne(email)
    shopController->>Cloudinary: Upload shop avatar
    shopController->>EmailService: Send activation email

    %% Activation
    Seller->>Frontend: Click activation link
    Frontend->>shopController: POST /seller/activation
    shopController->>Database: Shop.create()

    %% Login
    Seller->>Frontend: Login to shop
    Frontend->>shopController: POST /seller/login-token
    shopController->>Database: shop.findOne(email)
    shopController->>shopController: comparePassword()
    shopController->>Frontend: Set cookie (login success)

    %% Post-login actions
    Seller->>Frontend: Manage products/events
    Seller->>Frontend: Process orders
    Seller->>Frontend: Update shop profile
    Seller->>Frontend: Handle customer messages
```
---

## Admin Flow

```mermaid
sequenceDiagram
    participant Admin
    participant Frontend
    participant UserController
    participant shopController
    participant Database

    %% Admin Login
    Admin->>Frontend: Login as Admin
    Frontend->>UserController: POST /users/login-user
    UserController->>Database: User.findOne({email, role: 'Admin'})
    UserController->>Frontend: Admin login success

    %% View All Users
    Admin->>Frontend: View all users
    Frontend->>UserController: GET /users/admin-all-users
    UserController->>Database: User.find().sort({createdAt: -1})
    UserController->>Frontend: Users list

    %% View All Sellers
    Admin->>Frontend: View all sellers
    Frontend->>shopController: GET /seller/admin-all-sellers
    shopController->>Database: Shop.find().sort({createdAt: -1})
    shopController->>Frontend: Sellers list

    %% Delete User
    Admin->>Frontend: Delete user
    Frontend->>UserController: DELETE /users/delete-user/:id
    UserController->>Database: User.findByIdAndDelete()
    UserController->>Frontend: User deleted

    %% Delete Seller
    Admin->>Frontend: Delete seller
    Frontend->>shopController: DELETE /seller/delete-seller/:id
    shopController->>Database: Shop.findByIdAndDelete()
    shopController->>Frontend: Seller deleted
```
---


## Challenges & Solutions
| Challenge | Solution |
|-----------|---------|
| Sign-up token expired | Adjusted React Strict Mode to prevent token re-render issues |
| Database schema modeling errors | Reviewed and corrected Mongoose schemas and relationships |
| Redux state not updating | Implemented proper async actions and slices in Redux Toolkit |
| Stripe integration issues | Debugged using Stripe sandbox environment before production |
| Image uploading issues | Transitioned from local uploads to Cloudinary |
| Production errors with Vercel | Adjusted deployment configs, set environment variables correctly |
| LocalStorage management | Implemented reliable get/set logic with JSON parsing |
| Data fetching & UI rendering | Used proper API calls with error handling and React hooks |
| Middleware issues | Configured Express middlewares for authentication, error handling, and parsing |

---

## Best Practices
- **Authentication & Security:** JWT tokens in HTTP-only cookies, bcrypt password hashing, role-based authorization.  
- **Component Architecture & Responsiveness:** Modular React components, clean state management, protected routes, responsive UI for all devices.  
- **Error Handling & UX:** Graceful error handling, stock validation, notifications for user actions, and prevention of duplicates in the cart.  
- **Animations:** Use Framer Motion to provide smooth transitions and a polished user experience.

---

## Conclusion
**Trendora** is a production-ready, feature-rich, and scalable multi-vendor e-commerce platform.  
It combines **technical robustness**, **responsive design**, **secure authentication**, and **interactive features** to deliver a seamless experience for customers, sellers, and administrators.  
The platform is designed for real-world deployment and future growth, ensuring reliability, scalability, and engagement.

