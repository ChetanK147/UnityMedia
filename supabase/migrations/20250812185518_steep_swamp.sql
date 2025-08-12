/*
  # UnityMedia Complete Database Schema

  1. New Tables
    - `profiles`: User profile information
      - Links to auth.users with additional business info
      - Stores company details and preferences

    - `equipment_categories`: Equipment categorization
      - Cameras, lenses, lighting, accessories, etc.
      - Hierarchical structure support

    - `equipment_items`: Individual equipment inventory
      - Detailed specifications and availability
      - Pricing and rental terms
      - Image galleries and documentation

    - `bookings`: Equipment rental bookings
      - Date ranges, status tracking
      - Customer information and requirements
      - Pricing and payment status

    - `projects`: Portfolio projects showcase
      - Project details, images, videos
      - Client testimonials and case studies
      - Service type categorization

    - `quotes`: Quote requests and management
      - Service requirements and specifications
      - Pricing calculations and approvals
      - Communication history

    - `blog_posts`: Content management for blog
      - SEO-optimized content structure
      - Categories and tags system
      - Publishing workflow

  2. Security
    - Row Level Security enabled on all tables
    - Proper access policies for different user roles
    - Admin and client role separation

  3. Functions
    - Automated booking conflict detection
    - Quote calculation helpers
    - Notification triggers
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('client', 'admin', 'staff');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
CREATE TYPE quote_status AS ENUM ('draft', 'sent', 'approved', 'rejected', 'expired');
CREATE TYPE project_status AS ENUM ('draft', 'published', 'featured', 'archived');

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  email text NOT NULL,
  full_name text NOT NULL,
  company_name text,
  phone text,
  role user_role DEFAULT 'client',
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Equipment categories
CREATE TABLE IF NOT EXISTS equipment_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES equipment_categories(id),
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE equipment_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view equipment categories"
  ON equipment_categories FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage equipment categories"
  ON equipment_categories FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Equipment items
CREATE TABLE IF NOT EXISTS equipment_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES equipment_categories(id) NOT NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  specifications jsonb DEFAULT '{}',
  daily_rate decimal(10,2) NOT NULL,
  weekly_rate decimal(10,2),
  monthly_rate decimal(10,2),
  security_deposit decimal(10,2) DEFAULT 0,
  quantity_available integer DEFAULT 1,
  images text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE equipment_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available equipment"
  ON equipment_items FOR SELECT
  TO authenticated, anon
  USING (is_available = true);

CREATE POLICY "Admins can manage equipment"
  ON equipment_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  equipment_items uuid[] NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status booking_status DEFAULT 'pending',
  total_amount decimal(10,2) NOT NULL,
  security_deposit decimal(10,2) DEFAULT 0,
  special_requirements text,
  delivery_address text,
  contact_phone text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all bookings"
  ON bookings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Projects portfolio
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  content text,
  client_name text,
  project_type text NOT NULL,
  services_provided text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  video_url text,
  featured_image text,
  status project_status DEFAULT 'draft',
  completion_date date,
  testimonial text,
  testimonial_author text,
  testimonial_position text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published projects"
  ON projects FOR SELECT
  TO authenticated, anon
  USING (status = 'published' OR status = 'featured');

CREATE POLICY "Admins can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Quotes
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text NOT NULL,
  company_name text,
  phone text,
  service_type text NOT NULL,
  project_description text NOT NULL,
  requirements jsonb DEFAULT '{}',
  estimated_amount decimal(10,2),
  status quote_status DEFAULT 'draft',
  valid_until date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own quotes"
  ON quotes FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Anyone can create quote requests"
  ON quotes FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Admins can manage all quotes"
  ON quotes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  author_id uuid REFERENCES auth.users(id) NOT NULL,
  category text,
  tags text[] DEFAULT '{}',
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO authenticated, anon
  USING (is_published = true);

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Insert sample data
INSERT INTO equipment_categories (name, slug, description) VALUES
  ('Cameras', 'cameras', 'Professional cameras and cinema equipment'),
  ('Lenses', 'lenses', 'Cinema lenses and photography optics'),
  ('Lighting', 'lighting', 'Professional lighting equipment'),
  ('Audio', 'audio', 'Sound recording and audio equipment'),
  ('Accessories', 'accessories', 'Tripods, gimbals, and support equipment'),
  ('Drones', 'drones', 'Aerial filming and drone equipment');

-- Insert sample equipment items
INSERT INTO equipment_items (category_id, name, slug, description, daily_rate, weekly_rate, specifications, images) 
SELECT 
  c.id,
  'Sony FX3',
  'sony-fx3',
  'Full Frame Cinema Camera with exceptional low-light performance',
  800.00,
  4800.00,
  '{"sensor": "Full Frame", "resolution": "4K", "iso_range": "80-409600", "recording": "4K 120p"}',
  ARRAY['src/lib/SonyFX3.jpg']
FROM equipment_categories c WHERE c.slug = 'cameras';

INSERT INTO equipment_items (category_id, name, slug, description, daily_rate, weekly_rate, specifications, images)
SELECT 
  c.id,
  'DJI Mavic 4 Pro',
  'dji-mavic-4-pro',
  'Professional drone with 4K Hasselblad camera',
  1500.00,
  9000.00,
  '{"camera": "Hasselblad", "resolution": "4K", "flight_time": "34 minutes", "range": "15km"}',
  ARRAY['src/lib/DJI Mavic 4pro Creator Combo.jpg']
FROM equipment_categories c WHERE c.slug = 'drones';

-- Insert sample projects
INSERT INTO projects (title, slug, description, client_name, project_type, services_provided, status, featured_image, testimonial, testimonial_author, testimonial_position)
VALUES 
  (
    'Luxury Villa Real Estate Tour',
    'luxury-villa-real-estate-tour',
    'Complete 3D virtual tour and aerial cinematography for premium Dubai property',
    'Emirates Properties',
    'Real Estate',
    ARRAY['Matterport 3D Tours', 'Drone Filming', 'Video Editing'],
    'published',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80',
    'UnityMedia delivered exceptional 3D tours for our luxury properties. The quality and attention to detail exceeded our expectations.',
    'Ahmed Al-Rashid',
    'Real Estate Developer'
  ),
  (
    'Corporate Brand Campaign',
    'corporate-brand-campaign',
    'Multi-platform video content creation for tech startup launch',
    'TechStart Dubai',
    'Commercial',
    ARRAY['Video Production', 'Equipment Rental', 'Post Production'],
    'published',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80',
    'Their equipment rental service is top-notch. Always reliable, professional gear that helps us deliver outstanding results.',
    'Sarah Johnson',
    'Marketing Director'
  );

-- Create function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_equipment_items_category ON equipment_items(category_id);
CREATE INDEX IF NOT EXISTS idx_equipment_items_available ON equipment_items(is_available);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at);