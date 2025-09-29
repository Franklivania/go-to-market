# Button Component Documentation

A highly customizable and flexible button component for React Native applications built with Expo. This component provides extensive styling options, loading states, and interactive features using styled-components.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props Reference](#props-reference)
- [Variants](#variants)
- [Sizes](#sizes)
- [Border Radius Types](#border-radius-types)
- [Width Options](#width-options)
- [Use Cases](#use-cases)
- [Advanced Examples](#advanced-examples)
- [Styling Guide](#styling-guide)
- [Best Practices](#best-practices)

## Installation

The Button component requires the following dependencies:

```bash
npm install styled-components
```

## Basic Usage

```tsx
import Button from './components/button';

// Basic button
<Button
  label="Click Me"
  onPress={() => console.log('Button pressed')}
/>

// Button with loading state
<Button
  label="Submit"
  onPress={handleSubmit}
  loading={isSubmitting}
/>

// Disabled button
<Button
  label="Disabled"
  onPress={() => {}}
  disabled={true}
/>

// Button with custom styling
<Button
  label="Custom Style"
  onPress={() => {}}
  style={{ marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}
/>

// Button with accessibility props
<Button
  label="Accessible Button"
  onPress={() => {}}
  accessibilityLabel="Submit form"
  accessibilityHint="Double tap to submit the form"
  testID="submit-button"
/>

// Button with custom children (icon + text)
<Button onPress={() => {}}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons name="add" size={20} color="white" />
    <Text style={{ color: 'white', marginLeft: 8 }}>Add Item</Text>
  </View>
</Button>

// Button with only icon
<Button onPress={() => {}}>
  <Ionicons name="heart" size={24} color="#EF4444" />
</Button>
```

## Props Reference

| Prop                 | Type                                                           | Default     | Description                                                  |
| -------------------- | -------------------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `label`              | `string`                                                       | -           | Text displayed on the button (optional if children provided) |
| `children`           | `React.ReactNode`                                              | -           | Custom content for the button (optional if label provided)   |
| `onPress`            | `(event: GestureResponderEvent) => void`                       | -           | Function called when button is pressed (required)            |
| `loading`            | `boolean`                                                      | `false`     | Shows loading spinner instead of text                        |
| `disabled`           | `boolean`                                                      | `false`     | Disables button interaction                                  |
| `variant`            | `'primary' \| 'secondary' \| 'accent' \| 'outline' \| 'plain'` | `'primary'` | Visual style variant                                         |
| `width`              | `'full' \| 'fit'`                                              | `'fit'`     | Button width behavior                                        |
| `borderRadius`       | `'flat' \| 'curved' \| 'rounded'`                              | `'curved'`  | Border radius style                                          |
| `size`               | `'sm' \| 'md' \| 'base' \| 'lg' \| 'xl' \| 'icon'`             | `'base'`    | Button size and font size                                    |
| `style`              | `StyleProp<ViewStyle>`                                         | -           | Additional custom styles                                     |
| `activeOpacity`      | `number`                                                       | `0.8`       | Opacity when pressed                                         |
| `testID`             | `string`                                                       | -           | Test identifier for testing                                  |
| `accessibilityLabel` | `string`                                                       | -           | Accessibility label                                          |
| `accessibilityHint`  | `string`                                                       | -           | Accessibility hint                                           |

**Note:** Either `label` or `children` must be provided. All standard `TouchableOpacityProps` are supported except `onPress` (which is overridden for type safety).

## Variants

### Primary (Default)

Orange background with white text - main action buttons.

```tsx
<Button label="Primary Button" variant="primary" onPress={() => console.log("Primary clicked")} />
```

### Secondary

Same styling as primary - alternative primary action.

```tsx
<Button
  label="Secondary Button"
  variant="secondary"
  onPress={() => console.log("Secondary clicked")}
/>
```

### Accent

Yellow background with black text - highlight important actions.

```tsx
<Button label="Accent Button" variant="accent" onPress={() => console.log("Accent clicked")} />
```

### Outline

Transparent background with orange border and text - secondary actions.

```tsx
<Button label="Outline Button" variant="outline" onPress={() => console.log("Outline clicked")} />
```

### Plain

Transparent background with orange text only - minimal text buttons that fit content exactly.

```tsx
<Button label="Plain Button" variant="plain" onPress={() => console.log("Plain clicked")} />
```

## Sizes

| Size   | Padding Vertical | Padding Horizontal | Font Size | Use Case                           |
| ------ | ---------------- | ------------------ | --------- | ---------------------------------- |
| `sm`   | 6px              | 14px               | 12px      | Compact interfaces, mobile         |
| `md`   | 8px              | 18px               | 14px      | Small forms, secondary actions     |
| `base` | 9px              | 25px               | 15px      | Standard buttons (default)         |
| `lg`   | 12px             | 32px               | 17px      | Large forms, primary actions       |
| `xl`   | 16px             | 40px               | 20px      | Hero buttons, call-to-action       |
| `icon` | 8px              | 8px                | 16px      | Icon-only buttons, compact actions |

**Note:** The `plain` variant has no padding (0px) and fits content exactly.

```tsx
<Button size="sm" label="Small" onPress={() => {}} />
<Button size="md" label="Medium" onPress={() => {}} />
<Button size="base" label="Base (default)" onPress={() => {}} />
<Button size="lg" label="Large" onPress={() => {}} />
<Button size="xl" label="Extra Large" onPress={() => {}} />
<Button size="icon" onPress={() => {}}>
  <Ionicons name="heart" size={20} color="#EF4444" />
</Button>
```

## Border Radius Types

### Flat

No border radius - sharp corners.

```tsx
<Button label="Flat Button" borderRadius="flat" onPress={() => {}} />
```

### Curved (Default)

Small border radius - subtle rounded corners.

```tsx
<Button label="Curved Button" borderRadius="curved" onPress={() => {}} />
```

### Rounded

Large border radius - pill-shaped buttons.

```tsx
<Button label="Rounded Button" borderRadius="rounded" onPress={() => {}} />
```

## Width Options

### Fit (Default)

Button width adjusts to content.

```tsx
<Button label="Fit Width" width="fit" onPress={() => {}} />
```

### Full

Button takes full width of container.

```tsx
<Button label="Full Width" width="full" onPress={() => {}} />
```

## Use Cases

### 1. Authentication Forms

```tsx
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await loginUser();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {/* Login form inputs */}

      <Button
        label="Sign In"
        variant="primary"
        size="lg"
        width="full"
        borderRadius="curved"
        onPress={handleLogin}
        loading={isLoading}
        disabled={isDisabled}
      />

      <Button
        label="Forgot Password?"
        variant="outline"
        size="md"
        width="fit"
        borderRadius="flat"
        onPress={() => navigateToForgotPassword()}
      />
    </View>
  );
};
```

### 2. E-commerce Product Actions

```tsx
const ProductCard = ({ product }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(product.id);
      setIsInCart(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <View>
      {/* Product details */}

      <View style={{ flexDirection: "row", gap: 12 }}>
        <Button
          label={isInCart ? "In Cart" : "Add to Cart"}
          variant={isInCart ? "accent" : "primary"}
          size="lg"
          width="fit"
          borderRadius="rounded"
          onPress={handleAddToCart}
          loading={isAddingToCart}
          disabled={isInCart}
        />

        <Button
          label="Buy Now"
          variant="outline"
          size="lg"
          width="fit"
          borderRadius="rounded"
          onPress={() => navigateToCheckout(product.id)}
        />
      </View>
    </View>
  );
};
```

### 3. Settings and Actions

```tsx
const SettingsScreen = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await saveUserSettings();
      showSuccessMessage("Settings saved successfully");
    } catch (error) {
      showErrorMessage("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View>
      {/* Settings form */}

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          label="Cancel"
          variant="outline"
          size="md"
          width="fit"
          borderRadius="curved"
          onPress={() => navigateBack()}
        />

        <Button
          label="Save Changes"
          variant="primary"
          size="md"
          width="fit"
          borderRadius="curved"
          onPress={handleSaveSettings}
          loading={isSaving}
        />
      </View>
    </View>
  );
};
```

### 4. Onboarding Flow

```tsx
const OnboardingStep = ({ step, totalSteps, onNext, onPrevious, onSkip }) => {
  return (
    <View>
      {/* Onboarding content */}

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          label="Skip"
          variant="outline"
          size="sm"
          width="fit"
          borderRadius="flat"
          onPress={onSkip}
        />

        <View style={{ flexDirection: "row", gap: 8 }}>
          {step > 1 && (
            <Button
              label="Back"
              variant="outline"
              size="md"
              width="fit"
              borderRadius="curved"
              onPress={onPrevious}
            />
          )}

          <Button
            label={step === totalSteps ? "Get Started" : "Next"}
            variant="primary"
            size="md"
            width="fit"
            borderRadius="curved"
            onPress={onNext}
          />
        </View>
      </View>
    </View>
  );
};
```

### 5. Confirmation Dialogs

```tsx
const ConfirmationDialog = ({ onConfirm, onCancel, isDeleting }) => {
  return (
    <View style={styles.dialogContainer}>
      <Text style={styles.dialogTitle}>Confirm Action</Text>
      <Text style={styles.dialogMessage}>
        Are you sure you want to delete this item? This action cannot be undone.
      </Text>

      <View style={styles.dialogButtons}>
        <Button
          label="Cancel"
          variant="outline"
          size="md"
          width="fit"
          borderRadius="curved"
          onPress={onCancel}
        />

        <Button
          label="Delete"
          variant="primary"
          size="md"
          width="fit"
          borderRadius="curved"
          onPress={onConfirm}
          loading={isDeleting}
        />
      </View>
    </View>
  );
};
```

### 6. Social Media Actions

```tsx
const SocialActions = ({ postId, isLiked, isBookmarked }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Button
        label={isLiked ? "Liked" : "Like"}
        variant={isLiked ? "accent" : "outline"}
        size="sm"
        width="fit"
        borderRadius="rounded"
        onPress={async () => {
          setIsLiking(true);
          await toggleLike(postId);
          setIsLiking(false);
        }}
        loading={isLiking}
      />

      <Button
        label={isBookmarked ? "Saved" : "Save"}
        variant={isBookmarked ? "accent" : "outline"}
        size="sm"
        width="fit"
        borderRadius="rounded"
        onPress={async () => {
          setIsBookmarking(true);
          await toggleBookmark(postId);
          setIsBookmarking(false);
        }}
        loading={isBookmarking}
      />

      <Button
        label="Share"
        variant="outline"
        size="sm"
        width="fit"
        borderRadius="rounded"
        onPress={() => sharePost(postId)}
      />
    </View>
  );
};
```

### 7. Text Links and Minimal Actions

```tsx
const TextActions = () => {
  return (
    <View>
      {/* Plain variant for text-like buttons */}
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <Button label="Terms of Service" variant="plain" size="sm" onPress={() => openTerms()} />

        <Button label="Privacy Policy" variant="plain" size="sm" onPress={() => openPrivacy()} />

        <Button label="Contact Support" variant="plain" size="sm" onPress={() => openSupport()} />
      </View>

      {/* Inline text actions */}
      <Text style={{ fontSize: 14, color: "#666" }}>
        By continuing, you agree to our{" "}
        <Button label="Terms of Service" variant="plain" size="sm" onPress={() => openTerms()} />{" "}
        and{" "}
        <Button label="Privacy Policy" variant="plain" size="sm" onPress={() => openPrivacy()} />.
      </Text>
    </View>
  );
};
```

### 8. Action Buttons with Icons

```tsx
const ActionButtons = () => {
  return (
    <View style={{ flexDirection: "row", gap: 12 }}>
      {/* Share button with icon */}
      <Button onPress={() => shareContent()} variant="outline">
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="share" size={20} color="#3B82F6" />
          <Text style={{ color: "#3B82F6", marginLeft: 6 }}>Share</Text>
        </View>
      </Button>

      {/* Like button with icon */}
      <Button onPress={() => toggleLike()} variant="outline">
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={20}
            color={isLiked ? "#EF4444" : "#6B7280"}
          />
          <Text style={{ color: "#6B7280", marginLeft: 6 }}>{isLiked ? "Liked" : "Like"}</Text>
        </View>
      </Button>

      {/* Download button with icon */}
      <Button onPress={() => downloadFile()} variant="primary">
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="download" size={20} color="white" />
          <Text style={{ color: "white", marginLeft: 6 }}>Download</Text>
        </View>
      </Button>
    </View>
  );
};
```

### 9. Icon-Only Buttons

```tsx
const IconOnlyButtons = () => {
  return (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
      {/* Compact icon buttons */}
      <Button size="icon" onPress={() => toggleFavorite()} variant="outline">
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={18}
          color={isFavorite ? "#EF4444" : "#6B7280"}
        />
      </Button>

      <Button size="icon" onPress={() => shareContent()} variant="outline">
        <Ionicons name="share" size={18} color="#6B7280" />
      </Button>

      <Button size="icon" onPress={() => openSettings()} variant="outline">
        <Ionicons name="settings" size={18} color="#6B7280" />
      </Button>

      {/* Primary action icon */}
      <Button size="icon" onPress={() => addItem()} variant="primary">
        <Ionicons name="add" size={20} color="white" />
      </Button>

      {/* Accent icon button */}
      <Button size="icon" onPress={() => starItem()} variant="accent">
        <Ionicons name={isStarred ? "star" : "star-outline"} size={18} color="#1F2937" />
      </Button>
    </View>
  );
};
```

## Children and Custom Content

### Icon Buttons

```tsx
// Icon-only button with icon size
<Button size="icon" onPress={() => {}}>
  <Ionicons name="heart" size={20} color="#EF4444" />
</Button>

// Icon-only button with custom size
<Button onPress={() => {}}>
  <Ionicons name="heart" size={24} color="#EF4444" />
</Button>

// Icon with text
<Button onPress={() => {}}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons name="add" size={20} color="white" />
    <Text style={{ color: 'white', marginLeft: 8 }}>Add Item</Text>
  </View>
</Button>

// Icon on the right
<Button onPress={() => {}}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={{ color: 'white', marginRight: 8 }}>Next</Text>
    <Ionicons name="arrow-forward" size={20} color="white" />
  </View>
</Button>

// Compact icon button
<Button size="icon" variant="outline" onPress={() => {}}>
  <Ionicons name="settings" size={18} color="#6B7280" />
</Button>
```

### Custom Styled Content

```tsx
// Custom text styling
<Button onPress={() => {}}>
  <Text style={{
    color: '#3B82F6',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }}>
    Custom Text
  </Text>
</Button>

// Multiple elements
<Button onPress={() => {}}>
  <View style={{ alignItems: 'center' }}>
    <Ionicons name="download" size={24} color="white" />
    <Text style={{ color: 'white', fontSize: 12, marginTop: 4 }}>
      Download
    </Text>
  </View>
</Button>
```

### Loading States with Children

```tsx
// Custom loading content
<Button onPress={() => {}} loading={isLoading}>
  {isLoading ? (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <ActivityIndicator size="small" color="white" />
      <Text style={{ color: "white", marginLeft: 8 }}>Saving...</Text>
    </View>
  ) : (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="save" size={20} color="white" />
      <Text style={{ color: "white", marginLeft: 8 }}>Save</Text>
    </View>
  )}
</Button>
```

## Advanced Styling and Accessibility

### Custom Styling

```tsx
// Shadow and elevation
<Button
  label="Elevated Button"
  onPress={() => {}}
  style={{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  }}
/>

// Margin and positioning
<Button
  label="Positioned Button"
  onPress={() => {}}
  style={{
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-end',
  }}
/>

// Custom opacity
<Button
  label="Custom Opacity"
  onPress={() => {}}
  activeOpacity={0.6}
/>
```

### Accessibility Features

```tsx
// Full accessibility setup
<Button
  label="Save Changes"
  onPress={handleSave}
  accessibilityLabel="Save all changes to your profile"
  accessibilityHint="Double tap to save your profile changes"
  accessibilityRole="button"
  testID="save-profile-button"
/>

// Screen reader support
<Button
  label="Delete Item"
  onPress={handleDelete}
  accessibilityLabel="Delete this item permanently"
  accessibilityHint="This action cannot be undone"
  accessibilityState={{ disabled: isDeleting }}
/>
```

### Testing Support

```tsx
// Test identifiers for automated testing
<Button
  label="Login"
  onPress={handleLogin}
  testID="login-button"
/>

<Button
  label="Sign Up"
  onPress={handleSignUp}
  testID="signup-button"
/>
```

## Advanced Examples

### Dynamic Button States

```tsx
const DynamicButton = ({ action, currentState }) => {
  const getButtonConfig = () => {
    switch (action) {
      case "subscribe":
        return {
          label: currentState === "subscribed" ? "Subscribed" : "Subscribe",
          variant: currentState === "subscribed" ? "accent" : "primary",
          disabled: currentState === "subscribed",
        };
      case "follow":
        return {
          label: currentState === "following" ? "Following" : "Follow",
          variant: currentState === "following" ? "accent" : "outline",
          disabled: currentState === "following",
        };
      default:
        return {
          label: "Action",
          variant: "primary",
          disabled: false,
        };
    }
  };

  const config = getButtonConfig();

  return (
    <Button
      label={config.label}
      variant={config.variant}
      disabled={config.disabled}
      onPress={() => handleAction(action)}
    />
  );
};
```

### Button Groups

```tsx
const ButtonGroup = ({ buttons, orientation = "horizontal" }) => {
  const containerStyle = {
    flexDirection: orientation === "horizontal" ? "row" : "column",
    gap: 8,
    alignItems: orientation === "horizontal" ? "center" : "stretch",
  };

  return (
    <View style={containerStyle}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          label={button.label}
          variant={button.variant}
          size={button.size}
          width={orientation === "vertical" ? "full" : "fit"}
          onPress={button.onPress}
          loading={button.loading}
          disabled={button.disabled}
        />
      ))}
    </View>
  );
};

// Usage
const buttons = [
  { label: "Save", variant: "primary", onPress: handleSave },
  { label: "Cancel", variant: "outline", onPress: handleCancel },
  { label: "Delete", variant: "outline", onPress: handleDelete },
];

<ButtonGroup buttons={buttons} orientation="horizontal" />;
```

### Conditional Button Rendering

```tsx
const ConditionalButtons = ({ user, item }) => {
  const canEdit = user.role === "admin" || user.id === item.ownerId;
  const canDelete = user.role === "admin";
  const canShare = item.isPublic;

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {canEdit && (
        <Button label="Edit" variant="outline" size="sm" onPress={() => navigateToEdit(item.id)} />
      )}

      {canDelete && (
        <Button
          label="Delete"
          variant="outline"
          size="sm"
          onPress={() => showDeleteConfirmation(item.id)}
        />
      )}

      {canShare && (
        <Button label="Share" variant="accent" size="sm" onPress={() => shareItem(item)} />
      )}
    </View>
  );
};
```

## Styling Guide

### Color Schemes

The button component uses a predefined color palette from `@/constants/Colours`:

```tsx
// Primary variant colors
colors.orange[300] // Background
colors.white[100]  // Text

// Accent variant colors
colors.yellow[300] // Background
colors.black[300]  // Text

// Outline variant colors
colors.orange[500] // Border and text
transparent        // Background

// Plain variant colors
colors.orange[500] // Text only
transparent        // Background
no padding         // Fits content exactly

// Disabled state
colors.orange[50]  // Background
colors.orange[50]  // Loading spinner
```

### Size Combinations

```tsx
// Compact interface
<Button size="sm" borderRadius="flat" variant="outline" />

// Standard interface
<Button size="base" borderRadius="curved" variant="primary" />

// Hero section
<Button size="xl" borderRadius="rounded" variant="primary" width="full" />

// Mobile-optimized
<Button size="lg" borderRadius="curved" variant="primary" width="full" />
```

### Responsive Design

```tsx
const ResponsiveButton = ({ label, onPress }) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);

  const isMobile = screenWidth < 768;

  return (
    <Button
      label={label}
      size={isMobile ? "lg" : "base"}
      width={isMobile ? "full" : "fit"}
      borderRadius={isMobile ? "curved" : "rounded"}
      onPress={onPress}
    />
  );
};
```

## Best Practices

### 1. Loading States

Always provide visual feedback during async operations:

```tsx
<Button label="Submit" onPress={handleSubmit} loading={isSubmitting} disabled={isSubmitting} />
```

### 2. Disabled States

Disable buttons when actions are not available:

```tsx
<Button label="Save" onPress={handleSave} disabled={!isFormValid || isSubmitting} />
```

### 3. Consistent Sizing

Use consistent sizes throughout your application:

```tsx
// Primary actions
<Button size="lg" variant="primary" />

// Secondary actions
<Button size="md" variant="outline" />

// Compact actions
<Button size="sm" variant="outline" />
```

### 4. Accessibility

Provide clear, descriptive labels:

```tsx
// Good
<Button label="Save Changes" onPress={handleSave} />

// Better
<Button label="Save Profile Changes" onPress={handleSave} />
```

### 5. Error Handling

Handle errors gracefully in button actions:

```tsx
const handleSubmit = async () => {
  try {
    setIsLoading(true);
    await submitForm();
    showSuccessMessage("Form submitted successfully");
  } catch (error) {
    showErrorMessage("Failed to submit form. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
```

### 6. Button Hierarchy

Use variants to establish visual hierarchy:

```tsx
// Primary action
<Button variant="primary" label="Continue" />

// Secondary action
<Button variant="outline" label="Back" />

// Accent action
<Button variant="accent" label="Special Offer" />
```

### 7. Accessibility

Provide clear, descriptive labels:

```tsx
// Good
<Button label="Save Changes" onPress={handleSave} />

// Better
<Button
  label="Save Profile Changes"
  onPress={handleSave}
  accessibilityLabel="Save all changes to your profile"
  accessibilityHint="Double tap to save your profile changes"
/>
```

### 8. Testing

Use testID for reliable automated testing:

```tsx
<Button label="Submit" onPress={handleSubmit} testID="submit-form-button" />
```

### 9. Children Usage

Use children for custom content and icons:

```tsx
// Icon buttons
<Button onPress={handlePress}>
  <Ionicons name="heart" size={24} color="#EF4444" />
</Button>

// Icon with text
<Button onPress={handlePress}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons name="add" size={20} color="white" />
    <Text style={{ color: 'white', marginLeft: 8 }}>Add Item</Text>
  </View>
</Button>

// Custom loading states
<Button onPress={handlePress} loading={isLoading}>
  {isLoading ? (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <ActivityIndicator size="small" color="white" />
      <Text style={{ color: 'white', marginLeft: 8 }}>Saving...</Text>
    </View>
  ) : (
    <Text style={{ color: 'white' }}>Save</Text>
  )}
</Button>
```

### 10. Icon Button Best Practices

Use the icon size for compact icon-only buttons:

```tsx
// Use icon size for compact buttons
<Button size="icon" onPress={handlePress}>
  <Ionicons name="heart" size={18} color="#EF4444" />
</Button>

// Use regular sizes for icon + text buttons
<Button size="md" onPress={handlePress}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons name="add" size={16} color="white" />
    <Text style={{ color: 'white', marginLeft: 6 }}>Add</Text>
  </View>
</Button>

// Consistent icon sizing
const iconSize = 18; // Define consistent icon sizes
<Button size="icon" onPress={handlePress}>
  <Ionicons name="settings" size={iconSize} color="#6B7280" />
</Button>
```

### 11. Custom Styling

Use style prop for additional customization:

```tsx
// Add shadows and elevation
<Button
  label="Elevated Button"
  onPress={handlePress}
  style={{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }}
/>

// Custom positioning
<Button
  label="Floating Action"
  onPress={handlePress}
  style={{
    position: 'absolute',
    bottom: 20,
    right: 20,
  }}
/>
```

## TypeScript Support

The component is fully typed with TypeScript:

```tsx
interface ButtonProps extends Omit<TouchableOpacityProps, "onPress"> {
  label?: string;
  children?: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "accent" | "outline" | "plain";
  width?: "full" | "fit";
  borderRadius?: BorderRadiusType;
  size?: ButtonSize;
  style?: StyleProp<ViewStyle>;
}

type BorderRadiusType = "flat" | "curved" | "rounded";
type ButtonSize = "sm" | "md" | "base" | "lg" | "xl" | "icon";
```

## Performance Considerations

- The component uses `styled-components` for dynamic styling
- Loading states are handled efficiently with conditional rendering
- TouchableOpacity provides native touch feedback
- Consider memoization for buttons in lists with many items

## Browser Compatibility

This component is designed for React Native and works with:

- iOS (via Expo)
- Android (via Expo)
- Web (via Expo Web)

## Common Patterns

### Form Submission

```tsx
const FormSubmitButton = ({ isValid, isSubmitting, onSubmit }) => (
  <Button
    label="Submit"
    variant="primary"
    size="lg"
    width="full"
    onPress={onSubmit}
    loading={isSubmitting}
    disabled={!isValid || isSubmitting}
  />
);
```

### Navigation Actions

```tsx
const NavigationButton = ({ destination, label }) => (
  <Button label={label} variant="outline" size="md" onPress={() => navigate(destination)} />
);
```

### Toggle Actions

```tsx
const ToggleButton = ({ isActive, onToggle, activeLabel, inactiveLabel }) => (
  <Button
    label={isActive ? activeLabel : inactiveLabel}
    variant={isActive ? "accent" : "outline"}
    size="sm"
    onPress={onToggle}
  />
);
```

### Text Links

```tsx
const TextLinkButton = ({ label, onPress }) => (
  <Button label={label} variant="plain" size="sm" onPress={onPress} />
);
```

---

For more examples and advanced usage patterns, refer to the component source code and test files.
