# Hero Image Setup

## Adding the Hero Background Image

To add your hero background image to the website:

1. **Place your image file** in this `public` folder
2. **Name it** `hero.jpg` (or update the path in the code)
3. **Recommended specifications:**
   - **Format**: JPG, PNG, or WebP
   - **Dimensions**: 1920x1080 or higher
   - **Aspect Ratio**: 16:9 or 4:3
   - **File Size**: Under 2MB for optimal loading
   - **Content**: Family-related, traditional, or heritage-themed image

## Image Placement

The image will appear on the **left side** of the hero section with:
- 40% opacity overlay
- Gradient overlay for text readability
- Responsive design that works on all devices

## Alternative Image Paths

If you want to use a different filename or path, update this line in `src/pages/Home.jsx`:

```javascript
backgroundImage: `url('/your-image-name.jpg')`,
```

## Fallback Design

If no image is provided, the hero section will display:
- Beautiful gradient background
- Decorative circular elements
- Orange accent colors
- Professional appearance

The design looks great with or without the image!