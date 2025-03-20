import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const laptopData = [
  {
    id: 1,
    name: 'Budget Performer',
    price: 35000,
    specs: 'Core i3, 8GB RAM, 256GB SSD',
    useCases: ['browse', 'documents', 'videos'],
    portable: true,
  },
  {
    id: 2,
    name: 'Work Machine Pro',
    price: 55000,
    specs: 'Core i5, 16GB RAM, 512GB SSD',
    useCases: ['browse', 'documents', 'videos', 'development'],
    portable: true,
  },
  {
    id: 3,
    name: 'Creative Studio',
    price: 85000,
    specs: 'Core i7, 16GB RAM, 1TB SSD, Dedicated Graphics',
    useCases: ['videos', 'design', 'development'],
    portable: false,
  },
  {
    id: 4,
    name: 'Gaming Beast',
    price: 120000,
    specs: 'Core i7, 32GB RAM, 1TB SSD, RTX Graphics',
    useCases: ['gaming', 'design', 'development', 'videos'],
    portable: false,
  },
  {
    id: 5,
    name: 'Ultraportable Plus',
    price: 75000,
    specs: 'Core i5, 16GB RAM, 512GB SSD, Lightweight',
    useCases: ['browse', 'documents', 'videos'],
    portable: true,
  },
  {
    id: 6,
    name: 'Developer Workstation',
    price: 95000,
    specs: 'Core i7, 32GB RAM, 1TB SSD, Multiple Ports',
    useCases: ['development', 'design'],
    portable: false,
  }
];

const LaptopRecommendation = (props) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Function to get state from parent bot
  const getBotState = useCallback(() => {
    const state = props.steps;
    if (!state) return null;
    
    // Extract data from chat steps
    let budget = 50000; // Default value
    let usage = '';
    let travel = false;
    
    // Try to extract budget from user input
    if (state.budget && state.budget.value) {
      const budgetValue = parseFloat(state.budget.value.replace(/[^0-9.]/g, ''));
      if (!isNaN(budgetValue)) {
        budget = budgetValue;
      }
    }
    
    // Determine usage
    if (state.hasOwnProperty('browse-response')) {
      usage = 'browse';
    } else if (state.hasOwnProperty('documents-response')) {
      usage = 'documents';
    } else if (state.hasOwnProperty('videos-response')) {
      usage = 'videos';
    } else if (state.hasOwnProperty('gaming-response')) {
      usage = 'gaming';
    } else if (state.hasOwnProperty('development-response')) {
      usage = 'development';
    } else if (state.hasOwnProperty('design-response')) {
      usage = 'design';
    }
    
    // Determine travel preference
    travel = state.hasOwnProperty('travel-yes-response');
    
    return { budget, usage, travel };
  }, [props.steps]);
  
  useEffect(() => {
    // Simulate API call with some delay
    setTimeout(() => {
      let filtered = [...laptopData];
      const userPreferences = getBotState() || { budget: 50000 };
      
      // Filter by budget (consider laptops up to 20% above budget)
      filtered = filtered.filter(laptop => laptop.price <= userPreferences.budget * 1.2);
      
      // Filter by usage if available
      if (userPreferences.usage) {
        filtered = filtered.filter(laptop => 
          laptop.useCases.includes(userPreferences.usage)
        );
      }
      
      // Filter by portability if important
      if (userPreferences.travel) {
        filtered = filtered.filter(laptop => laptop.portable);
      }
      
      // Sort by best match (closer to budget)
      filtered.sort((a, b) => {
        const aDiff = Math.abs(a.price - userPreferences.budget);
        const bDiff = Math.abs(b.price - userPreferences.budget);
        return aDiff - bDiff;
      });
      
      // Limit to top 3 recommendations
      setRecommendations(filtered.slice(0, 3));
      setLoading(false);
    }, 1000);
  }, [getBotState]);
  
  if (loading) {
    return <div>Finding the perfect laptops for you...</div>;
  }
  
  if (recommendations.length === 0) {
    return <div>I couldn't find laptops matching your criteria. Please try with a different budget or requirements.</div>;
  }
  
  return (
    <div style={{ textAlign: 'left' }}>
      <p>Based on your preferences, here are my recommendations:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {recommendations.map(laptop => (
          <div key={laptop.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '5px', 
            padding: '10px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3 style={{ margin: '0 0 8px 0' }}>{laptop.name}</h3>
            <p style={{ margin: '0 0 5px 0' }}><strong>Price:</strong> Rs {laptop.price.toLocaleString()}</p>
            <p style={{ margin: '0 0 5px 0' }}><strong>Specs:</strong> {laptop.specs}</p>
            <p style={{ margin: '0', fontSize: '0.9em', color: '#666' }}>
              {laptop.portable ? '✓ Good for travel' : '✗ Not ideal for frequent travel'}
            </p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '10px' }}>These options are selected based on your budget, usage needs, and travel preferences.</p>
    </div>
  );
};

LaptopRecommendation.propTypes = {
  steps: PropTypes.object,
};

LaptopRecommendation.defaultProps = {
  steps: {},
};

export default LaptopRecommendation; 