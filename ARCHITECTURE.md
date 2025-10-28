# Architecture Documentation

## System Overview

SeedMatch AI is a client-side focused application with minimal server-side processing. The architecture prioritizes user privacy and performance.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     User Browser                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           React Components (Client-Side)             │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │ LocationDetector → SeedRecommendations → UI     │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        Chrome AI APIs (On-Device Processing)         │   │
│  │  ├─ Prompt API (Language Model)                      │   │
│  │  ├─ Translation API                                  │   │
│  │  └─ Web Speech API                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Browser Storage (localStorage)               │   │
│  │  ├─ Search History                                   │   │
│  │  └─ Language Preference                              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
         ↓                                    ↓
    ┌─────────────────┐          ┌──────────────────────┐
    │ Public APIs     │          │ Next.js Server       │
    ├─────────────────┤          ├──────────────────────┤
    │ Open-Elevation  │          │ /api/recommendations │
    │ Nominatim       │          │ (Seed Database)      │
    └─────────────────┘          └──────────────────────┘
\`\`\`

## Component Architecture

### Page Layer

**`app/page.tsx`** - Main application page
- State management for location, recommendations, history
- Orchestrates component interactions
- Handles API calls

### Component Layer

#### Location Detection
**`components/location-detector.tsx`**
- Geolocation API integration
- Geocoding (name to coordinates)
- Reverse geocoding (coordinates to name)
- Error handling and user feedback

#### Seed Recommendations
**`components/seed-recommendations.tsx`**
- Displays seed cards
- Text-to-speech functionality
- Copy to clipboard
- AI translation triggers
- Agronomic advice expansion

#### Agronomic Advice
**`components/agronomic-advice.tsx`**
- Fetches farming tips via Chrome AI
- Fallback to default advice
- Text-to-speech and copy features

#### Search History
**`components/search-history.tsx`**
- Displays previous searches
- localStorage persistence
- Quick access to past locations

#### Language Selector
**`components/language-selector.tsx`**
- Language preference selection
- localStorage persistence
- UI translation

#### AI Features Badge
**`components/ai-features-badge.tsx`**
- Indicates Chrome AI availability
- Visual indicator for users

### Utility Layer

#### Seed Data
**`lib/seed-data.ts`**
- 30+ seed varieties database
- Altitude zone filtering
- Seed matching algorithm

#### Chrome AI Utilities
**`lib/chrome-ai.ts`**
- Prompt API wrapper
- Translation API wrapper
- Availability checking
- Error handling

#### Language Utilities
**`lib/language-utils.ts`**
- Translation functions
- Default translations
- Language type definitions

#### Agronomic Advice
**`lib/agronomic-advice.ts`**
- Advice generation logic
- Summarization
- Default advice fallback

### API Layer

#### Recommendations Endpoint
**`app/api/recommendations/route.ts`**
- POST endpoint for seed recommendations
- Input validation
- Seed filtering by altitude
- Response formatting

## Data Flow

### 1. Location Detection Flow

\`\`\`
User Input (Location Name or Coordinates)
    ↓
LocationDetector Component
    ↓
Geocoding (if name) / Validation (if coordinates)
    ├─ Nominatim API (name → coordinates)
    └─ Open-Elevation API (coordinates → altitude)
    ↓
LocationData Object
    ↓
app/page.tsx (state update)
    ↓
API Call to /api/recommendations
\`\`\`

### 2. Recommendation Flow

\`\`\`
LocationData (altitude)
    ↓
/api/recommendations endpoint
    ↓
getRecommendedSeeds(altitude)
    ├─ Filter seeds by altitude range
    └─ Sort by proximity to altitude
    ↓
Recommendations Array
    ↓
SeedRecommendations Component
    ↓
Display Seed Cards
\`\`\`

### 3. AI Enhancement Flow

\`\`\`
Seed Data
    ↓
Chrome AI APIs (if available)
    ├─ Prompt API → Enhanced Description
    └─ Translation API → Kiswahili Translation
    ↓
Enhanced Seed Data
    ↓
Display in UI
    ↓
Fallback to Default (if AI unavailable)
\`\`\`

## State Management

### Global State (app/page.tsx)

\`\`\`typescript
interface LocationData {
  latitude: number
  longitude: number
  altitude: number
  location: string
}

interface Recommendation {
  id: string
  name: string
  variety: string
  // ... other fields
}

// State
const [location, setLocation] = useState<LocationData | null>(null)
const [recommendations, setRecommendations] = useState<Recommendation[]>([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
const [history, setHistory] = useState<LocationData[]>([])
const [language, setLanguage] = useState<Language>("en")
\`\`\`

### Local State (Component Level)

- Component-specific UI state (expanded, copied, speaking)
- Managed with `useState` hooks
- No prop drilling

### Persistent State (localStorage)

- Search history
- Language preference
- Survives page refreshes

## API Integration

### External APIs

1. **Open-Elevation API**
   - Endpoint: `https://api.open-elevation.com/api/v1/lookup`
   - Method: GET
   - Purpose: Get altitude from coordinates
   - Error Handling: Returns 0 on failure

2. **Nominatim API**
   - Endpoint: `https://nominatim.openstreetmap.org/`
   - Methods: GET (search, reverse)
   - Purpose: Geocoding and reverse geocoding
   - Error Handling: Returns "Unknown Location" on failure

3. **Chrome AI APIs**
   - Prompt API: `window.ai.languageModel`
   - Translation API: `window.ai.translation`
   - Purpose: On-device AI processing
   - Error Handling: Graceful degradation

### Internal APIs

**POST /api/recommendations**
- Input: `{ altitude: number, location: string }`
- Output: `{ location, altitude, count, recommendations }`
- Validation: Altitude must be non-negative number
- Error Handling: Returns appropriate HTTP status codes

## Performance Considerations

### Client-Side Optimization

1. **Code Splitting**: Automatic with Next.js
2. **Component Lazy Loading**: Components load on demand
3. **Memoization**: React.memo for expensive components
4. **Debouncing**: Search input debouncing

### Network Optimization

1. **API Caching**: Browser caching for API responses
2. **Minimal Payloads**: Only necessary data sent
3. **Parallel Requests**: Promise.all for concurrent API calls

### Rendering Optimization

1. **CSS-in-JS**: Tailwind CSS for optimized styles
2. **Image Optimization**: Next.js Image component
3. **Font Optimization**: System fonts, no external fonts

## Error Handling Strategy

### User-Facing Errors

- Geolocation denied → Show manual entry option
- API failure → Show cached data or default advice
- Invalid input → Show validation message

### Developer-Facing Errors

- Console logging for debugging
- Error boundaries for React errors
- Try-catch blocks for async operations

## Security Architecture

### Data Privacy

- No server-side storage of location data
- All processing on client-side
- localStorage for local persistence only

### API Security

- Input validation on all endpoints
- Error messages don't expose sensitive info
- HTTPS enforcement

### Browser Security

- Content Security Policy headers
- XSS protection via React
- CSRF protection via Next.js

## Scalability Considerations

### Current Limitations

- Seed database is static (in-memory)
- No user authentication
- No real-time updates

### Future Scalability

1. **Database Integration**
   - Move seed data to database
   - Enable dynamic seed updates
   - Support for regional variations

2. **User Accounts**
   - Personalized recommendations
   - Saved preferences
   - Community features

3. **Real-Time Updates**
   - WebSocket for live data
   - Push notifications
   - Weather integration

## Testing Strategy

### Unit Tests

- Utility functions (seed filtering, translations)
- API endpoint validation
- Component rendering

### Integration Tests

- Location detection flow
- Recommendation generation
- API integration

### E2E Tests

- User workflows
- Chrome AI integration
- Error scenarios

## Deployment Architecture

### Vercel Deployment

\`\`\`
GitHub Repository
    ↓
Vercel CI/CD
    ↓
Build & Test
    ↓
Deploy to Edge Network
    ↓
Global CDN Distribution
\`\`\`

### Environment Configuration

- Development: `npm run dev`
- Production: `npm run build && npm start`
- Deployment: Automatic via Vercel

## Monitoring & Observability

### Vercel Analytics

- Page performance metrics
- User interactions
- Error tracking

### Browser Console

- Development logging
- Error reporting
- Performance metrics

## Future Architecture Improvements

1. **Service Workers**: Offline support
2. **WebAssembly**: Performance-critical calculations
3. **GraphQL**: More flexible API queries
4. **Microservices**: Separate services for different features
5. **Real-time Database**: Firebase or Supabase integration
