# Bal Krishna Nivas - Family Management System

A comprehensive MERN stack application for family management, featuring family tree visualization, news updates, event management, and user authentication.

## 🌟 Features

- **User Authentication**: Secure registration and login system
- **Family Tree**: Interactive family tree with generation-based organization
- **News & Updates**: Family news with categories, likes, and comments
- **Event Management**: Create and manage family events with RSVP functionality
- **User Profiles**: Complete user profile management
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JSON Web Tokens** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for data validation

### Frontend
- **React 18** with Hooks
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons

## 📁 Project Structure

```
Bal-krishna Nivas/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── FamilyMember.js
│   │   ├── News.js
│   │   └── Event.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── family.js
│   │   ├── news.js
│   │   └── events.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── utils/
│   └── public/
├── .env
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Bal-krishna-Nivas
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/bal-krishna-nivas
   JWT_SECRET=your_jwt_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Start the application**
   
   **Development mode (both frontend and backend):**
   ```bash
   npm run dev
   ```
   
   **Backend only:**
   ```bash
   npm run server
   ```
   
   **Frontend only:**
   ```bash
   npm run client
   ```

### Database Setup

Make sure MongoDB is running on your system. The application will automatically create the necessary collections when you start adding data.

## 📱 Usage

1. **Registration**: New users can register with their family details
2. **Login**: Existing users can log in with email and password
3. **Dashboard**: Central hub showing recent activity and quick actions
4. **Family Tree**: View and manage family member relationships
5. **News**: Create, read, and interact with family news
6. **Events**: Create and manage family events with RSVP functionality
7. **Profile**: Manage personal profile information

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Automatic token validation on app load
- Protected routes redirect to login if not authenticated
- Admin roles for managing content

## 🎨 Styling

The application uses Tailwind CSS with a custom color scheme:
- **Primary Colors**: Blue shades for main interface elements
- **Secondary Colors**: Yellow/amber for accents
- **Custom Fonts**: Inter for UI, Merriweather for headings
- **Responsive Design**: Mobile-first approach

## 📊 Database Models

### User
- Authentication and profile information
- Role-based permissions
- Family relationship linking

### FamilyMember
- Complete family tree structure
- Relationship management (parents, children, siblings, spouse)
- Generation-based organization
- Personal information and achievements

### News
- Family announcements and updates
- Categories and priorities
- Like and comment functionality
- Rich content with images

### Event
- Event planning and management
- RSVP functionality
- Venue and timing information
- Requirement tracking

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Configure production MongoDB URI
- Set secure JWT secret
- Configure Cloudinary for image uploads

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions, please contact the development team or create an issue in the repository.

## 📈 Future Enhancements

- [ ] Real-time notifications
- [ ] Mobile app (React Native)
- [ ] Advanced family tree visualization
- [ ] Photo gallery integration
- [ ] Export family data functionality
- [ ] Multi-language support
- [ ] Email notifications for events
- [ ] Advanced search functionality

---

**Made with ❤️ for families everywhere**