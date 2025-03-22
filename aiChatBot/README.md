# Laptop Shop Chatbot

This is a React-based chatbot application for a laptop shop that helps users find the perfect laptop based on their budget, usage requirements, and travel needs.

## Features

- Interactive conversational interface
- Budget-based recommendations
- Usage-specific suggestions (browsing, gaming, development, etc.)
- Portability considerations
- Detailed specifications display

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the laptop-shop-chatbot directory:
```
cd laptop-shop-chatbot
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

The application will open in your browser at http://localhost:3000.

## Integration with Main Project

To integrate this chatbot with the main ITPM project:

1. Import the SimpleChatbot component from the aiChatBot directory
2. Add the component to your desired page
3. Style as needed to match your application's theme

## Component Usage

```jsx
import SimpleChatbot from '../aiChatBot/laptop-shop-chatbot/src/components/SimpleChatbot';

function YourComponent() {
  return (
    <div>
      <h1>Laptop Shop Assistant</h1>
      <SimpleChatbot />
    </div>
  );
}
```

## Customization

You can modify the laptop recommendations by editing the `getLaptopRecommendations` function in the `SimpleChatbot.js` file. 