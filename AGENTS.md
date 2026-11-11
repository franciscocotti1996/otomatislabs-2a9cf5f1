# Project rules

- Define Organization JSON-LD once in the static head with a stable identifier; route WebSite schemas reference that identifier to avoid duplicate entities.
- Serve optimized marketing images through the shared ResponsiveImage component and asset manifest, using CDN pointers, explicit sizes and intrinsic dimensions to avoid oversized downloads and layout shifts; retain JPEG/PNG fallbacks and the existing social-image URLs.