# Constants

This directory contains application-wide constants and configuration values.

## Purpose

- Store reusable constant values
- Define application-wide enums
- Maintain configuration constants
- Define static data structures

## Usage

Constants should be:

- Immutable values
- Reused across multiple components/features
- Clearly named and documented
- Grouped logically by domain/purpose

Example:

```typescript
// src/constants/api.ts
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users'
  // ...
};

// src/constants/theme.ts
export const BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};
```
