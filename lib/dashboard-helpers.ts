import AsyncStorage from "@react-native-async-storage/async-storage";

// Greeting messages based on time of day
const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};

// Format current date and time
const getFormattedDateTime = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return now.toLocaleDateString("en-US", options);
};

// Rotating inspirational messages
const inspirationalMessages = [
  "It is a beautiful day today, remember to smile",
  "Every order brings you closer to your goals",
  "Your shopping list is your roadmap to success",
  "Take a moment to appreciate the little things",
  "Good things come to those who plan ahead",
  "Your future self will thank you for today's choices",
  "Every item on your list is a step forward",
  "Embrace the journey of organized living",
  "Small steps lead to big accomplishments",
  "Your dedication to planning shows your wisdom",
  "Today's preparation is tomorrow's success",
  "Organize your thoughts, organize your life",
  "Every order placed is progress made",
  "Your shopping strategy is your superpower",
  "Planning ahead is the key to peace of mind",
];

// Get a random inspirational message
const getRandomInspirationalMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * inspirationalMessages.length);
  return inspirationalMessages[randomIndex];
};

// Tips for different user scenarios
const userTips = {
  firstTime: [
    "You can get started by tapping the bottom right button to create your first list",
    "Create your first market list to begin your shopping journey",
    "Start by adding items you need most to your first list",
    "Your first list is the beginning of organized shopping",
  ],
  returning: [
    "Pro tip: You can edit your existing lists by tapping on them",
    "Pro tip: Set reminders for your shopping trips",
    "Pro tip: Share your lists with family members for collaborative shopping",
    "Pro tip: Use categories to organize your items better",
    "Pro tip: Add notes to items for specific requirements",
    // "Pro tip: Check your order history to track your spending patterns",
    "Pro tip: Set up recurring lists for regular items",
    "Pro tip: Use the search function to quickly find items",
    "Pro tip: Create multiple lists for different stores or occasions",
    "Pro tip: Set quantity limits to avoid over-ordering",
  ],
  orderPlaced: [
    "Pro tip: Track your order status in the order history section",
    "Pro tip: Set up notifications for order updates",
    "Pro tip: Review your order before confirming to avoid mistakes",
    "Pro tip: Save your payment methods for faster checkout",
    "Pro tip: Check delivery times before placing your order",
    "Pro tip: Add delivery instructions for better service",
    "Pro tip: Keep track of your favorite items for future orders",
  ],
};

// Check if user is first time
const isFirstTimeUser = async (): Promise<boolean> => {
  try {
    const hasCreatedList = await AsyncStorage.getItem("hasCreatedList");
    return hasCreatedList === null;
  } catch (error) {
    console.error("Error checking first time user:", error);
    return true; // Default to first time on error
  }
};

// Check if user has placed orders
const hasPlacedOrders = async (): Promise<boolean> => {
  try {
    const orderHistory = await AsyncStorage.getItem("orderHistory");
    return orderHistory !== null && JSON.parse(orderHistory).length > 0;
  } catch (error) {
    console.error("Error checking order history:", error);
    return false;
  }
};

// Get appropriate tip based on user status
const getAppropriateTip = async (): Promise<string> => {
  const firstTime = await isFirstTimeUser();
  const hasOrders = await hasPlacedOrders();

  if (firstTime) {
    // For first time users, always show the same tip
    return userTips.firstTime[0];
  } else if (hasOrders) {
    // For users who have placed orders
    const randomIndex = Math.floor(Math.random() * userTips.orderPlaced.length);
    return userTips.orderPlaced[randomIndex];
  } else {
    // For returning users without orders
    const randomIndex = Math.floor(Math.random() * userTips.returning.length);
    return userTips.returning[randomIndex];
  }
};

// Main dashboard data generator
export const generateDashboardData = async () => {
  return {
    greeting: getTimeBasedGreeting(),
    dateTime: getFormattedDateTime(),
    inspirationalMessage: getRandomInspirationalMessage(),
    tip: await getAppropriateTip(),
  };
};

// Export individual functions for specific use cases
export {
  getTimeBasedGreeting,
  getFormattedDateTime,
  getRandomInspirationalMessage,
  getAppropriateTip,
  isFirstTimeUser,
};
