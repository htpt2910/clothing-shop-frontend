# ProductCard Component Implementation Plan

## Issue Summary

- **Issue #4**: [FE] Adding ProductCard components
- **Type**: Frontend Component (React/Next.js)
- **Design**: A card component displaying product image, name, and price
- **API**: Not required at this stage

## Design Analysis

Based on the provided mockup (for the image size, don't have to follow the example. make sure that 4 items will be able to show on 1 row is fine):

- Card has a white background with shadow
- Product image takes up majority of the card space
- Product name displayed below image
- Price displayed prominently at the bottom

## Implementation Steps

### 1. Component Structure

- Create `components/ProductCard/index.tsx` as the main component file
- Use `Product` interface from `lib/types/product.ts` if exists. if not, create.
- Make component reusable (click functionality to be added later)

### 2. Technical Approach

- **Framework**: React with TypeScript (following existing patterns)
- **Styling**: Tailwind CSS (project already configured)
- **Image Handling**: Next.js Image component for optimization
- **Props**:
  - `product`: Product object containing id, name, price, image

### 3. Component Features

- Responsive design that works on mobile and desktop
- Hover effects for better interactivity
- Image lazy loading with Next.js Image
- Price formatting with proper decimal places
- Text truncation for long product names

### 4. File Structure Changes

```
components/
└── ProductCard.tsx # Main component file
```

### 5. Styling Details

- Card container: White background, rounded corners, subtle shadow
- Image container: Fixed aspect ratio, gray background placeholder
- Text styling: Product name in smaller font, price in larger bold font
- Hover state: Subtle shadow increase for visual feedback

## Code Standards to Follow

- Use TypeScript with proper type definitions
- Follow existing import patterns (using @/ alias)
- Use Tailwind utility classes for styling
- Ensure component is exportable for use in product listing pages

## Future Considerations

- Add loading skeleton state
- Support for sale/discount pricing
- Product badges (new, sale, out of stock)
- Add to cart button integration
- Wishlist functionality

## Testing Notes

- Component should render without errors
- All product properties should display correctly
- Click handler should work when provided
- Images should load with proper fallbacks
