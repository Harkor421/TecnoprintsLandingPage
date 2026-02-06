# Tecnoprints Landing Page

Enterprise-grade 3D printing services landing page built with Next.js, React, and TypeScript. A professional B2B platform for showcasing 3D printing solutions to companies, entrepreneurs, and students.

## 🚀 Features

- **Modern Enterprise Design**: Clean, professional aesthetic with smooth animations and transitions
- **Performance Optimized**: Image optimization, code splitting, lazy loading, and minification
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Smooth Animations**: GPU-accelerated transitions and scroll-triggered effects
- **Video Backgrounds**: Professional video integration for hero sections
- **TypeScript**: Full type safety and better developer experience
- **Accessible**: WCAG compliant with proper semantic HTML and ARIA labels

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14.2 + React 18 |
| **Language** | TypeScript 5.3 |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | Framer Motion + CSS Transitions |
| **Icons** | Lucide React |
| **Utilities** | clsx, tailwind-merge |
| **3D Graphics** | Three.js + React Three Fiber |

## 📁 Project Structure

```
tecnoprints/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── layout/              # Layout components
│   │   ├── Header.tsx       # Navigation header
│   │   └── Footer.tsx       # Footer
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx         # Hero section with video background
│   │   ├── Partners.tsx     # Partner companies showcase
│   │   ├── Services.tsx     # Services offered
│   │   ├── Process.tsx      # How it works
│   │   ├── CTA.tsx          # Call-to-action
│   │   ├── Support.tsx      # Support section
│   │   ├── FAQ.tsx          # FAQs
│   │   ├── QuoteForm.tsx    # Quote request form
│   │   ├── ContactForm.tsx  # Contact form
│   │   └── Certifications.tsx # Certifications
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx       # Button component
│       ├── Card.tsx         # Card component
│       ├── Logo.tsx         # Logo with text
│       ├── FadeIn.tsx       # Page-load fade animation
│       ├── ScrollFadeIn.tsx # Scroll-triggered fade
│       └── AnimatedCounter.tsx # Animated numbers
├── lib/
│   ├── constants.ts         # Application constants
│   ├── animation.ts         # Animation utilities
│   ├── utils.ts             # Utility functions
│   └── styles.ts            # Style utilities
├── hooks/
│   └── useInView.ts         # Intersection Observer hook
├── public/                  # Static assets
│   ├── logo.png            # Company logo
│   ├── degentech-logo.png  # Partner logo
│   ├── inca-logo.png       # Partner logo
│   └── background-video.mp4 # Hero video
└── tailwind.config.ts       # Tailwind configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Green (#10b981) - Action buttons and highlights
- **Background**: Dark theme with subtle gradients
- **Text**: White with muted gray variants
- **Border**: Subtle gray borders for structure

### Animation Philosophy
- **Smooth**: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- **Load animations**: 0.8s duration with staggered delays
- **Hover effects**: 300ms transitions for interactivity
- **GPU-accelerated**: Using transform/opacity for performance

### Typography
- **Headers**: Bold, sharp angles, no rounded corners
- **Body**: Clean sans-serif for readability
- **Logo**: Arial Bold Italic - "Tecno" in white, "prints" in green

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tecnoprints.git
cd tecnoprints

# Install dependencies
npm install

# Create environment variables (if needed)
cp .env.example .env.local
```

### Development

```bash
# Start dev server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📋 Key Components

### Hero Section
- Full-height hero with video background
- Overlay gradients for text readability
- Animated stats counter
- Trust indicators (certifications, delivery time, no minimums)

### Partners Section
- Professional logo showcase
- Clickable company links
- Hover effects for interactivity
- Responsive grid layout

### Sections
- **Services**: 3D printing capabilities and options
- **Process**: Step-by-step workflow visualization
- **Support**: Customer support information
- **FAQ**: Common questions and answers
- **Forms**: Quote requests and contact information
- **Certifications**: Quality and compliance badges

## ⚡ Performance Optimizations

### Next.js Level
- ✅ Image optimization with AVIF/WebP formats
- ✅ Automatic code splitting
- ✅ Minification with SWC
- ✅ Static optimization
- ✅ No Server Header exposure

### React Level
- ✅ Component memoization with React.memo
- ✅ Lazy loading with dynamic imports
- ✅ Optimized re-renders
- ✅ Intersection Observer for scroll effects

### CSS Level
- ✅ Tailwind CSS purging (unused styles removed)
- ✅ GPU-accelerated animations (transform, opacity)
- ✅ Will-change hints for smooth transitions
- ✅ Minimal layout shifts

### Assets
- ✅ Video compression for backgrounds
- ✅ Image optimization (WebP/AVIF)
- ✅ Icon optimization (Lucide React)
- ✅ Font subsetting

## 🔧 Configuration

### Constants (`lib/constants.ts`)
All repeated values are centralized for easy maintenance:
- Navigation links
- Partner information
- Stats and features
- Animation timings
- Site metadata

### Animation (`lib/animation.ts`)
Reusable animation utilities:
- Easing functions (smooth, bounce, ease)
- Animation creators for fade-ins
- Standardized timing

### Environment Variables
Create `.env.local` for local development (if needed):
```
# Add any required environment variables here
```

## 🧪 Development Guidelines

### Code Style
- **TypeScript**: Strict mode enabled, full type coverage
- **Components**: Functional components with hooks
- **Props**: Properly typed with interfaces
- **Comments**: Only where logic isn't self-evident

### Naming Conventions
- Components: PascalCase (Hero.tsx)
- Utilities: camelCase (useInView.ts)
- Constants: UPPER_CASE (NAVIGATION)
- Files: kebab-case for folders, PascalCase for components

### Best Practices
- ✅ Memoize expensive components
- ✅ Use constants for repeated values
- ✅ Optimize images and assets
- ✅ Keep components focused and single-purpose
- ✅ Extract repeated patterns into utilities
- ✅ Document complex animations

## 🎯 SEO Optimization

- ✅ Meta descriptions and Open Graph tags
- ✅ Semantic HTML structure
- ✅ Image alt text for accessibility
- ✅ Mobile-friendly design
- ✅ Fast page load times
- ✅ Structured data markup

## 📱 Responsive Breakpoints

- **Mobile**: 640px and below
- **Tablet**: 641px to 1024px
- **Desktop**: 1025px and above
- **Large Desktop**: 1440px and above

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub and connect to Vercel for automatic deployments
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

## 🔍 Monitoring

- **Performance**: Use Next.js Web Vitals
- **Analytics**: Integrate Google Analytics
- **Errors**: Set up error tracking (Sentry)
- **SEO**: Monitor with Google Search Console

## 📝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

### Development Standards
- Run linter: `npm run lint`
- Type check: `tsc --noEmit`
- Test in multiple browsers
- Check mobile responsiveness

## 📄 License

This project is private. Contact for licensing inquiries.

## 📞 Support

For support, contact: [contact information]

## 🙏 Credits

- Design inspiration from enterprise SaaS websites
- Icons by Lucide React
- Color palette optimized for accessibility
- Video processing for performance

---

**Last Updated**: February 2026
**Version**: 1.0.0
**Maintained By**: Development Team
