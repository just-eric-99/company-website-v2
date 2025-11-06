# Software Vendor Company Website

A modern, professional website for a software vendor company specializing in AI solutions, web development, mobile development, backend development, and game development.

## Overview

This website showcases the company's expertise in cutting-edge technology solutions, with a particular emphasis on custom AI solutions including agentic AI, computer vision, NLP, and more.

## Features

### Design
- **Modern & Clean**: Inspired by leading tech companies with a focus on clarity and user experience
- **Responsive**: Fully responsive design that works seamlessly across all devices
- **Smooth Animations**: Engaging animations and transitions throughout the site
- **Accessibility**: Built with accessibility in mind

### Sections

1. **Hero Section**
   - Compelling headline highlighting AI-powered solutions
   - Clear call-to-action buttons
   - Statistics showcase
   - Animated floating cards

2. **Services Section**
   - Web Development
   - Mobile Development
   - Backend Development
   - Game Development

3. **AI Solutions Section** (Featured)
   - Agentic AI Systems
   - Computer Vision
   - Natural Language Processing
   - Predictive Analytics
   - Recommendation Systems
   - Custom AI Solutions

4. **Portfolio Section**
   - Showcase of featured projects
   - Interactive hover effects
   - Project categorization

5. **About Section**
   - Company strengths and values
   - Technology stack showcase
   - Why choose us

6. **Contact Section**
   - Contact information
   - Interactive contact form
   - Form validation

7. **Footer**
   - Quick links
   - Social media links
   - Company information

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for interactivity
- **Google Fonts**: Inter font family
- **SVG**: Custom icons and graphics

## File Structure

```
company-website-v2/
├── index.html          # Main HTML file
├── styles.css          # All CSS styling
├── script.js           # JavaScript functionality
└── README.md           # Documentation
```

## Customization Guide

### 1. Company Information

Update the following in `index.html`:

- **Company Name**: Replace "TechVenture" with your company name
  - Update in navigation logo
  - Update in footer
  - Update page title

- **Contact Information**:
  - Email: Line 480
  - Phone: Line 487
  - Location: Line 494

- **Statistics**: Update the hero stats (Lines 68-82)

### 2. Services

Modify service cards in the Services section (starting Line 95) to match your offerings.

### 3. Portfolio

Update portfolio items (starting Line 276) with your actual projects:
- Change project titles
- Update descriptions
- Modify tags
- Add project images (replace gradient backgrounds)

### 4. Colors

The color scheme can be customized in `styles.css`:

```css
:root {
    --primary-600: #6366f1;    /* Main brand color */
    --primary-700: #4f46e5;
    --secondary-500: #8b5cf6;  /* Accent color */
    /* ... */
}
```

### 5. Logo

Replace the SVG logo in the navigation and footer with your company logo.

## Running Locally

1. Clone the repository:
```bash
git clone <repository-url>
cd company-website-v2
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or use a local development server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

The website includes several performance optimizations:

- **Debounced scroll events**: Prevents excessive function calls
- **Intersection Observer**: Efficient element visibility detection
- **Lazy loading**: Images and animations load only when needed
- **Optimized animations**: Hardware-accelerated CSS transforms
- **Minimal dependencies**: Pure vanilla JavaScript, no frameworks

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels where appropriate
- Keyboard navigation support
- Sufficient color contrast
- Responsive font sizes
- Focus indicators

## Form Handling

The contact form currently uses client-side validation and logs data to the console. To make it functional:

1. Set up a backend endpoint (e.g., Node.js, PHP, Python)
2. Update the form submission handler in `script.js`
3. Implement server-side validation
4. Add email sending functionality (e.g., using SendGrid, Mailgun)

Example integration:

```javascript
// In script.js, replace the contactForm submit handler with:
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Thank you! We will get back to you soon.');
            contactForm.reset();
        }
    } catch (error) {
        alert('Something went wrong. Please try again.');
    }
});
```

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to Settings → Pages
3. Select main branch as source
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify

1. Connect your repository to Netlify
2. Build command: (none needed)
3. Publish directory: `/`
4. Deploy!

### Vercel

```bash
npm i -g vercel
vercel
```

## Future Enhancements

Potential improvements for the website:

- [ ] Add blog section
- [ ] Implement case study detail pages
- [ ] Add team member profiles
- [ ] Include client testimonials
- [ ] Add live chat widget
- [ ] Implement dark mode toggle
- [ ] Add multi-language support
- [ ] Include video backgrounds
- [ ] Add loading screen
- [ ] Integrate analytics (Google Analytics, etc.)

## License

Copyright © 2024 TechVenture. All rights reserved.

## Support

For questions or issues, please contact hello@yourcompany.com

---

Built with ❤️ using modern web technologies
