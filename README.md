# SeedMatch AI - Smart Seed Recommendations for Farmers

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mwanikiadmin-6971s-projects/v0-seed-match-ai-app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

## Overview

**SeedMatch AI** is an intelligent agricultural recommendation system designed to help farmers in East Africa select the best seed varieties for their specific location and altitude. The app uses geolocation, Chrome AI APIs, and a comprehensive seed database to provide personalized recommendations with practical farming tips.

### Key Features

- **Location-Based Recommendations**: Get seed suggestions based on your exact location and altitude
- **Location Search**: Search by place name or coordinates (latitude, longitude)
- **Chrome AI Integration**: 
  - Enhanced descriptions using Chrome Prompt API
  - Kiswahili translations via Chrome Translation API
  - AI-powered agronomic advice
- **Multi-Language Support**: English, Kiswahili, and French
- **Accessibility First**: Designed for farmers with limited literacy
  - Large, clear icons and visual indicators
  - Text-to-speech functionality
  - Simple, intuitive interface
- **Search History**: Quick access to previous location searches
- **Agronomic Advice**: Get practical farming tips for each crop

## Technology Stack

- **Frontend**: Next.js 16, React 19.2, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **APIs**: 
  - Open-Elevation API (altitude data)
  - Nominatim OpenStreetMap API (geocoding)
  - Chrome Built-in AI APIs (Prompt, Translation)
  - Web Speech API (text-to-speech)
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## Project Structure

\`\`\`
seedmatch-ai/
├── app/
│   ├── api/
│   │   └── recommendations/
│   │       └── route.ts          # Seed recommendation API endpoint
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main application page
│   ├── loading.tsx               # Loading skeleton
│   └── globals.css               # Global styles and design tokens
├── components/
│   ├── location-detector.tsx     # Location input and geolocation
│   ├── seed-recommendations.tsx  # Seed cards display
│   ├── agronomic-advice.tsx      # Farming tips component
│   ├── search-history.tsx        # Search history sidebar
│   ├── language-selector.tsx     # Language preference selector
│   ├── ai-features-badge.tsx     # Chrome AI availability indicator
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── seed-data.ts              # Seed database (30+ varieties)
│   ├── chrome-ai.ts              # Chrome AI API utilities
│   ├── language-utils.ts         # Translation and language utilities
│   ├── agronomic-advice.ts       # Farming advice generation
│   └── utils.ts                  # General utilities
├── hooks/
│   ├── use-mobile.ts             # Mobile detection hook
│   └── use-toast.ts              # Toast notification hook
├── public/                       # Static assets
├── styles/                       # Additional stylesheets
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
└── README.md                     # This file
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager
- Chrome 131+ (for Chrome AI features)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/seedmatch-ai.git
   cd seedmatch-ai
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   pnpm install
   # or
   bun install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   # or
   pnpm dev
   # or
   bun dev
   \`\`\`

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage Guide

### Finding Seeds for Your Location

1. **Use Current Location**: Click "Use My Current Location" to automatically detect your position
2. **Manual Search**: Enter a location name (e.g., "Nairobi") or coordinates (e.g., "-1.2921, 36.8219")
3. **View Recommendations**: See all suitable seed varieties for your altitude zone
4. **Get Details**: Click "Tips" for agronomic advice or "AI" for translations

### Understanding Seed Information

Each seed card displays:
- **Crop Name & Variety**: The type and specific variety
- **Kiswahili Name**: Local language name
- **Days to Harvest**: Time from planting to harvest
- **Yield Potential**: Expected production per hectare
- **Planting Season**: Best time to plant
- **Seed Rate**: Amount of seed needed per hectare
- **Altitude Zone**: Recommended altitude range
- **Attributes**: Key characteristics (drought-tolerant, high-yield, etc.)

### Chrome AI Features

**Note**: Chrome AI features require Chrome 131+ with AI features enabled.

- **Enhanced Descriptions**: AI-generated farming tips for each crop
- **Kiswahili Translations**: Automatic translation of crop information
- **Agronomic Advice**: AI-powered farming recommendations based on altitude

## API Documentation

### POST /api/recommendations

Get seed recommendations for a specific altitude.

**Request Body**:
\`\`\`json
{
  "altitude": 1500,
  "location": "Nairobi"
}
\`\`\`

**Response**:
\`\`\`json
{
  "location": "Nairobi",
  "altitude": 1500,
  "count": 8,
  "recommendations": [
    {
      "id": "maize-h520",
      "name": "Maize",
      "variety": "H520",
      "kiswahili_name": "Mahindi",
      "altitude_zone": "Transitional Altitude",
      "altitude_range": "1000-1500m",
      "description": "Double cobbing variety, very sweet tasting...",
      "planting_season": "March-May, October-November",
      "yield_potential": "34 tons/hectare",
      "maturity": "120-150 days",
      "rate": "10 kg/ha",
      "attributes": ["Double cobbing", "Sweet tasting", "Disease tolerant"]
    }
  ]
}
\`\`\`

**Error Responses**:
- `400`: Invalid altitude (must be a non-negative number)
- `404`: No seeds found for the given altitude
- `500`: Internal server error

## Security Considerations

### Data Privacy

- **No Data Collection**: The app does not store user location data on servers
- **Client-Side Processing**: All location data is processed locally in the browser
- **localStorage**: Search history is stored locally on the user's device only
- **Third-Party APIs**: 
  - Open-Elevation and Nominatim are public APIs with privacy policies
  - No personal data is sent to these services beyond coordinates

### API Security

- **Input Validation**: All API inputs are validated for type and range
- **Error Handling**: Sensitive errors are not exposed to clients
- **CORS**: Configured appropriately for cross-origin requests
- **Rate Limiting**: Consider implementing rate limiting for production

### Browser Security

- **Content Security Policy**: Configured in Next.js headers
- **XSS Protection**: React's built-in XSS protection
- **HTTPS**: Enforced on Vercel deployment

## Environment Variables

No environment variables are required for basic functionality. The app uses public APIs.

For production deployment on Vercel:
- Analytics are automatically configured
- No additional setup needed

## Seed Database

The app includes 30+ seed varieties across 5 altitude zones:

1. **Dryland (0-1000m)**: Sunflower, Maize PH4, Finger Millet, Sorghum, Millet, Cowpea
2. **Transitional (1000-1500m)**: Maize H520, Finger Millet P224, Beans, Tomato, Onion
3. **Medium (1500-2000m)**: Maize Aminika, Potato, Cabbage, Carrot, Spinach, Peas
4. **Highland (2000-2500m)**: Maize H629, Wheat, Potato Highland, Cabbage Red, Broccoli, Cauliflower

Each seed includes:
- Altitude range
- Maturity period
- Planting season
- Yield potential
- Seed rate
- Kiswahili name
- Key attributes

## Chrome AI APIs

### Prompt API (Language Model)

Used for:
- Generating enhanced crop descriptions
- Creating agronomic advice
- Summarizing farming tips

**Availability**: Chrome 131+ with AI features enabled

### Translation API

Used for:
- Translating crop information to Kiswahili
- Supporting multi-language interface

**Supported Languages**: English, Kiswahili, French

## Accessibility Features

- **Visual Hierarchy**: Large icons and clear typography
- **Color Contrast**: WCAG AA compliant colors
- **Text-to-Speech**: Built-in audio for all crop names and advice
- **Semantic HTML**: Proper heading structure and ARIA labels
- **Mobile Responsive**: Works on all device sizes
- **Simple Language**: Designed for users with limited literacy

## Performance Optimization

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Using Next.js Image component
- **Caching**: Browser caching for API responses
- **Lazy Loading**: Components load on demand
- **CSS Optimization**: Tailwind CSS purging unused styles

## Browser Support

- Chrome 131+ (with AI features)
- Firefox 120+
- Safari 17+
- Edge 131+

**Note**: Chrome AI features require Chrome 131+ with AI features enabled. The app gracefully degrades on other browsers.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions:

1. Check existing [GitHub Issues](https://github.com/yourusername/seedmatch-ai/issues)
2. Create a new issue with detailed description
3. Contact the development team

## Roadmap

- [ ] Mobile app (React Native)
- [ ] Offline support with service workers
- [ ] Weather integration for planting recommendations
- [ ] Pest and disease identification
- [ ] Market price tracking
- [ ] Community forum for farmers
- [ ] Video tutorials in local languages
- [ ] Integration with agricultural extension services

## Acknowledgments

- Open-Elevation API for altitude data
- OpenStreetMap/Nominatim for geocoding
- Chrome AI APIs for intelligent features
- shadcn/ui for component library
- Vercel for hosting and deployment

## Changelog

### Version 1.0.0 (Current)
- Initial release
- 30+ seed varieties across 5 altitude zones
- Chrome AI integration
- Multi-language support
- Location-based recommendations
- Agronomic advice system
