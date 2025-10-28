# Security Policy

## Overview

SeedMatch AI is designed with security and privacy as core principles. This document outlines our security practices and guidelines.

## Data Privacy

### What Data We Collect

- **Location Data**: Only processed locally in your browser
- **Search History**: Stored locally in browser localStorage
- **Language Preference**: Stored locally in browser localStorage
- **No Personal Information**: We do not collect names, emails, or personal identifiers

### What Data We Don't Collect

- User identity information
- Device identifiers
- Browsing history
- IP addresses (beyond standard web server logs)
- Cookies for tracking

### Third-Party Data Sharing

We use the following public APIs:

1. **Open-Elevation API**
   - Sends: Latitude, Longitude
   - Receives: Altitude data
   - Privacy: https://open-elevation.com/

2. **Nominatim (OpenStreetMap)**
   - Sends: Coordinates or location name
   - Receives: Location information
   - Privacy: https://nominatim.org/

3. **Chrome AI APIs**
   - Processed entirely on your device
   - No data sent to external servers
   - Privacy: https://developer.chrome.com/docs/ai/

## API Security

### Input Validation

All API endpoints validate inputs:

\`\`\`typescript
// Example: Altitude validation
if (typeof altitude !== "number" || altitude < 0) {
  return NextResponse.json({ error: "Invalid altitude" }, { status: 400 })
}
\`\`\`

### Error Handling

- Sensitive errors are not exposed to clients
- Generic error messages for security
- Detailed logging on server side only

### Rate Limiting

For production deployment, implement rate limiting:

\`\`\`typescript
// Example with Upstash Redis
import { Ratelimit } from "@upstash/ratelimit"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 h"),
})

const { success } = await ratelimit.limit(ip)
\`\`\`

## Browser Security

### Content Security Policy

Configured in `next.config.mjs`:

\`\`\`javascript
headers: async () => [
  {
    source: "/(.*)",
    headers: [
      {
        key: "Content-Security-Policy",
        value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
      },
    ],
  },
]
\`\`\`

### XSS Protection

- React's built-in XSS protection
- No `dangerouslySetInnerHTML` usage
- Input sanitization for user data

### HTTPS

- Enforced on Vercel deployment
- All external API calls use HTTPS
- Secure cookies with HttpOnly flag

## Chrome AI Security

### Prompt API

- Runs entirely on your device
- No data sent to external servers
- Requires explicit user permission
- Can be disabled in Chrome settings

### Translation API

- Runs entirely on your device
- No data sent to external servers
- Requires explicit user permission

## Dependency Security

### Regular Updates

- Dependencies updated regularly
- Security patches applied immediately
- Automated dependency scanning with Dependabot

### Vulnerable Dependency Scanning

\`\`\`bash
npm audit
npm audit fix
\`\`\`

## Deployment Security

### Vercel Security

- DDoS protection
- Automatic HTTPS
- Secure environment variables
- Regular security audits

### Environment Variables

No sensitive environment variables required for basic functionality.

For production:
- Never commit `.env.local` to version control
- Use Vercel's environment variable management
- Rotate secrets regularly

## Reporting Security Issues

If you discover a security vulnerability, please email security@example.com instead of using the issue tracker.

**Do not** publicly disclose the vulnerability until it has been addressed.

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## Security Best Practices for Users

1. **Keep Chrome Updated**: Ensure you're using the latest Chrome version
2. **Enable Chrome AI Features**: Only if you trust the websites you visit
3. **Review Permissions**: Check browser permissions for location access
4. **Clear History**: Periodically clear browser data if concerned about privacy
5. **Use HTTPS**: Always access the app over HTTPS

## Compliance

- **GDPR**: No personal data collection
- **CCPA**: No personal data collection
- **HIPAA**: Not applicable (agricultural app)
- **SOC 2**: Vercel deployment is SOC 2 compliant

## Security Checklist

- [x] Input validation on all API endpoints
- [x] Error handling without sensitive information
- [x] HTTPS enforcement
- [x] XSS protection
- [x] CSRF protection (Next.js built-in)
- [x] No hardcoded secrets
- [x] Dependency scanning
- [x] Security headers configured
- [x] Privacy policy in place
- [x] No tracking or analytics of personal data

## Future Security Enhancements

- [ ] Rate limiting implementation
- [ ] API key rotation for third-party services
- [ ] Security audit by third party
- [ ] Penetration testing
- [ ] Bug bounty program
