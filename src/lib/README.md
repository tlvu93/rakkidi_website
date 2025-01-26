# Library Integrations

This directory contains third-party library integrations and adapters.

## Purpose

- Centralize third-party library configurations
- Provide consistent interfaces for external services
- Abstract vendor-specific implementations
- Manage library initialization and setup

## Guidelines

Integration modules should:

- Be isolated and replaceable
- Have clear documentation
- Include proper error handling
- Provide type definitions
- Follow consistent initialization patterns

Example:

```typescript
// src/lib/analytics.ts
export class AnalyticsService {
  private client: AnalyticsClient;

  constructor(config: AnalyticsConfig) {
    this.client = new AnalyticsClient(config);
  }

  trackEvent(name: string, properties?: Record<string, unknown>): void {
    this.client.track({
      eventName: name,
      properties
    });
  }
}

// src/lib/storage.ts
export class StorageService {
  private storage: CloudStorage;

  async uploadFile(file: File): Promise<string> {
    try {
      const url = await this.storage.upload(file);
      return url;
    } catch (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
  }
}
```
