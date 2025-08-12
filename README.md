# UnityMedia

Dubai's Premier Media Powerhouse - Complete Production-Ready Platform

A comprehensive media production platform with equipment rentals, booking management, user authentication, and admin dashboard.

## Services

- **Cinematography & Photography** - Professional services for commercial projects
- **Aerial Filming & Drone Services** - Stunning aerial perspectives
- **Social Media Marketing** - Strategic content creation and management
- **Equipment Rentals** - High-end photography and videography gear
- **Matterport 3D Tours** - Immersive virtual experiences
- **Tourism Experiences** - Comprehensive media packages

## Platform Features

### Frontend Features
- **Responsive Design** - Works perfectly on all devices
- **User Authentication** - Secure sign up/sign in system
- **Equipment Catalog** - Browse and filter professional equipment
- **Booking System** - Real-time equipment availability and reservations
- **User Dashboard** - Manage bookings, quotes, and profile
- **Admin Panel** - Complete content and booking management
- **Quote System** - Request and manage project quotes
- **Portfolio Showcase** - Display completed projects with testimonials

### Backend Features
- **Supabase Integration** - PostgreSQL database with real-time capabilities
- **Row Level Security** - Secure data access policies
- **User Profiles** - Extended user information and preferences
- **Equipment Management** - Inventory tracking and categorization
- **Booking Management** - Status tracking and conflict detection
- **Quote Management** - Automated quote generation and tracking
- **Content Management** - Blog posts and project portfolio
- **Role-based Access** - Admin, staff, and client permissions

## Contact

- **Phone:** +971 4 379 2667
- **WhatsApp:** +971 50 514 8299
- **Email:** kapadnis81@gmail.com
- **Location:** Dubai, UAE

## Technology Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- Framer Motion
- React Router
- React Hook Form
- Zod Validation
- React Hot Toast

### Backend
- Supabase (PostgreSQL)
- Row Level Security (RLS)
- Real-time subscriptions
- Authentication & Authorization
- File Storage

### Development Tools
- ESLint
- TypeScript
- PostCSS
- Autoprefixer

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd unitymedia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Create `.env` file:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Run database migrations**
   - In Supabase dashboard, go to SQL Editor
   - Run the migration file: `supabase/migrations/create_unitymedia_schema.sql`

5. **Start development server**
   ```bash
   npm run dev
   ```

### Production Deployment

#### Build for Production
```bash
npm run build
```

#### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### Deploy to Vercel
1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables in Vercel dashboard

## Database Schema

### Core Tables
- **profiles** - User profile information
- **equipment_categories** - Equipment categorization
- **equipment_items** - Individual equipment inventory
- **bookings** - Equipment rental bookings
- **projects** - Portfolio projects showcase
- **quotes** - Quote requests and management
- **blog_posts** - Content management

### Security Features
- Row Level Security (RLS) enabled on all tables
- Role-based access control (admin, staff, client)
- Secure authentication with Supabase Auth
- Input validation and sanitization

## API Documentation

### Authentication Endpoints
- `POST /auth/signup` - Create new user account
- `POST /auth/signin` - Sign in existing user
- `POST /auth/signout` - Sign out user
- `POST /auth/reset-password` - Reset user password

### Equipment Endpoints
- `GET /equipment-categories` - Get all equipment categories
- `GET /equipment-items` - Get available equipment items
- `GET /equipment-items/:id` - Get specific equipment item

### Booking Endpoints
- `GET /bookings` - Get user bookings
- `POST /bookings` - Create new booking
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Cancel booking

### Quote Endpoints
- `GET /quotes` - Get user quotes
- `POST /quotes` - Create quote request
- `PUT /quotes/:id` - Update quote

## User Roles & Permissions

### Client Role
- View equipment catalog
- Create bookings and quotes
- Manage own profile
- View own bookings and quotes

### Admin Role
- All client permissions
- Manage all equipment
- View and manage all bookings
- Manage quotes and pricing
- Content management
- User management

### Staff Role
- View equipment and bookings
- Update booking status
- Basic content management

## Performance Optimizations

- **Code Splitting** - Lazy loading of components
- **Image Optimization** - WebP format with fallbacks
- **Caching** - Browser caching for static assets
- **Database Indexing** - Optimized queries with proper indexes
- **CDN Integration** - Fast global content delivery

## Security Measures

- **HTTPS Only** - SSL/TLS encryption
- **Input Validation** - Client and server-side validation
- **SQL Injection Protection** - Parameterized queries
- **XSS Protection** - Content Security Policy
- **Authentication** - JWT tokens with refresh
- **Authorization** - Role-based access control

## Monitoring & Analytics

- **Error Tracking** - Real-time error monitoring
- **Performance Monitoring** - Core Web Vitals tracking
- **User Analytics** - Booking and usage patterns
- **Database Monitoring** - Query performance and optimization

## Support & Maintenance

### Regular Maintenance Tasks
- Database backups (automated daily)
- Security updates (monthly)
- Performance monitoring (continuous)
- Content updates (as needed)

### Troubleshooting
- Check browser console for errors
- Verify environment variables
- Confirm Supabase connection
- Review network requests

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is proprietary software owned by UnityMedia. All rights reserved.

## Changelog

### Version 2.0.0 (Current)
- Complete backend integration
- User authentication system
- Equipment booking platform
- Admin dashboard
- Quote management system
- Production-ready deployment

### Version 1.0.0
- Initial static website
- Equipment showcase
- Contact forms
- Service information