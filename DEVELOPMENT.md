# Development Guidelines

Comprehensive guide for contributing to the Tecnoprints project with professional standards and best practices.

## 🏗️ Architecture Overview

```
Request → Header (memo)
   ↓
Router → Page Component
   ↓
Sections (all memo'd):
├── Hero (video bg, stats, features)
├── Partners (logo showcase)
├── Services (capabilities)
├── Process (workflow)
├── CTA (call-to-action)
├── Support (help section)
├── FAQ (questions)
├── Forms (quote & contact)
└── Certifications (badges)
   ↓
Footer
```

## 📋 File Organization

### Components by Purpose

**Layout Components** (`components/layout/`)
- `Header.tsx` - Navigation header (sticky, responsive)
- `Footer.tsx` - Footer with links

**Page Sections** (`components/sections/`)
- Large, self-contained page sections
- Each is a complete visual block
- Exported with memo for optimization
- Uses shared utilities and constants

**UI Components** (`components/ui/`)
- Reusable, atomic components
- Button, Card, Logo variants
- Animation wrappers (FadeIn, ScrollFadeIn)
- Memoized to prevent re-renders

### Utilities & Constants

**`lib/constants.ts`**
- Navigation, partners, stats data
- Animation configs
- Site metadata

**`lib/animation.ts`**
- Easing functions
- Animation creators
- Timing utilities

**`lib/utils.ts`**
- `cn()` - classname utility
- Other helper functions

**`hooks/useInView.ts`**
- Intersection Observer hook
- Scroll-triggered animations

## 🎯 Component Pattern

### Section Component Template

```typescript
'use client'

import { memo } from 'react'
import { YOUR_CONSTANT } from '@/lib/constants'
import ScrollFadeIn from '@/components/ui/ScrollFadeIn'

/**
 * YourSection Component
 * Brief description of what this section does
 */
function YourSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12">Section Title</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {YOUR_CONSTANT.map((item) => (
            <ScrollFadeIn key={item.id}>
              <div className="...">
                {/* Content */}
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(YourSection)
```

### UI Component Template

```typescript
'use client'

import { memo, forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface YourComponentProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * YourComponent
 * Description of the component
 *
 * @example
 * <YourComponent variant="primary" size="lg" />
 */
const YourComponent = memo(
  forwardRef<HTMLDivElement, YourComponentProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          'base-styles',
          {
            'primary-variant': variant === 'primary',
            'secondary-variant': variant === 'secondary',
          },
          {
            'sm-size': size === 'sm',
            'md-size': size === 'md',
            'lg-size': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  )
)

YourComponent.displayName = 'YourComponent'

export default YourComponent
```

## 🎨 Styling Guidelines

### Tailwind CSS Classes Order

```typescript
className={cn(
  // Layout
  'relative w-full',

  // Box Model (padding/margin)
  'px-4 py-6',

  // Display & Flexbox
  'flex items-center gap-4',

  // Typography
  'text-lg font-semibold text-white',

  // Colors & Backgrounds
  'bg-primary/10 border border-border',

  // Effects & Transforms
  'shadow-lg rounded-lg',

  // Interactions
  'transition-all duration-300 hover:bg-primary/20',

  // Responsive
  'md:flex-row md:px-8 lg:gap-6',

  // Custom (always last)
  className
)}
```

### Color Palette

```typescript
// Primary (Action, highlights)
bg-primary           // #10b981 (Green)
hover:bg-primary-dark
text-primary
border-primary

// Neutral
bg-background        // Dark background
bg-surface          // Slightly lighter layer
text-white          // Main text
text-muted          // Secondary text
border-border       // Subtle borders

// States
focus:ring-primary/50
disabled:opacity-50
hover:opacity-100
```

### Responsive Breakpoints

```typescript
// Mobile first approach
// No prefix: 0px and up
className="w-full"

// sm: 640px and up
className="sm:w-1/2"

// md: 768px and up
className="md:w-1/3 md:flex-row"

// lg: 1024px and up
className="lg:w-1/4 lg:gap-8"

// xl: 1280px and up
className="xl:gap-12"
```

## ⚡ Performance Guidelines

### Component Optimization

**✅ DO**
```typescript
// Memoize expensive components
export default memo(MyComponent)

// Use constants for repeated data
import { MY_DATA } from '@/lib/constants'

// GPU-accelerated properties only
style={{ transform: 'translateY(0)', opacity: 1 }}

// useCallback for event handlers
const handleClick = useCallback(() => {}, [])

// React.lazy for route-based splitting
const MySection = dynamic(() => import('./MySection'))
```

**❌ DON'T**
```typescript
// Creating objects/arrays inline
<Component data={[1, 2, 3]} />        // Creates new array every render
<Component style={{ color: 'red' }} /> // Creates new object every render

// Hardcoded repeated values
const navItems = [...]
// ... same data repeated elsewhere

// Non-GPU-accelerated properties
style={{ top: '10px', left: '0' }}  // Causes layout recalc

// Inline functions
onClick={() => {}}  // New function every render

// Everything in one component
function LargeComponent() { /* 500+ lines */ }  // Split into sections
```

### Animation Performance

**✅ Fast**
```typescript
// GPU-accelerated: transform, opacity
transition: 'opacity 0.3s ease, transform 0.3s ease'
transform: 'translateY(0)'

// Use willChange sparingly
willChange: 'opacity, transform'  // Only when needed
```

**❌ Slow**
```typescript
// Reflow-causing properties
transition: 'top 0.3s ease, left 0.3s ease'
top: '10px'
left: '0'

// Layout properties
height, width, margin, padding
```

## 🧪 Code Quality

### TypeScript

**✅ Good**
```typescript
// Proper typing
interface Props {
  title: string
  count?: number
  onClick: (id: string) => void
}

// Const assertions for constants
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

// Proper type exports
export type Status = typeof STATUS[keyof typeof STATUS]
```

**❌ Bad**
```typescript
// Any type
const data: any = {}

// No interface
function Component(props) { }

// String literal types scattered
type Status = 'active' | 'inactive' | 'pending' | 'error'
// ... repeated elsewhere
```

### Comments

**✅ Good Comments**
```typescript
// Explains WHY, not WHAT
// Fetch user to check premium status before showing premium features
const user = getUser()

// Explains complex logic
// Calculate discount based on bulk quantity
// 100+ items: 10%, 50+: 5%, 10+: 2%
const discount = quantity >= 100 ? 0.1 : quantity >= 50 ? 0.05 : 0.02
```

**❌ Bad Comments**
```typescript
// Redundant
// Get the user
const user = getUser()

// Obvious
// Loop through items
items.forEach(item => { })

// Outdated
// TODO: Fix this bug (from 2 years ago)
```

### Naming Conventions

```typescript
// Components: PascalCase
function MyComponent() { }
export default memo(MyComponent)

// Functions/hooks: camelCase
function getUser() { }
export const useInView = () => { }

// Constants: UPPER_SNAKE_CASE
export const HERO_STATS = [...]
export const ANIMATION_DURATION = 800

// Private: underscore prefix
const _internalHelper = () => { }

// CSS classes: kebab-case (Tailwind)
className="bg-primary text-white"

// Files: kebab-case
MyComponent.tsx  ✅
my-component.tsx ✅
MyComponent.jsx  ❌ (wrong extension)
```

## 🔄 Git Workflow

### Branch Naming
```bash
feature/add-testimonials           # New feature
fix/mobile-header-bug              # Bug fix
refactor/extract-button-styles     # Refactoring
docs/update-readme                 # Documentation
```

### Commit Messages
```bash
# Format: type(scope): description
feat(hero): add video background to hero section
fix(header): prevent white line when scrolling
refactor(components): extract button styles to constants
docs: add optimization guide

# Be specific and descriptive
✅ feat(partners): add partner logos with links
❌ add stuff
❌ fix bug
```

### Pull Request Process
1. Create feature branch from `main`
2. Make atomic commits with clear messages
3. Keep PR focused (one feature = one PR)
4. Add description explaining changes
5. Request review from team members
6. Address feedback
7. Merge after approval

## 📱 Testing Your Changes

### Desktop Testing
```bash
# Test at different viewport sizes
Chrome DevTools → Device Toolbar
- 375px (Mobile)
- 768px (Tablet)
- 1920px (Desktop)

# Check animations
- Smooth 60 FPS
- No janky movements
- No layout shifts
```

### Mobile Testing
```bash
# Test on actual devices if possible
- iPhone (Safari)
- Android (Chrome)

# Check:
- Touch interactions work
- Videos autoplay
- Forms are usable
- Text is readable
```

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Lighthouse Testing
```bash
# Run in Chrome DevTools
DevTools → Lighthouse

# Targets
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
```

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] Lighthouse score > 90
- [ ] Mobile responsive on actual devices
- [ ] No console errors/warnings
- [ ] Environment variables set
- [ ] API endpoints correct
- [ ] Images optimized
- [ ] All links working
- [ ] Forms functional
- [ ] Analytics tracking
- [ ] SEO meta tags correct

## 📚 Useful Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Web.dev Performance](https://web.dev/performance/)

### Tools
- Chrome DevTools
- VS Code Extensions
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin

### Learning
- [React Performance](https://react.dev/reference/react/memo)
- [Web Vitals](https://web.dev/vitals/)
- [CSS Performance](https://web.dev/rendering-performance/)
- [Accessibility](https://www.a11y-101.com/)

## ❓ FAQ

**Q: Should I add more animations?**
A: Only if they add value. Every animation should have a purpose. Smooth transitions ≠ distracting animations.

**Q: How do I know if a component needs memo?**
A: Use React DevTools Profiler. Memo if the component re-renders frequently without prop changes.

**Q: Can I use global state?**
A: For this project, prop drilling is fine. If it becomes unwieldy, consider Context API.

**Q: Should I optimize everything?**
A: No. Optimize what matters. Lighthouse + user experience are the guides.

**Q: Can I refactor old code?**
A: Yes, but in separate PRs. Don't mix refactoring with feature work.

---

**Remember**: Code is read more often than it's written. Write for the next developer (who might be you in 6 months).

---

**Document Version**: 1.0
**Last Updated**: February 2026
