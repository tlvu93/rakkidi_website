# Utilities

This directory contains shared utility functions and helper methods used across the application.

## Purpose

- Provide reusable helper functions
- Implement common operations
- Reduce code duplication
- Centralize shared logic

## Guidelines

Utility functions should be:

- Pure functions when possible
- Well-documented with JSDoc comments
- Unit tested
- Generic enough for reuse
- Focused on a single responsibility

Example:

```typescript
// src/utils/date.ts
export const formatDate = (date: Date, locale = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale).format(date);
};

// src/utils/validation.ts
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```
