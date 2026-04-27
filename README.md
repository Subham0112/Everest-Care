# Everest Home Care - Frontend

![Everest Home Care Logo](./public/logo.png)

> "Care You Can Believe In" - A modern React-based frontend for comprehensive home health care management.

## Overview

Everest Home Care Frontend is a React-based web application that provides a user-friendly interface for home health care operations. It features member management, training modules, form handling, and administrative dashboards for managing home health care services.

## Features

### 🔐 Authentication & Security
- Secure user login and signup
- Role-based access control (Protected routes)
- Password reset and recovery functionality
- JWT-based authentication

### 📋 Form Management
- **Consumer Packet** - Manage consumer information and intake forms
- **HAB Packet** - Habilitation service documentation
- **Orientation Packet** - Employee orientation documentation
- **Missed EVV** - Electronic Visit Verification tracking and reporting
- Form preview and validation
- Signature capture and canvas support

### 📚 Training & Compliance
- Interactive training modules
- Quiz assessments with multiple categories:
- HAB (Habilitation) Training Quizzes
- ODP (Operating Department Practitioner) Training Quizzes
- Training progress tracking

### 👥 Member Management
- Member approval workflows
- Member list management
- Admin dashboard for Head of Department (HOD)

### 📄 Document Handling
- PDF viewing and manipulation
- DOCX document support
- Document templating and generation
- Print and download functionality
- HTML to PDF conversion

### 🎯 Policy & Compliance
- Policy documentation and acknowledgment
- Compliance tracking
- Family thoughts and testimonials

## Tech Stack

### Core Framework
- **React** ^19.1.1 - UI library and component framework
- **Vite** ^7.1.7 - Next-generation frontend build tool
- **React Router DOM** ^7.9.3 - Client-side routing

### Styling & UI
- **Tailwind CSS** ^3.4.19 - Utility-first CSS framework
- **Bootstrap 5** ^5.3.8 - Responsive grid and components
- **React Bootstrap** ^2.10.10 - Bootstrap components for React
- **Lucide React** & **React Icons** - Icon libraries

### Document & File Processing
- **PDF Handling**: jsPDF, PDF-lib, pdfjs-dist, react-pdf, html2pdf.js
- **Word Documents**: docxtemplater, mammoth, docx
- **Image Processing**: html2canvas, file-saver

### Form & Data Management
- **Axios** ^1.13.2 - HTTP client for API calls
- **React Signature Canvas** ^1.1.0-alpha.2 - Digital signature capture
- **JWT Decode** ^4.0.0 - JWT token parsing

### Utilities
- **EmailJS** - Client-side email service
- **PDFTron WebViewer** - Advanced PDF viewing

### Development Tools
- **ESLint** - Code linting
- **PostCSS** & **Autoprefixer** - CSS processing
- **Vite React Plugin** - React-specific Vite optimizations



## Project Structure

```
src/
├── components/
│   ├── Auth/                    # Authentication routes
│   ├── forms/                   # Form components
│   │   ├── ConsumerPacket.jsx
│   │   ├── HabPacket.jsx
│   │   ├── OrientationPacket.jsx
│   │   ├── MissedEvv.jsx
│   │   ├── formElements/        # Reusable form inputs
│   │   └── css/
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── ForgetPassword.jsx
│   ├── ResetPassword.jsx
│   ├── MemberApprove.jsx
│   ├── MemberList.jsx
│   ├── HodPage.jsx
│   ├── Quiz.jsx
│   ├── Training.jsx
│   ├── Policy.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── Alert.jsx
├── data/
│   ├── habquizData.js           # Habilitation quiz questions
│   ├── odpquizData.js           # Operating Department Practitioner quiz questions
│   ├── optionData.js
│   └── trainingData.js
├── hooks/
│   └── useScrollReveal.jsx
├── assets/
│   ├── css/                     # Stylesheets
│   ├── img/
│   └── video/
├── App.jsx                      # Main app component
├── MainPage.jsx                 # Home page
├── QuizTraining.jsx
└── main.jsx
```

## Key Components

### Form Elements
- `InputFields` - Text input fields
- `InputDate` - Date picker inputs
- `InputRadio` - Radio button groups
- `InputCheckboxes` - Checkbox groups
- `TextAreaFields` - Multi-line text inputs
- `SignatureCanvas` - Digital signature capture

### Pages
- **Login/Signup** - User authentication
- **Main** - Home/dashboard page
- **Quiz Training** - Assessment and training module
- **Form Page** - Form management interface

## Authentication Flow

1. User submits login/signup form on `LoginPage` or `SignupPage`
2. Frontend sends credentials via Axios to backend API
3. Backend returns JWT token
4. Token is stored in localStorage (or session storage)
5. `ProtectedRoute` component checks for valid token on protected routes
6. Token is decoded using JWT Decode for user info access
7. Authenticated users get access to dashboard, forms, and member features

## Form Types Supported

- **Consumer Packet**: Client information and service agreements
- **HAB Packet**: Habilitation documentation
- **Orientation Packet**: New employee training materials
- **Missed EVV**: Electronic Visit Verification exceptions

## Development Workflow

### Component Development
1. Create new components in `src/components/`
2. Import and use in routes or parent components
3. Use React hooks (useState, useEffect, useContext) for state management
4. Keep components modular and reusable

### Form Development
- Use form elements from `src/components/forms/formElements/`
- Implement form validation client-side
- Handle form submissions with Axios calls to backend
- Use `handleAlert` prop to show success/error messages

### Styling
- Use Tailwind CSS classes for styling
- Import component-specific CSS when needed
- Follow Bootstrap grid system for layouts
- Keep CSS organized in `src/assets/css/` directory

### Routing
- Define routes in `App.jsx`
- Wrap protected routes with `ProtectedRoute` component
- Use `useNavigate()` from React Router for programmatic navigation

## Deployment

The project is configured for deployment to Vercel with `vercel.json`:

```bash
# Deploy to Vercel
vercel deploy

# Deploy to production
vercel deploy --prod
```

### Build for Production
```bash
npm run build
```

This generates a `dist/` folder optimized for production deployment.

## Environment Variables

Create a `.env` file in the root directory with the following frontend configuration:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_BASE=http://localhost:3000

# EmailJS Configuration (if using EmailJS)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Application Configuration
VITE_APP_NAME=Everest Home Care
VITE_DEBUG=false
```

**Note**: Vite requires variables to be prefixed with `VITE_` to be accessible in the frontend code.

## API Configuration

The frontend communicates with a backend API using Axios. Configure your backend endpoints:

### API Base URL
Set up your API base URL in environment variables or create an Axios instance with your backend URL:

```javascript
// Example: src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:3000/api'
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Authentication
- Store JWT tokens in localStorage after login
- Include tokens in Authorization headers for protected API calls
- Handle token expiration and refresh flows

## Troubleshooting

### Common Issues

**Issue**: CORS errors when calling API
- **Solution**: Ensure backend server is running and configured to accept requests from your frontend origin

**Issue**: Vite dev server not starting
- **Solution**: Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Issue**: Files not updating in development
- **Solution**: Clear Vite cache: `rm -rf node_modules/.vite`

## Contributing

1. Create a feature branch from `main`
2. Make your changes following the project structure
3. Test thoroughly in development
4. Submit a pull request with clear description

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Related Documentation

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Version**: 0.0.0  
**Frontend Framework**: React 19.1.1  
**Build Tool**: Vite 7.1.7  
**Everest Home Care, LLC** - EST. 2018  
**Last Updated**: April 2026
