import React, { useState, useEffect, useRef } from 'react';
import './SimpleChatbot.css';

const SimpleChatbot = () => {
  const [messages, setMessages] = useState([
    { text: 'Welcome to our laptop shop! I\'m your virtual assistant, here to help you find the perfect laptop for your needs.', type: 'bot' }
  ]);
  const [currentStep, setCurrentStep] = useState('budget');
  const [userInput, setUserInput] = useState('');
  const [budget, setBudget] = useState(null);
  const [usage, setUsage] = useState(null);
  const [travel, setTravel] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState([]);
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to the bottom of the messages
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // Use a more forceful scroll method that doesn't rely on smooth behavior
      messagesEndRef.current.scrollIntoView({ behavior: 'auto', block: 'end' });
      
      // Double-check scrolling with a slight delay to ensure it works
      setTimeout(() => {
        const chatMessages = document.querySelector('.chatbot-messages');
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }, 50);
    }
  };

  // Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Show typing indicator before sending bot messages
  const addBotMessage = (text, additionalProps = {}) => {
    setIsTyping(true);
    scrollToBottom();
    
    // Random typing delay between 800ms and 1500ms for natural feel
    const typingDelay = Math.floor(Math.random() * 700) + 800;
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text, type: 'bot', ...additionalProps }]);
      scrollToBottom();
    }, typingDelay);
  };

  // Add the budget question shortly after the welcome message
  useEffect(() => {
    const timer = setTimeout(() => {
      addBotMessage('What is your budget for a new laptop?');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { text: userInput, type: 'user' }]);
    scrollToBottom();

    // Process based on current step
    if (currentStep === 'budget') {
      const budgetValue = parseFloat(userInput.replace(/[^0-9.]/g, ''));
      if (isNaN(budgetValue) || budgetValue <= 0) {
        addBotMessage('Please enter a valid budget.');
        setUserInput('');
        return;
      }
      setBudget(budgetValue);
      addBotMessage(`Thank you! I've noted your budget of approximately Rs ${budgetValue.toLocaleString()}.`);
      
      setTimeout(() => {
        addBotMessage('What will you mainly use the laptop for?');
        setShowOptions(true);
        setOptions([
          { value: 'browse', label: 'Browse the web' },
          { value: 'documents', label: 'Work on documents' },
          { value: 'videos', label: 'Watch videos' },
          { value: 'gaming', label: 'Gaming' },
          { value: 'development', label: 'Software development' },
          { value: 'design', label: 'Graphic design' },
          { value: 'other', label: 'Other' }
        ]);
        setCurrentStep('usage');
      }, 1500);
    } else if (currentStep === 'usage-input') {
      setUsage(userInput);
      addBotMessage(`Thank you for sharing how you'll use your laptop. For ${userInput}, we'll find the most suitable options for you.`);
      
      setTimeout(() => {
        addBotMessage('Do you plan to travel with your laptop frequently?');
        setShowOptions(true);
        setOptions([
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]);
        setCurrentStep('travel');
      }, 1500);
    }

    setUserInput('');
  };

  // Generate detailed specifications for laptops
  const generateDetailedSpecs = (recommendations) => {
    return recommendations.map(laptop => ({
      id: laptop.id,
      name: laptop.name,
      brand: laptop.brand,
      brandLogo: laptop.brandLogo,
      price: laptop.price,
      detailedSpecs: {
        processor: laptop.specs.split(',')[0],
        memory: laptop.specs.includes('RAM') ? laptop.specs.split(',').find(s => s.includes('RAM')).trim() : 'N/A',
        storage: laptop.specs.includes('SSD') ? laptop.specs.split(',').find(s => s.includes('SSD')).trim() : 'N/A',
        display: laptop.specs.includes('"') ? laptop.specs.split(',').find(s => s.includes('"')).trim() : 'N/A',
        graphics: laptop.specs.includes('NVIDIA') || laptop.specs.includes('RTX') || laptop.specs.includes('GTX') 
          ? laptop.specs.split(',').find(s => s.includes('NVIDIA') || s.includes('RTX') || s.includes('GTX')).trim() 
          : 'Integrated Graphics',
        battery: laptop.battery,
        weight: laptop.weight,
        portable: laptop.portable ? 'Yes, good for travel' : 'No, better for stationary use',
        useCases: laptop.useCases.join(', '),
        ports: 'USB-C, HDMI, USB-A, Audio Jack',
        operatingSystem: laptop.brand === 'Apple' ? 'macOS' : 'Windows 11',
        warranty: '1 Year Manufacturer Warranty',
        recommendation: laptop.recommendation
      }
    }));
  };

  const handleOptionClick = (option) => {
    setMessages(prev => [...prev, { text: option.label, type: 'user' }]);
    setShowOptions(false);
    
    if (currentStep === 'usage') {
      setUsage(option.value);
      
      if (option.value === 'other') {
        addBotMessage('Please tell me more about how you plan to use your laptop:');
        setCurrentStep('usage-input');
        return;
      }

      let responseText = '';
      switch (option.value) {
        case 'browse':
          responseText = 'Thank you for sharing how you\'ll use your laptop. For casual browsing and basic tasks, we can focus on finding a balanced, cost-effective option.';
          break;
        case 'documents':
          responseText = 'Thank you for sharing how you\'ll use your laptop. For working on documents, we\'ll focus on options with good battery life and comfortable keyboards.';
          break;
        case 'videos':
          responseText = 'Thank you for sharing how you\'ll use your laptop. For watching videos, we\'ll focus on options with good displays and audio quality.';
          break;
        case 'gaming':
          responseText = 'Thank you for sharing how you\'ll use your laptop. For gaming, we\'ll focus on options with powerful processors and dedicated graphics cards.';
          break;
        case 'development':
          responseText = 'Thank you for sharing how you\'ll use your laptop. For software development, we\'ll focus on options with good performance and multitasking capabilities.';
          break;
        case 'design':
          responseText = 'Thank you for sharing how you\'ll use your laptop. For graphic design, we\'ll focus on options with high-quality displays and strong graphics performance.';
          break;
        default:
          responseText = 'Thank you for sharing how you\'ll use your laptop. We\'ll find the most suitable options for you.';
      }
      
      addBotMessage(responseText);

      // Increase the delay for the travel question to ensure UI updates first
      setTimeout(() => {
        addBotMessage('Do you plan to travel with your laptop frequently?');
        setShowOptions(true);
        setOptions([
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ]);
        setCurrentStep('travel');
      }, 2000); // Increased delay for better conversation flow
    } else if (currentStep === 'travel') {
      setTravel(option.value);
      
      const travelResponse = option.value === 'yes' 
        ? 'Since you\'ll be traveling frequently with your laptop, I\'ll recommend lightweight and durable options with good battery life.'
        : 'Since you won\'t be traveling much with your laptop, we can focus on performance without worrying too much about weight or battery life.';
      
      addBotMessage(travelResponse);

      // Show laptop recommendations after a delay
      setTimeout(() => {
        const recommendations = getLaptopRecommendations(budget, usage, option.value === 'yes');
        
        // Create a summary of requirements
        const usageText = usage === 'browse' ? 'web browsing' : 
                         usage === 'documents' ? 'document editing' :
                         usage === 'videos' ? 'video watching' :
                         usage === 'gaming' ? 'gaming' :
                         usage === 'development' ? 'software development' :
                         usage === 'design' ? 'graphic design' :
                         usage || 'general use';
                         
        const travelText = option.value === 'yes' ? 'portable' : 'stationary';
        
        addBotMessage(`Based on your budget of Rs ${budget.toLocaleString()}, preference for ${usageText}, and need for a ${travelText} laptop, here are my recommendations:`, 
          { isRecommendation: true, recommendations });

        setTimeout(() => {
          addBotMessage('These laptops are selected based on your specific needs. The "match" indicator shows how well each laptop fits your requirements.');
          
          setTimeout(() => {
            addBotMessage('Is there anything else you would like to know about these laptops?');
            setShowOptions(true);
            setOptions([
              { value: 'yes', label: 'Yes, tell me more' },
              { value: 'no', label: 'No, thank you' }
            ]);
            setCurrentStep('final');
          }, 1800);
        }, 1500);
      }, 2200); // Increased delay for better user experience
    } else if (currentStep === 'final') {
      if (option.value === 'yes') {
        // Create more detailed specifications message
        const detailedSpecs = generateDetailedSpecs(getLaptopRecommendations(budget, usage, travel));
        
        addBotMessage('Here are more detailed specifications for the recommended laptops:', 
          { isDetailedSpecs: true, detailedSpecs });
        
        setTimeout(() => {
          addBotMessage('Thank you for using our laptop shop assistant! We hope to see you soon.');
          setShowOptions(false);
          setCurrentStep('end');
        }, 2500);
      } else {
        addBotMessage('Thank you for using our laptop shop assistant! We hope to see you soon.');
        setShowOptions(false);
        setCurrentStep('end');
      }
    }
  };

  const getLaptopRecommendations = (budget, usage, travel) => {
    const laptopData = [
      {
        id: 1,
        name: 'Lenovo IdeaPad Slim 3',
        brand: 'Lenovo',
        price: 36999,
        specs: 'Intel Core i3-1115G4, 8GB RAM, 256GB SSD, 15.6" FHD Display',
        battery: '7 hours',
        weight: '1.7 kg',
        useCases: ['browse', 'documents', 'videos'],
        portable: true,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/320px-Lenovo_logo_2015.svg.png'
      },
      {
        id: 2,
        name: 'HP Pavilion 15',
        brand: 'HP',
        price: 54990,
        specs: 'Intel Core i5-1135G7, 8GB RAM, 512GB SSD, 15.6" FHD IPS Display',
        battery: '8 hours',
        weight: '1.75 kg',
        useCases: ['browse', 'documents', 'videos', 'development'],
        portable: true,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/320px-HP_logo_2012.svg.png'
      },
      {
        id: 3,
        name: 'ASUS VivoBook 15',
        brand: 'ASUS',
        price: 45990,
        specs: 'Intel Core i5-1035G1, 8GB RAM, 512GB SSD, 15.6" FHD Display',
        battery: '6 hours',
        weight: '1.8 kg',
        useCases: ['browse', 'documents', 'videos'],
        portable: true,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/320px-ASUS_Logo.svg.png'
      },
      {
        id: 4,
        name: 'Dell Inspiron 15',
        brand: 'Dell',
        price: 62990,
        specs: 'Intel Core i5-1135G7, 16GB RAM, 512GB SSD, 15.6" FHD Display',
        battery: '7 hours',
        weight: '1.83 kg',
        useCases: ['browse', 'documents', 'videos', 'development'],
        portable: true,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/320px-Dell_Logo.svg.png'
      },
      {
        id: 5,
        name: 'Acer Nitro 5',
        brand: 'Acer',
        price: 86990,
        specs: 'Intel Core i7-11800H, 16GB RAM, 512GB SSD, NVIDIA RTX 3050Ti, 15.6" FHD 144Hz Display',
        battery: '4.5 hours',
        weight: '2.3 kg',
        useCases: ['gaming', 'development', 'videos'],
        portable: false,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/320px-Acer_2011.svg.png'
      },
      {
        id: 6,
        name: 'MSI GF63 Thin',
        brand: 'MSI',
        price: 72990,
        specs: 'Intel Core i5-11400H, 8GB RAM, 512GB SSD, NVIDIA GTX 1650, 15.6" FHD Display',
        battery: '5 hours',
        weight: '1.86 kg',
        useCases: ['gaming', 'videos', 'development'],
        portable: true,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/MSI_Logo.svg/320px-MSI_Logo.svg.png'
      },
      {
        id: 7,
        name: 'Apple MacBook Air M1',
        brand: 'Apple',
        price: 92990,
        specs: 'Apple M1 Chip, 8GB RAM, 256GB SSD, 13.3" Retina Display',
        battery: '18 hours',
        weight: '1.29 kg',
        useCases: ['browse', 'documents', 'videos', 'development', 'design'],
        portable: true,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/320px-Apple_logo_black.svg.png'
      },
      {
        id: 8,
        name: 'Apple MacBook Pro M1',
        brand: 'Apple',
        price: 122990,
        specs: 'Apple M1 Chip, 8GB RAM, 512GB SSD, 13.3" Retina Display',
        battery: '20 hours',
        weight: '1.4 kg',
        useCases: ['development', 'design', 'videos'],
        portable: true,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/320px-Apple_logo_black.svg.png'
      },
      {
        id: 9,
        name: 'ASUS ROG Strix G15',
        brand: 'ASUS',
        price: 124990,
        specs: 'AMD Ryzen 7-4800H, 16GB RAM, 1TB SSD, NVIDIA RTX 3060, 15.6" FHD 300Hz Display',
        battery: '5 hours',
        weight: '2.3 kg',
        useCases: ['gaming', 'development', 'design'],
        portable: false,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/320px-ASUS_Logo.svg.png'
      },
      {
        id: 10,
        name: 'Lenovo ThinkPad E15',
        brand: 'Lenovo',
        price: 68990,
        specs: 'Intel Core i5-10210U, 16GB RAM, 512GB SSD, 15.6" FHD Display',
        battery: '12 hours',
        weight: '1.9 kg',
        useCases: ['browse', 'documents', 'development'],
        portable: true,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/320px-Lenovo_logo_2015.svg.png'
      },
      {
        id: 11,
        name: 'Dell XPS 13',
        brand: 'Dell',
        price: 139990,
        specs: 'Intel Core i7-1165G7, 16GB RAM, 512GB SSD, 13.4" UHD+ Touch Display',
        battery: '12 hours',
        weight: '1.2 kg',
        useCases: ['browse', 'documents', 'development', 'design'],
        portable: true,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/320px-Dell_Logo.svg.png'
      },
      {
        id: 12,
        name: 'HP Envy x360',
        brand: 'HP',
        price: 82990,
        specs: 'AMD Ryzen 5-4500U, 8GB RAM, 512GB SSD, 13.3" FHD Touch Display',
        battery: '10 hours',
        weight: '1.32 kg',
        useCases: ['browse', 'documents', 'videos', 'design'],
        portable: true,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/320px-HP_logo_2012.svg.png'
      },
      {
        id: 13,
        name: 'Lenovo Legion 5',
        brand: 'Lenovo',
        price: 96990,
        specs: 'AMD Ryzen 7-5800H, 16GB RAM, 1TB SSD, NVIDIA RTX 3050, 15.6" FHD 165Hz Display',
        battery: '6 hours',
        weight: '2.4 kg',
        useCases: ['gaming', 'development', 'design', 'videos'],
        portable: false,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/320px-Lenovo_logo_2015.svg.png'
      },
      {
        id: 14,
        name: 'ASUS TUF Gaming A15',
        brand: 'ASUS',
        price: 79990,
        specs: 'AMD Ryzen 5-4600H, 16GB RAM, 512GB SSD, NVIDIA GTX 1650, 15.6" FHD 144Hz Display',
        battery: '5.5 hours',
        weight: '2.3 kg',
        useCases: ['gaming', 'development', 'videos'],
        portable: false,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/320px-ASUS_Logo.svg.png'
      },
      {
        id: 15,
        name: 'Microsoft Surface Laptop 4',
        brand: 'Microsoft',
        price: 116990,
        specs: 'AMD Ryzen 5-4680U, 8GB RAM, 256GB SSD, 13.5" Touchscreen Display',
        battery: '19 hours',
        weight: '1.26 kg',
        useCases: ['browse', 'documents', 'design'],
        portable: true,
        brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/320px-Microsoft_logo_%282012%29.svg.png'
      }
    ];

    let filtered = [...laptopData];
    
    // Filter by budget (consider laptops up to 20% above budget)
    filtered = filtered.filter(laptop => laptop.price <= budget * 1.2);
    
    // For usage filtering, add a match score instead of strict filtering
    filtered = filtered.map(laptop => {
      let score = 0;
      
      // Base score on budget match - higher scores for closer to budget
      const budgetDiff = Math.abs(laptop.price - budget);
      const budgetScore = 1 - (budgetDiff / budget); // 0 to 1 scale
      score += budgetScore * 3; // Weight budget match heavily
      
      // Add score for usage match
      if (usage && usage !== 'other' && laptop.useCases.includes(usage)) {
        score += 2;
      }
      
      // Add score for portability if travel is important
      if (travel && laptop.portable) {
        score += 2;
      } else if (!travel && !laptop.portable) {
        score += 1; // Slight preference for non-portable if not traveling
      }
      
      // Determine recommendation strength
      let recommendation = '';
      if (score >= 5) {
        recommendation = 'Excellent Match';
      } else if (score >= 3.5) {
        recommendation = 'Good Match';
      } else {
        recommendation = 'Acceptable Match';
      }
      
      return {
        ...laptop,
        score,
        recommendation
      };
    });
    
    // Sort by score
    filtered.sort((a, b) => b.score - a.score);
    
    // Return top 3 recommendations
    return filtered.slice(0, 3);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h3>Laptop Shop Assistant</h3>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.isRecommendation ? (
              <div className="recommendation-container">
                <p>{message.text}</p>
                <div className="recommendations">
                  {message.recommendations.map(laptop => (
                    <div key={laptop.id} className="recommendation-card">
                      <div className="card-header">
                        <img src={laptop.brandLogo} alt={laptop.brand} className="brand-logo" />
                        <h4>{laptop.name}</h4>
                      </div>
                      <div className={`match-badge ${laptop.recommendation.toLowerCase().replace(' ', '-')}`}>
                        {laptop.recommendation}
                      </div>
                      <p><strong>Price:</strong> Rs {laptop.price.toLocaleString()}</p>
                      <p><strong>Specs:</strong> {laptop.specs}</p>
                      <p><strong>Battery Life:</strong> {laptop.battery}</p>
                      <p><strong>Weight:</strong> {laptop.weight}</p>
                      <p className="travel-info">
                        {laptop.portable ? '✓ Good for travel' : '✗ Not ideal for frequent travel'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : message.isDetailedSpecs ? (
              <div className="detailed-specs-container">
                <p>{message.text}</p>
                <div className="detailed-specs">
                  {message.detailedSpecs.map(laptop => (
                    <div key={laptop.id} className="detailed-specs-card">
                      <div className="card-header">
                        <img src={laptop.brandLogo} alt={laptop.brand} className="brand-logo" />
                        <h4>{laptop.name}</h4>
                      </div>
                      <div className={`match-badge ${laptop.detailedSpecs.recommendation.toLowerCase().replace(' ', '-')}`}>
                        {laptop.detailedSpecs.recommendation}
                      </div>
                      <p><strong>Price:</strong> Rs {laptop.price.toLocaleString()}</p>
                      <div className="specs-table">
                        <div className="specs-row">
                          <div className="specs-label">Processor:</div>
                          <div className="specs-value">{laptop.detailedSpecs.processor}</div>
                        </div>
                        <div className="specs-row">
                          <div className="specs-label">Memory:</div>
                          <div className="specs-value">{laptop.detailedSpecs.memory}</div>
                        </div>
                        <div className="specs-row">
                          <div className="specs-label">Storage:</div>
                          <div className="specs-value">{laptop.detailedSpecs.storage}</div>
                        </div>
                        <div className="specs-row">
                          <div className="specs-label">Display:</div>
                          <div className="specs-value">{laptop.detailedSpecs.display}</div>
                        </div>
                        <div className="specs-row">
                          <div className="specs-label">Graphics:</div>
                          <div className="specs-value">{laptop.detailedSpecs.graphics}</div>
                        </div>
                        <div className="specs-row">
                          <div className="specs-label">Battery:</div>
                          <div className="specs-value">{laptop.detailedSpecs.battery}</div>
                        </div>
                        <div className="specs-row">
                          <div className="specs-label">Weight:</div>
                          <div className="specs-value">{laptop.detailedSpecs.weight}</div>
                        </div>
                        <div className="specs-row">
                          <div className="specs-label">Portable:</div>
                          <div className="specs-value">{laptop.detailedSpecs.portable}</div>
                        </div>
                        <div className="specs-row">
                          <div className="specs-label">Best For:</div>
                          <div className="specs-value">{laptop.detailedSpecs.useCases}</div>
                        </div>
                        <div className="specs-row">
                          <div className="specs-label">Ports:</div>
                          <div className="specs-value">{laptop.detailedSpecs.ports}</div>
                        </div>
                        <div className="specs-row">
                          <div className="specs-label">OS:</div>
                          <div className="specs-value">{laptop.detailedSpecs.operatingSystem}</div>
                        </div>
                        <div className="specs-row">
                          <div className="specs-label">Warranty:</div>
                          <div className="specs-value">{laptop.detailedSpecs.warranty}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>{message.text}</div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <div ref={messagesEndRef} id="messagesEndRef" />
      {showOptions && (
        <div className="options-container">
          {options.map((option, index) => (
            <button 
              key={index} 
              className="option-button"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      <div className="chatbot-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={currentStep === 'end' || (showOptions && currentStep !== 'usage-input')}
        />
        <button 
          onClick={handleSendMessage}
          disabled={currentStep === 'end' || (showOptions && currentStep !== 'usage-input')}
        >
        </button>
      </div>
    </div>
  );
};

export default SimpleChatbot; 