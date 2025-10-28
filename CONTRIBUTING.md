# Contributing to SeedMatch AI

Thank you for your interest in contributing to SeedMatch AI! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

### Prerequisites

- Node.js 18+
- Git
- Familiarity with React, Next.js, and TypeScript

### Development Setup

1. **Fork the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/seedmatch-ai.git
   cd seedmatch-ai
   \`\`\`

2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

3. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Make your changes**

6. **Test your changes**
   \`\`\`bash
   npm run lint
   npm run build
   \`\`\`

## Contribution Types

### Bug Reports

1. Check existing issues first
2. Provide detailed description
3. Include steps to reproduce
4. Specify browser and OS
5. Attach screenshots if applicable

### Feature Requests

1. Describe the feature clearly
2. Explain the use case
3. Provide examples
4. Discuss implementation approach

### Code Contributions

1. Follow the code style
2. Add tests for new features
3. Update documentation
4. Write clear commit messages

## Code Style Guide

### TypeScript

\`\`\`typescript
// Use explicit types
const getSeeds = (altitude: number): Seed[] => {
  // Implementation
}

// Use interfaces for objects
interface LocationData {
  latitude: number
  longitude: number
  altitude: number
  location: string
}

// Use const for immutability
const seedDatabase: Seed[] = [...]
\`\`\`

### React Components

\`\`\`typescript
// Use functional components
export default function MyComponent({ prop }: Props) {
  return <div>{prop}</div>
}

// Use hooks for state
const [state, setState] = useState<Type>(initialValue)

// Use TypeScript for props
interface MyComponentProps {
  title: string
  onClick: () => void
}
\`\`\`

### Styling

\`\`\`typescript
// Use Tailwind CSS classes
<div className="flex items-center justify-between gap-4 p-4">
  {/* Content */}
</div>

// Use semantic HTML
<main className="container mx-auto">
  <header>Header</header>
  <section>Content</section>
</main>
\`\`\`

## Commit Message Guidelines

\`\`\`
type(scope): subject

body

footer
\`\`\`

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Tests
- `chore`: Build, dependencies

### Examples

\`\`\`
feat(location): add coordinate input validation

- Validate latitude and longitude ranges
- Show error message for invalid input
- Add unit tests

Closes #123
\`\`\`

\`\`\`
fix(recommendations): handle missing altitude data

- Return default altitude when API fails
- Add error logging
- Improve error message

Fixes #456
\`\`\`

## Pull Request Process

1. **Update your branch**
   \`\`\`bash
   git fetch origin
   git rebase origin/main
   \`\`\`

2. **Push your changes**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

3. **Create Pull Request**
   - Clear title and description
   - Reference related issues
   - Explain changes and rationale

4. **Address Review Comments**
   - Make requested changes
   - Push updates
   - Re-request review

5. **Merge**
   - Squash commits if needed
   - Delete feature branch

## Testing Guidelines

### Unit Tests

\`\`\`typescript
describe("getRecommendedSeeds", () => {
  it("should return seeds for valid altitude", () => {
    const seeds = getRecommendedSeeds(1500)
    expect(seeds.length).toBeGreaterThan(0)
  })

  it("should filter by altitude range", () => {
    const seeds = getRecommendedSeeds(500)
    seeds.forEach((seed) => {
      expect(seed.min_altitude).toBeLessThanOrEqual(500)
      expect(seed.max_altitude).toBeGreaterThanOrEqual(500)
    })
  })
})
\`\`\`

### Component Tests

\`\`\`typescript
describe("LocationDetector", () => {
  it("should render input field", () => {
    render(<LocationDetector onLocationDetected={jest.fn()} />)
    expect(screen.getByPlaceholderText(/location/i)).toBeInTheDocument()
  })

  it("should call callback on location detection", async () => {
    const callback = jest.fn()
    render(<LocationDetector onLocationDetected={callback} />)
    // Simulate user interaction
    // Assert callback was called
  })
})
\`\`\`

## Documentation

### Code Comments

\`\`\`typescript
// Use comments for complex logic
// Calculate altitude zone based on elevation
const getAltitudeZone = (altitude: number): string => {
  if (altitude < 1000) return "Dryland"
  if (altitude < 1500) return "Transitional"
  // ... more zones
}
\`\`\`

### JSDoc Comments

\`\`\`typescript
/**
 * Get recommended seeds for a specific altitude
 * @param altitude - Elevation in meters
 * @returns Array of recommended seed varieties
 */
export function getRecommendedSeeds(altitude: number): Seed[] {
  // Implementation
}
\`\`\`

### README Updates

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for structural changes
- Update API documentation for endpoint changes

## Performance Guidelines

- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Debounce search inputs
- Lazy load components when possible
- Optimize images and assets

## Accessibility Guidelines

- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure color contrast (WCAG AA)
- Test with keyboard navigation
- Support screen readers

## Security Guidelines

- Never commit secrets or API keys
- Validate all user inputs
- Sanitize data before display
- Use HTTPS for external requests
- Follow OWASP guidelines

## Questions or Need Help?

- Check existing documentation
- Search GitHub issues
- Create a discussion
- Contact maintainers

## Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes

Thank you for contributing to SeedMatch AI!
