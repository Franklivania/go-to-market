# FormInput Component Documentation

A highly customizable and flexible form input component for React Native applications built with Expo. This component provides extensive styling options, input types, and interactive features.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props Reference](#props-reference)
- [Variants](#variants)
- [Sizes](#sizes)
- [Input Types](#input-types)
- [Border Positions](#border-positions)
- [Use Cases](#use-cases)
- [Advanced Examples](#advanced-examples)
- [Styling Guide](#styling-guide)
- [Best Practices](#best-practices)

## Installation

The FormInput component requires the following dependencies:

```bash
npm install @expo/vector-icons
```

## Basic Usage

```tsx
import FormInput from './components/form-input';

// Basic text input
<FormInput
  label="Username"
  placeholder="Enter your username"
  value={username}
  onChangeText={setUsername}
/>

// Password input with visibility toggle
<FormInput
  label="Password"
  type="password"
  placeholder="Enter your password"
  value={password}
  onChangeText={setPassword}
/>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text displayed above the input |
| `variant` | `'outline' \| 'plain' \| 'filled' \| 'underlined'` | `'outline'` | Visual style variant |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Border radius size |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Input size and font size |
| `type` | `FormInputType` | `'text'` | Input type and behavior |
| `color` | `string` | `'#4A5568'` | Border/outline/filled tint color |
| `backgroundColor` | `string` | - | Direct background color override |
| `textColor` | `string` | - | Text color override |
| `borderPosition` | `'all' \| 'top' \| 'right' \| 'bottom' \| 'left'` | `'all'` | Border position for outline variant |
| `error` | `string` | - | Error message displayed below input |
| `rightIcon` | `React.ReactNode` | - | Icon displayed on the right side |
| `leftIcon` | `React.ReactNode` | - | Icon displayed on the left side |

All standard `TextInputProps` are also supported.

## Variants

### Outline (Default)
Creates a bordered input with customizable border color and position.

```tsx
<FormInput
  label="Outline Input"
  variant="outline"
  color="#3B82F6"
  placeholder="This is an outline input"
/>
```

### Plain
Minimal styling with no borders or background.

```tsx
<FormInput
  label="Plain Input"
  variant="plain"
  placeholder="Clean, minimal input"
/>
```

### Filled
Background color with subtle tint based on the color prop.

```tsx
<FormInput
  label="Filled Input"
  variant="filled"
  color="#10B981"
  placeholder="Input with filled background"
/>
```

### Underlined
Bottom border only, perfect for material design patterns.

```tsx
<FormInput
  label="Underlined Input"
  variant="underlined"
  color="#EF4444"
  placeholder="Material design style"
/>
```

## Sizes

| Size | Font Size | Padding | Use Case |
|------|-----------|---------|----------|
| `xs` | 12px | 6px | Compact forms, mobile |
| `sm` | 14px | 8px | Small forms, secondary inputs |
| `md` | 16px | 10px | Standard forms (default) |
| `lg` | 18px | 12px | Large forms, accessibility |
| `xl` | 20px | 14px | Extra large, high visibility |

```tsx
<FormInput size="xs" placeholder="Extra small" />
<FormInput size="sm" placeholder="Small" />
<FormInput size="md" placeholder="Medium (default)" />
<FormInput size="lg" placeholder="Large" />
<FormInput size="xl" placeholder="Extra large" />
```

## Input Types

### Text Input
Standard text input for names, descriptions, etc.

```tsx
<FormInput
  label="Full Name"
  type="text"
  placeholder="Enter your full name"
/>
```

### Email Input
Optimized for email addresses with email keyboard.

```tsx
<FormInput
  label="Email Address"
  type="email"
  placeholder="user@example.com"
  keyboardType="email-address"
/>
```

### Password Input
Includes automatic visibility toggle functionality.

```tsx
<FormInput
  label="Password"
  type="password"
  placeholder="Enter your password"
/>
```

### Number Input
Numeric input with number keyboard.

```tsx
<FormInput
  label="Age"
  type="number"
  placeholder="Enter your age"
/>
```

### Phone Input
Phone number input with phone pad keyboard.

```tsx
<FormInput
  label="Phone Number"
  type="phone"
  placeholder="+1 (555) 123-4567"
/>
```

### URL Input
URL input with URL keyboard.

```tsx
<FormInput
  label="Website"
  type="url"
  placeholder="https://example.com"
/>
```

### Search Input
Search input with appropriate keyboard.

```tsx
<FormInput
  label="Search"
  type="search"
  placeholder="Search for something..."
/>
```

### Multiline Input
Multi-line text input for longer content.

```tsx
<FormInput
  label="Description"
  type="multiline"
  placeholder="Enter a detailed description..."
  numberOfLines={4}
/>
```

### Numeric Input
Alternative numeric input type.

```tsx
<FormInput
  label="Price"
  type="numeric"
  placeholder="0.00"
/>
```

## Border Positions

For outline variant, you can specify which borders to show:

```tsx
// All borders (default)
<FormInput variant="outline" borderPosition="all" />

// Top border only
<FormInput variant="outline" borderPosition="top" />

// Bottom border only
<FormInput variant="outline" borderPosition="bottom" />

// Left border only
<FormInput variant="outline" borderPosition="left" />

// Right border only
<FormInput variant="outline" borderPosition="right" />
```

## Use Cases

### 1. User Registration Form

```tsx
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  return (
    <View>
      <FormInput
        label="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData({...formData, firstName: text})}
        placeholder="Enter your first name"
      />
      
      <FormInput
        label="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData({...formData, lastName: text})}
        placeholder="Enter your last name"
      />
      
      <FormInput
        label="Email"
        type="email"
        value={formData.email}
        onChangeText={(text) => setFormData({...formData, email: text})}
        placeholder="Enter your email"
      />
      
      <FormInput
        label="Password"
        type="password"
        value={formData.password}
        onChangeText={(text) => setFormData({...formData, password: text})}
        placeholder="Create a password"
      />
      
      <FormInput
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
        placeholder="Confirm your password"
      />
    </View>
  );
};
```

### 2. Search Interface

```tsx
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <FormInput
      type="search"
      placeholder="Search products, brands, categories..."
      value={searchQuery}
      onChangeText={setSearchQuery}
      leftIcon={<Ionicons name="search" size={20} color="#6B7280" />}
      variant="outline"
      radius="full"
      size="md"
    />
  );
};
```

### 3. Contact Information Form

```tsx
const ContactForm = () => {
  return (
    <View>
      <FormInput
        label="Company Name"
        placeholder="Enter company name"
        variant="outline"
        size="lg"
      />
      
      <FormInput
        label="Contact Person"
        placeholder="Full name"
        variant="outline"
      />
      
      <FormInput
        label="Email"
        type="email"
        placeholder="contact@company.com"
        variant="outline"
      />
      
      <FormInput
        label="Phone"
        type="phone"
        placeholder="+1 (555) 123-4567"
        variant="outline"
      />
      
      <FormInput
        label="Website"
        type="url"
        placeholder="https://company.com"
        variant="outline"
      />
      
      <FormInput
        label="Message"
        type="multiline"
        placeholder="Tell us about your project..."
        numberOfLines={5}
        variant="outline"
      />
    </View>
  );
};
```

### 4. Settings Form with Icons

```tsx
const SettingsForm = () => {
  return (
    <View>
      <FormInput
        label="Display Name"
        placeholder="Your display name"
        leftIcon={<Ionicons name="person" size={20} color="#6B7280" />}
        variant="outline"
      />
      
      <FormInput
        label="Email Notifications"
        placeholder="notification@example.com"
        leftIcon={<Ionicons name="mail" size={20} color="#6B7280" />}
        rightIcon={<Ionicons name="checkmark-circle" size={20} color="#10B981" />}
        type="email"
        variant="filled"
        color="#3B82F6"
      />
      
      <FormInput
        label="API Key"
        type="password"
        placeholder="Enter your API key"
        leftIcon={<Ionicons name="key" size={20} color="#6B7280" />}
        variant="underlined"
        color="#8B5CF6"
      />
    </View>
  );
};
```

### 5. Error Handling

```tsx
const FormWithValidation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <View>
      <FormInput
        label="Email"
        type="email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
        variant="outline"
        color={errors.email ? '#EF4444' : '#4A5568'}
      />
      
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
        variant="outline"
        color={errors.password ? '#EF4444' : '#4A5568'}
      />
    </View>
  );
};
```

## Advanced Examples

### Custom Styling

```tsx
// Custom colors and styling
<FormInput
  label="Custom Styled Input"
  variant="filled"
  color="#8B5CF6"
  backgroundColor="#F3F4F6"
  textColor="#1F2937"
  radius="lg"
  size="lg"
  placeholder="Custom styled input"
/>
```

### Dynamic Border Colors

```tsx
const DynamicInput = ({ isValid, value, onChangeText }) => {
  const borderColor = isValid ? '#10B981' : '#EF4444';
  
  return (
    <FormInput
      label="Dynamic Input"
      value={value}
      onChangeText={onChangeText}
      color={borderColor}
      variant="outline"
      rightIcon={
        isValid ? 
          <Ionicons name="checkmark-circle" size={20} color="#10B981" /> :
          <Ionicons name="close-circle" size={20} color="#EF4444" />
      }
    />
  );
};
```

### Multi-step Form

```tsx
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <FormInput
              label="Personal Information"
              placeholder="Full name"
              variant="outline"
              size="lg"
            />
            <FormInput
              label="Email"
              type="email"
              placeholder="your@email.com"
              variant="outline"
            />
          </View>
        );
      
      case 2:
        return (
          <View>
            <FormInput
              label="Company Details"
              placeholder="Company name"
              variant="filled"
              color="#3B82F6"
            />
            <FormInput
              label="Website"
              type="url"
              placeholder="https://company.com"
              variant="filled"
              color="#3B82F6"
            />
          </View>
        );
      
      default:
        return null;
    }
  };

  return renderStep();
};
```

## Styling Guide

### Color Schemes

```tsx
// Primary theme
<FormInput color="#3B82F6" variant="outline" />

// Success theme
<FormInput color="#10B981" variant="filled" />

// Warning theme
<FormInput color="#F59E0B" variant="outline" />

// Error theme
<FormInput color="#EF4444" variant="underlined" />

// Purple theme
<FormInput color="#8B5CF6" variant="filled" />
```

### Size Combinations

```tsx
// Compact form
<FormInput size="xs" radius="sm" variant="outline" />

// Standard form
<FormInput size="md" radius="md" variant="outline" />

// Large accessibility form
<FormInput size="xl" radius="lg" variant="filled" />
```

## Best Practices

### 1. Consistent Sizing
Use consistent sizes throughout your application:
- `xs` for compact interfaces
- `md` for standard forms
- `lg` for accessibility-focused interfaces

### 2. Color Consistency
Establish a color palette and use it consistently:
```tsx
const colors = {
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  neutral: '#6B7280'
};
```

### 3. Error Handling
Always provide clear error messages:
```tsx
<FormInput
  error={errors.email}
  color={errors.email ? colors.error : colors.neutral}
/>
```

### 4. Accessibility
Use appropriate sizes and labels:
```tsx
<FormInput
  label="Email Address" // Clear, descriptive labels
  size="lg" // Larger size for better accessibility
  placeholder="Enter your email address" // Helpful placeholder
/>
```

### 5. Icon Usage
Use icons consistently and meaningfully:
```tsx
<FormInput
  leftIcon={<Ionicons name="mail" size={20} color="#6B7280" />}
  rightIcon={<Ionicons name="checkmark" size={20} color="#10B981" />}
/>
```

### 6. Form Validation
Implement proper validation patterns:
```tsx
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

## TypeScript Support

The component is fully typed with TypeScript. All props extend `TextInputProps` and include custom typing for variants, sizes, and types.

```tsx
interface FormInputProps extends TextInputProps {
  label?: string;
  variant?: FormInputVariant;
  radius?: FormInputRadius;
  size?: FormInputSize;
  type?: FormInputType;
  color?: string;
  backgroundColor?: string;
  textColor?: string;
  borderPosition?: BorderPosition;
  error?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}
```

## Performance Considerations

- The component uses `useState` for password visibility toggle
- Icons are rendered conditionally to avoid unnecessary renders
- Style objects are created inline for dynamic styling
- Consider memoization for complex forms with many inputs

## Browser Compatibility

This component is designed for React Native and works with:
- iOS (via Expo)
- Android (via Expo)
- Web (via Expo Web)

---

For more examples and advanced usage patterns, refer to the component source code and test files.
