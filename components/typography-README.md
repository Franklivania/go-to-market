# Typography Component Documentation

A comprehensive typography component for React Native applications built with Expo. This component provides consistent text styling across your application with theme support, multiple variants, and extensive customization options using the Karla font family.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props Reference](#props-reference)
- [Typography Variants](#typography-variants)
- [Theme Integration](#theme-integration)
- [Use Cases](#use-cases)
- [Advanced Examples](#advanced-examples)
- [Styling Guide](#styling-guide)
- [Best Practices](#best-practices)

## Installation

The Typography component requires the following dependencies:

```bash
npm install @react-native-async-storage/async-storage
```

Make sure you have the Karla font files in your `assets/fonts/` directory:
- `Karla-Font.ttf`
- `Karla-Italic.ttf`

## Basic Usage

```tsx
import Typography from './components/typography';

// Basic text
<Typography variant="body">
  This is a basic text element
</Typography>

// Heading
<Typography variant="h1">
  Main Heading
</Typography>

// Custom styling
<Typography 
  variant="body" 
  color="#FF0000" 
  fontWeight="bold"
>
  Custom styled text
</Typography>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `TypographyVariant` | `'body'` | Predefined text style variant |
| `color` | `string` | - | Override text color |
| `fontWeight` | `TextStyle["fontWeight"]` | - | Override font weight |
| `fontFamily` | `string` | - | Override font family |
| `italic` | `boolean` | `false` | Apply italic styling |
| `style` | `StyleProp<TextStyle>` | - | Additional custom styles |
| `children` | `React.ReactNode` | - | Text content (required) |
| `numberOfLines` | `number` | - | Limit number of lines |
| `ellipsizeMode` | `TextProps["ellipsizeMode"]` | - | Text truncation behavior |

All standard `TextProps` are also supported.

## Typography Variants

### Headings (h1-h6)

#### H1 - Main Heading
```tsx
<Typography variant="h1">
  Main Page Title
</Typography>
```
- **Font Size:** 32px
- **Font Weight:** 700 (Bold)
- **Line Height:** 40px
- **Use Case:** Page titles, hero headings

#### H2 - Section Heading
```tsx
<Typography variant="h2">
  Section Title
</Typography>
```
- **Font Size:** 28px
- **Font Weight:** 700 (Bold)
- **Line Height:** 36px
- **Use Case:** Major section headings

#### H3 - Subsection Heading
```tsx
<Typography variant="h3">
  Subsection Title
</Typography>
```
- **Font Size:** 24px
- **Font Weight:** 700 (Bold)
- **Line Height:** 32px
- **Use Case:** Subsection headings

#### H4 - Component Heading
```tsx
<Typography variant="h4">
  Component Title
</Typography>
```
- **Font Size:** 20px
- **Font Weight:** 600 (Semi-bold)
- **Line Height:** 28px
- **Use Case:** Component titles, card headers

#### H5 - Small Heading
```tsx
<Typography variant="h5">
  Small Title
</Typography>
```
- **Font Size:** 18px
- **Font Weight:** 600 (Semi-bold)
- **Line Height:** 24px
- **Use Case:** Small headings, list headers

#### H6 - Micro Heading
```tsx
<Typography variant="h6">
  Micro Title
</Typography>
```
- **Font Size:** 16px
- **Font Weight:** 600 (Semi-bold)
- **Line Height:** 22px
- **Use Case:** Micro headings, inline titles

### Body Text

#### Body - Primary Text
```tsx
<Typography variant="body">
  This is the main body text for paragraphs and content.
</Typography>
```
- **Font Size:** 16px
- **Font Weight:** 400 (Regular)
- **Line Height:** 22px
- **Use Case:** Main content, paragraphs

#### Body2 - Secondary Text
```tsx
<Typography variant="body2">
  This is secondary body text, slightly smaller.
</Typography>
```
- **Font Size:** 14px
- **Font Weight:** 400 (Regular)
- **Line Height:** 20px
- **Use Case:** Secondary content, descriptions

### Specialized Text

#### Subtitle
```tsx
<Typography variant="subtitle">
  This is subtitle text
</Typography>
```
- **Font Size:** 15px
- **Font Weight:** 500 (Medium)
- **Line Height:** 20px
- **Use Case:** Subtitles, secondary headings

#### Caption
```tsx
<Typography variant="caption">
  Small caption text
</Typography>
```
- **Font Size:** 12px
- **Font Weight:** 400 (Regular)
- **Line Height:** 16px
- **Use Case:** Captions, fine print, metadata

#### Overline
```tsx
<Typography variant="overline">
  OVERLINE TEXT
</Typography>
```
- **Font Size:** 10px
- **Font Weight:** 500 (Medium)
- **Line Height:** 14px
- **Letter Spacing:** 1.5px
- **Text Transform:** Uppercase
- **Use Case:** Labels, categories, tags

#### Button
```tsx
<Typography variant="button">
  Button Text
</Typography>
```
- **Font Size:** 15px
- **Font Weight:** 600 (Semi-bold)
- **Line Height:** 20px
- **Use Case:** Button text, call-to-action text

## Theme Integration

The Typography component automatically integrates with your app's theme system:

```tsx
// Theme-aware colors
<Typography variant="h1">
  This text uses theme colors
</Typography>

// Custom color override
<Typography variant="body" color="#FF0000">
  This text uses custom color
</Typography>
```

### Theme Color Mapping

- **Primary Text:** `theme.colors.textPrimary`
- **Secondary Text:** `theme.colors.textSecondary`
- **Button Text:** `theme.colors.buttonText` (falls back to `textPrimary`)

## Use Cases

### 1. Article/Content Layout

```tsx
const ArticleContent = ({ article }) => {
  return (
    <View style={{ padding: 16 }}>
      <Typography variant="h1" style={{ marginBottom: 16 }}>
        {article.title}
      </Typography>
      
      <Typography variant="subtitle" style={{ marginBottom: 8 }}>
        {article.subtitle}
      </Typography>
      
      <Typography variant="caption" style={{ marginBottom: 24 }}>
        Published on {article.date} by {article.author}
      </Typography>
      
      <Typography variant="body" style={{ marginBottom: 16 }}>
        {article.excerpt}
      </Typography>
      
      <Typography variant="body">
        {article.content}
      </Typography>
    </View>
  );
};
```

### 2. Card Components

```tsx
const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <Typography variant="h4" style={{ marginBottom: 8 }}>
        {product.name}
      </Typography>
      
      <Typography variant="body2" style={{ marginBottom: 12 }}>
        {product.description}
      </Typography>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" color="#10B981">
          ${product.price}
        </Typography>
        
        <Typography variant="caption">
          {product.category}
        </Typography>
      </View>
    </View>
  );
};
```

### 3. Form Labels and Help Text

```tsx
const FormField = ({ label, helpText, error, children }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Typography variant="body" fontWeight="600" style={{ marginBottom: 4 }}>
        {label}
      </Typography>
      
      {children}
      
      {helpText && (
        <Typography variant="caption" style={{ marginTop: 4 }}>
          {helpText}
        </Typography>
      )}
      
      {error && (
        <Typography variant="caption" color="#EF4444" style={{ marginTop: 4 }}>
          {error}
        </Typography>
      )}
    </View>
  );
};
```

### 4. Navigation and Menu Items

```tsx
const NavigationMenu = ({ items }) => {
  return (
    <View>
      <Typography variant="h6" style={{ marginBottom: 16 }}>
        Navigation
      </Typography>
      
      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <Typography variant="body" style={{ marginBottom: 8 }}>
            {item.title}
          </Typography>
          
          {item.description && (
            <Typography variant="caption">
              {item.description}
            </Typography>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
```

### 5. Status and Notification Messages

```tsx
const StatusMessage = ({ type, message }) => {
  const getStatusColor = () => {
    switch (type) {
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      default: return undefined;
    }
  };

  return (
    <View style={styles.statusContainer}>
      <Typography variant="body" color={getStatusColor()}>
        {message}
      </Typography>
    </View>
  );
};
```

### 6. User Profile Information

```tsx
const UserProfile = ({ user }) => {
  return (
    <View style={styles.profileContainer}>
      <Typography variant="h3" style={{ marginBottom: 8 }}>
        {user.name}
      </Typography>
      
      <Typography variant="subtitle" style={{ marginBottom: 4 }}>
        {user.title}
      </Typography>
      
      <Typography variant="body2" style={{ marginBottom: 16 }}>
        {user.bio}
      </Typography>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Typography variant="h5">{user.followers}</Typography>
          <Typography variant="caption">Followers</Typography>
        </View>
        
        <View style={styles.statItem}>
          <Typography variant="h5">{user.following}</Typography>
          <Typography variant="caption">Following</Typography>
        </View>
        
        <View style={styles.statItem}>
          <Typography variant="h5">{user.posts}</Typography>
          <Typography variant="caption">Posts</Typography>
        </View>
      </View>
    </View>
  );
};
```

## Advanced Examples

### Custom Typography Combinations

```tsx
const CustomTextBlock = () => {
  return (
    <View>
      {/* Hero section */}
      <Typography variant="h1" style={{ textAlign: 'center', marginBottom: 16 }}>
        Welcome to Our App
      </Typography>
      
      <Typography variant="subtitle" style={{ textAlign: 'center', marginBottom: 32 }}>
        Discover amazing features and connect with others
      </Typography>
      
      {/* Feature list */}
      <Typography variant="h4" style={{ marginBottom: 12 }}>
        Key Features
      </Typography>
      
      {features.map((feature, index) => (
        <View key={index} style={{ flexDirection: 'row', marginBottom: 8 }}>
          <Typography variant="body" style={{ marginRight: 8 }}>
            •
          </Typography>
          <Typography variant="body">
            {feature.description}
          </Typography>
        </View>
      ))}
    </View>
  );
};
```

### Responsive Typography

```tsx
const ResponsiveText = ({ content }) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  
  const getResponsiveVariant = () => {
    if (screenWidth < 768) return 'h4';
    if (screenWidth < 1024) return 'h3';
    return 'h2';
  };

  return (
    <Typography variant={getResponsiveVariant()}>
      {content}
    </Typography>
  );
};
```

### Text with Truncation

```tsx
const TruncatedText = ({ text, maxLines = 2 }) => {
  return (
    <Typography 
      variant="body" 
      numberOfLines={maxLines}
      ellipsizeMode="tail"
    >
      {text}
    </Typography>
  );
};
```

### Animated Typography

```tsx
const AnimatedTypography = ({ children, variant = "body" }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Typography variant={variant}>
        {children}
      </Typography>
    </Animated.View>
  );
};
```

## Styling Guide

### Font Weight Overrides

```tsx
// Light text
<Typography variant="body" fontWeight="300">
  Light weight text
</Typography>

// Bold text
<Typography variant="body" fontWeight="700">
  Bold text
</Typography>

// Custom weight
<Typography variant="body" fontWeight="500">
  Medium weight text
</Typography>
```

### Color Customization

```tsx
// Theme colors (automatic)
<Typography variant="body">
  Uses theme colors
</Typography>

// Custom colors
<Typography variant="body" color="#FF6B6B">
  Custom red color
</Typography>

// Brand colors
<Typography variant="h1" color="#3B82F6">
  Brand blue heading
</Typography>
```

### Italic Styling

```tsx
// Automatic italic font
<Typography variant="body" italic>
  This uses Karla-Italic font
</Typography>

// Custom italic with font override
<Typography variant="body" italic fontFamily="CustomItalic">
  Custom italic font
</Typography>
```

### Text Alignment and Spacing

```tsx
const StyledTextBlock = () => {
  return (
    <View>
      <Typography 
        variant="h2" 
        style={{ 
          textAlign: 'center', 
          marginBottom: 24,
          paddingHorizontal: 16 
        }}
      >
        Centered Heading
      </Typography>
      
      <Typography 
        variant="body" 
        style={{ 
          textAlign: 'justify',
          lineHeight: 24,
          marginBottom: 16 
        }}
      >
        Justified text with custom line height and spacing.
      </Typography>
    </View>
  );
};
```

## Best Practices

### 1. Consistent Variant Usage

```tsx
// Good - Use semantic variants
<Typography variant="h1">Page Title</Typography>
<Typography variant="body">Main content</Typography>
<Typography variant="caption">Metadata</Typography>

// Avoid - Don't use variants for styling only
<Typography variant="h1" style={{ fontSize: 12 }}>
  Small text using large variant
</Typography>
```

### 2. Proper Text Hierarchy

```tsx
const ArticleLayout = () => {
  return (
    <View>
      <Typography variant="h1">Article Title</Typography>
      <Typography variant="subtitle">Article Subtitle</Typography>
      <Typography variant="caption">Publication Date</Typography>
      
      <Typography variant="h3">Section Heading</Typography>
      <Typography variant="body">Section content...</Typography>
      
      <Typography variant="h4">Subsection</Typography>
      <Typography variant="body2">Subsection content...</Typography>
    </View>
  );
};
```

### 3. Accessibility Considerations

```tsx
// Good - Proper contrast and sizing
<Typography variant="body" color="#000000">
  High contrast text
</Typography>

// Good - Sufficient text size
<Typography variant="body">
  Readable text size
</Typography>

// Avoid - Low contrast
<Typography variant="body" color="#CCCCCC">
  Low contrast text
</Typography>
```

### 4. Performance Optimization

```tsx
// Good - Memoize expensive text components
const MemoizedText = React.memo(({ content }) => (
  <Typography variant="body">
    {content}
  </Typography>
));

// Good - Use numberOfLines for long text
<Typography variant="body" numberOfLines={3}>
  Long text content...
</Typography>
```

### 5. Theme Integration

```tsx
// Good - Let theme handle colors
<Typography variant="body">
  Theme-aware text
</Typography>

// Good - Override only when necessary
<Typography variant="body" color="#EF4444">
  Error message
</Typography>
```

## TypeScript Support

The component is fully typed with TypeScript:

```tsx
interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  fontFamily?: string;
  italic?: boolean;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numberOfLines?: number;
  ellipsizeMode?: TextProps["ellipsizeMode"];
}

type TypographyVariant =
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  | "subtitle" | "body" | "body2" | "caption" 
  | "overline" | "button";
```

## Performance Considerations

- The component uses theme context for dynamic styling
- Font family switching is optimized for Karla fonts
- Consider memoization for text components in lists
- Use `numberOfLines` for performance with long text

## Browser Compatibility

This component is designed for React Native and works with:
- iOS (via Expo)
- Android (via Expo)
- Web (via Expo Web)

## Common Patterns

### Text with Icons
```tsx
const TextWithIcon = ({ icon, text, variant = "body" }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {icon}
    <Typography variant={variant} style={{ marginLeft: 8 }}>
      {text}
    </Typography>
  </View>
);
```

### Conditional Styling
```tsx
const ConditionalText = ({ isActive, text }) => (
  <Typography 
    variant="body" 
    color={isActive ? '#10B981' : '#6B7280'}
    fontWeight={isActive ? '600' : '400'}
  >
    {text}
  </Typography>
);
```

### Text Lists
```tsx
const TextList = ({ items, variant = "body" }) => (
  <View>
    {items.map((item, index) => (
      <Typography key={index} variant={variant} style={{ marginBottom: 4 }}>
        • {item}
      </Typography>
    ))}
  </View>
);
```

---

For more examples and advanced usage patterns, refer to the component source code and test files.
