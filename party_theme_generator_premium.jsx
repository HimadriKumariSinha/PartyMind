import React, { useState, useRef } from 'react';
import { 
  Sparkles, Palette, Music, ShoppingCart, Gift, Camera, 
  Cake, Lightbulb, Users, Calendar, DollarSign, Download, 
  Share2, Heart, Settings, Moon, Sun, Zap, Check, ArrowRight 
} from 'lucide-react';

export default function PartyThemeGenerator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    occasion: '',
    ageGroup: '',
    colors: [],
    budget: '',
    venue: '',
    guestCount: '',
    vibe: '',
    interests: [],
    musicPreference: '',
    foodStyle: ''
  });
  const [themeGenerated, setThemeGenerated] = useState(false);
  const [generatedTheme, setGeneratedTheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const formSteps = [
    {
      title: 'Occasion',
      key: 'occasion',
      type: 'select',
      options: ['Birthday', 'Farewell Party', 'Anniversary', 'Baby Shower', 'Graduation', 'Wedding', 'Corporate Event', 'Reunion']
    },
    {
      title: 'Age Group',
      key: 'ageGroup',
      type: 'select',
      options: ['Kids (5-10)', 'Teens (11-17)', 'Young Adults (18-25)', 'Adults (26-40)', 'Mixed Group']
    },
    {
      title: 'Favorite Colors',
      key: 'colors',
      type: 'multiselect',
      options: ['Red', 'Pink', 'Purple', 'Blue', 'Green', 'Yellow', 'Orange', 'Gold', 'Silver', 'Black']
    },
    {
      title: 'Budget',
      key: 'budget',
      type: 'select',
      options: ['Budget (₹5-10K)', 'Medium (₹10-25K)', 'Premium (₹25-50K)', 'Luxury (₹50K+)']
    },
    {
      title: 'Venue',
      key: 'venue',
      type: 'select',
      options: ['Indoor', 'Outdoor', 'Garden', 'Hall', 'Rooftop', 'Beach', 'Farm House']
    },
    {
      title: 'Number of Guests',
      key: 'guestCount',
      type: 'select',
      options: ['Small (10-25)', 'Medium (25-50)', 'Large (50-100)', 'Mega (100+)']
    },
    {
      title: 'Party Vibe',
      key: 'vibe',
      type: 'select',
      options: ['Luxury', 'Cute & Playful', 'Elegant', 'Fun & Wild', 'Retro', 'Futuristic', 'Minimal', 'Bohemian', 'Glamorous']
    },
    {
      title: 'Interests & Hobbies',
      key: 'interests',
      type: 'multiselect',
      options: ['Gaming', 'Sports', 'Music', 'Art', 'Movies', 'Travel', 'Food', 'Fashion', 'Nature', 'Anime']
    },
    {
      title: 'Music Preference',
      key: 'musicPreference',
      type: 'select',
      options: ['Bollywood', 'Pop', 'Hip-Hop', 'Electronic', 'Jazz', 'Indie', 'Classical', 'Lofi']
    },
    {
      title: 'Food Style',
      key: 'foodStyle',
      type: 'select',
      options: ['Vegetarian', 'Non-Veg', 'Vegan', 'Mixed', 'International', 'Street Food', 'Gourmet']
    }
  ];

  const handleInputChange = (key, value) => {
    if (formSteps[currentStep].type === 'multiselect') {
      setFormData(prev => ({
        ...prev,
        [key]: prev[key].includes(value)
          ? prev[key].filter(item => item !== value)
          : [...prev[key], value]
      }));
    } else {
      setFormData(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleNext = () => {
    const currentKey = formSteps[currentStep].key;
    if (formData[currentKey] === '' || (Array.isArray(formData[currentKey]) && formData[currentKey].length === 0)) {
      alert('Please select an option');
      return;
    }
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateTheme();
    }
  };

  const generateTheme = async () => {
    setLoading(true);
    
    // Simulate API call with a slight delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const theme = generateMockTheme();
    setGeneratedTheme(theme);
    setThemeGenerated(true);
    setLoading(false);
  };

  const generateMockTheme = () => {
    const themes = {
      'luxury': {
        name: '✨ Golden Elegance',
        description: 'A sophisticated celebration with timeless luxury',
        colors: ['#FFD700', '#1a1a1a', '#F5F5F5'],
        colorNames: ['Gold', 'Charcoal', 'Ivory'],
        decorations: [
          'Crystal chandeliers with golden accents',
          'White drapes with gold embroidery',
          'Marble and gold pillar stands',
          'Crystal vases with white roses and gold leaves',
          'Golden cutlery and porcelain plates'
        ],
        balloons: [
          'Gold metallic balloons (12", 18", 24")',
          'White pearl balloons for elegance',
          'Clear balloons filled with gold confetti',
          'Foil balloons shaped like champagne glasses',
          'Balloon garland in gold, white, and cream'
        ],
        tableSetup: [
          'Gold-rimmed crystal glasses',
          'White linen tablecloths with gold runners',
          'Charger plates with silk napkins',
          'Gold candelabras as centerpieces',
          'Place cards with calligraphy'
        ],
        lighting: [
          'Warm golden string lights',
          'Crystal uplighting in champagne gold',
          'Spotlight on the cake table',
          'Candles in crystal holders',
          'Dimmable ambient lighting'
        ],
        dressCode: 'Black Tie / Cocktail Attire - Gold & Black preferred',
        cakeDesign: 'Four-tier white cake with gold leaf, champagne buttercream, fresh white roses',
        musicMood: 'Jazz, Lofi Hip-Hop, Classical Fusion, Ambient Background',
        returnGifts: [
          'Personalized gold-plated items',
          'Premium chocolate boxes',
          'Scented candles in gold jars',
          'Custom jewelry boxes',
          'Luxury pen sets'
        ],
        photoBoothConcept: 'Gold sequin backdrop with ornate gold frames, props with champagne glasses',
        activities: [
          'Live jazz performance',
          'Champagne tasting experience',
          'Elegant card games tournament',
          'Photo booth with luxury props',
          'Live caricature artist'
        ],
        budget: {
          decorations: 15000,
          food: 25000,
          cake: 8000,
          entertainment: 12000,
          miscellaneous: 5000,
          total: 65000
        }
      },
      'fun': {
        name: '🎉 Rainbow Party Blast',
        description: 'A vibrant, colorful celebration filled with joy and laughter',
        colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
        colorNames: ['Coral Red', 'Turquoise', 'Sunny Yellow'],
        decorations: [
          'Rainbow balloon arches',
          'Colorful paper pompoms',
          'Neon string lights',
          'Oversized colorful number/letter balloons',
          'DIY photo backdrop with balloons'
        ],
        balloons: [
          'Rainbow latex balloons in various sizes',
          'Neon glow balloons',
          'Confetti-filled rainbow balloons',
          'Star and heart-shaped balloons',
          'Ombre color gradient balloon bouquets'
        ],
        tableSetup: [
          'Rainbow-colored napkins',
          'Colorful paper cups and plates',
          'Confetti table scatter',
          'Rainbow striped runners',
          'Fun centerpieces with colorful flowers'
        ],
        lighting: [
          'Colorful LED string lights',
          'Neon signs with fun messages',
          'Rainbow uplighting',
          'Glow sticks scattered around',
          'LED balloons'
        ],
        dressCode: 'Colorful Casual - Express yourself in bright colors!',
        cakeDesign: 'Rainbow layer cake with colorful sprinkles, fondant characters matching interests',
        musicMood: 'Pop, Bollywood Dance, Upbeat Indie, Fun Covers',
        returnGifts: [
          'Colorful candy bags',
          'Fun party poppers',
          'DIY craft kits',
          'Rainbow tie-dye items',
          'Comic books or graphic novels'
        ],
        photoBoothConcept: 'Neon background with oversized party props, peace signs, fun masks',
        activities: [
          'Musical chairs tournament',
          'Dance competition with prizes',
          'Balloon popping game',
          'DIY craft station',
          'Scavenger hunt with fun clues'
        ],
        budget: {
          decorations: 8000,
          food: 12000,
          cake: 4000,
          entertainment: 5000,
          miscellaneous: 3000,
          total: 32000
        }
      }
    };

    const selectedVibe = formData.vibe.toLowerCase().includes('luxury') ? 'luxury' : 'fun';
    const baseTheme = themes[selectedVibe];
    
    return {
      ...baseTheme,
      formInputs: formData
    };
  };

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      occasion: '',
      ageGroup: '',
      colors: [],
      budget: '',
      venue: '',
      guestCount: '',
      vibe: '',
      interests: [],
      musicPreference: '',
      foodStyle: ''
    });
    setThemeGenerated(false);
    setGeneratedTheme(null);
    setActiveTab('overview');
  };

  const downloadPlan = () => {
    const planText = `
PARTY THEME: ${generatedTheme.name}
${generatedTheme.description}

SELECTED PREFERENCES:
- Occasion: ${formData.occasion}
- Venue: ${formData.venue}
- Guest Count: ${formData.guestCount}
- Budget: ${formData.budget}
- Vibe: ${formData.vibe}

THEME DETAILS:

Colors: ${generatedTheme.colorNames.join(', ')}

Decorations:
${generatedTheme.decorations.map((d, i) => `${i + 1}. ${d}`).join('\n')}

Balloons:
${generatedTheme.balloons.map((b, i) => `${i + 1}. ${b}`).join('\n')}

Table Setup:
${generatedTheme.tableSetup.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Lighting:
${generatedTheme.lighting.map((l, i) => `${i + 1}. ${l}`).join('\n')}

Dress Code: ${generatedTheme.dressCode}

Cake Design: ${generatedTheme.cakeDesign}

Music Mood: ${generatedTheme.musicMood}

Return Gifts:
${generatedTheme.returnGifts.map((g, i) => `${i + 1}. ${g}`).join('\n')}

Photo Booth Concept: ${generatedTheme.photoBoothConcept}

Activities:
${generatedTheme.activities.map((a, i) => `${i + 1}. ${a}`).join('\n')}

BUDGET BREAKDOWN:
Decorations: ₹${generatedTheme.budget.decorations.toLocaleString()}
Food & Beverages: ₹${generatedTheme.budget.food.toLocaleString()}
Cake: ₹${generatedTheme.budget.cake.toLocaleString()}
Entertainment: ₹${generatedTheme.budget.entertainment.toLocaleString()}
Miscellaneous: ₹${generatedTheme.budget.miscellaneous.toLocaleString()}
─────────────────
TOTAL: ₹${generatedTheme.budget.total.toLocaleString()}
    `;
    
    const blob = new Blob([planText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedTheme.name.replace(/[^\w]/g, '')}_Party_Plan.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const bgClass = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900';

  const cardClass = isDarkMode
    ? 'bg-gray-800 border border-gray-700'
    : 'bg-white border border-gray-200';

  const inputClass = isDarkMode
    ? 'bg-gray-700 border-gray-600 text-white'
    : 'bg-white border-gray-300 text-gray-900';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Syne:wght@400;700;800&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
        
        h1, h2, h3, .display-font {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
          50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.8); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-rotate {
          animation: rotate 2s linear infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }
        
        .btn-primary:active {
          transform: translateY(0);
        }

        .color-swatch {
          transition: all 0.3s ease;
        }

        .color-swatch:hover {
          transform: scale(1.1);
        }

        .tab-button {
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 2px;
        }
      `}</style>

      {/* Header */}
      <header className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200/50 bg-white/50'} backdrop-blur-md sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 animate-slideInLeft">
              <div className="p-2 rounded-xl bg-gradient-to-br from-pink-400 to-purple-600">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold display-font gradient-text">PartyAI</h1>
                <p className="text-xs text-gray-500">Theme Generator</p>
              </div>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-lg transition-all ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!themeGenerated ? (
          // Form Section
          <div className="animate-fadeIn">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex justify-between mb-4">
                <h2 className="text-3xl font-bold display-font">
                  {formSteps[currentStep].title}
                </h2>
                <span className="text-sm font-semibold text-gray-500">
                  Step {currentStep + 1} of {formSteps.length}
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Options */}
            <div className={`${cardClass} rounded-2xl p-8 mb-8 animate-slideInRight`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formSteps[currentStep].type === 'multiselect' ? (
                  formSteps[currentStep].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleInputChange(formSteps[currentStep].key, option)}
                      className={`p-4 rounded-xl font-semibold transition-all text-left flex items-center justify-between ${
                        formData[formSteps[currentStep].key].includes(option)
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                          : isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                          : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                      }`}
                    >
                      <span>{option}</span>
                      {formData[formSteps[currentStep].key].includes(option) && (
                        <Check className="w-5 h-5" />
                      )}
                    </button>
                  ))
                ) : (
                  formSteps[currentStep].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleInputChange(formSteps[currentStep].key, option)}
                      className={`p-4 rounded-xl font-semibold transition-all text-left ${
                        formData[formSteps[currentStep].key] === option
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                          : isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                          : 'bg-gray-100 hover:bg-gray-200 border border-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentStep === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                ← Back
              </button>

              <button
                onClick={handleNext}
                className="btn-primary px-8 py-3 rounded-lg font-semibold text-white flex items-center gap-2"
              >
                {currentStep === formSteps.length - 1 ? (
                  <>
                    <Zap className="w-5 h-5" /> Generate Theme
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : loading ? (
          // Loading State
          <div className="flex flex-col items-center justify-center min-h-96 gap-8">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-indigo-500 animate-rotate" />
              <div className="absolute inset-2 rounded-full border-4 border-gray-300 border-b-purple-500 animate-rotate" style={{ animationDirection: 'reverse' }} />
            </div>
            <h3 className="text-2xl font-bold display-font">Creating Your Perfect Theme...</h3>
            <p className="text-gray-500">Our AI is analyzing your preferences</p>
          </div>
        ) : (
          // Theme Display
          <div className="animate-fadeIn">
            {/* Theme Header */}
            <div className={`${cardClass} rounded-3xl p-8 mb-8 overflow-hidden relative`}>
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  background: `linear-gradient(135deg, ${generatedTheme.colors[0]}, ${generatedTheme.colors[1]}, ${generatedTheme.colors[2]})`
                }}
              />
              <div className="relative z-10">
                <h2 className="text-5xl font-black display-font mb-3 gradient-text">
                  {generatedTheme.name}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {generatedTheme.description}
                </p>

                {/* Color Palette */}
                <div className="flex flex-wrap gap-4">
                  {generatedTheme.colors.map((color, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-lg shadow-lg color-swatch border-4 border-gray-200 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                        title={generatedTheme.colorNames[idx]}
                      />
                      <div>
                        <p className="font-semibold text-sm">{generatedTheme.colorNames[idx]}</p>
                        <p className="text-xs text-gray-500">{color}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className={`${cardClass} rounded-2xl p-6 mb-8`}>
              <div className="flex flex-wrap gap-4 border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                {[
                  { id: 'overview', label: '📋 Overview', icon: Sparkles },
                  { id: 'decorations', label: '✨ Decorations', icon: Palette },
                  { id: 'budget', label: '💰 Budget', icon: DollarSign },
                  { id: 'shopping', label: '🛍️ Shopping', icon: ShoppingCart },
                  { id: 'music', label: '🎵 Music', icon: Music },
                  { id: 'invitation', label: '📮 Invitation', icon: Gift }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-button px-4 py-2 font-semibold text-sm transition-all ${
                      activeTab === tab.id
                        ? isDarkMode
                          ? 'text-indigo-400'
                          : 'text-indigo-600'
                        : isDarkMode
                        ? 'text-gray-400 hover:text-gray-200'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="animate-fadeIn">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold display-font mb-3 flex items-center gap-2">
                        <Palette className="w-5 h-5" /> Decorations
                      </h3>
                      <ul className="space-y-2">
                        {generatedTheme.decorations.map((dec, idx) => (
                          <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold mt-1">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">{dec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold display-font mb-3 flex items-center gap-2">
                        <Cake className="w-5 h-5" /> Cake & Cake Design
                      </h3>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-pink-50 to-purple-50'}`}>
                        <p className="text-gray-700 dark:text-gray-300 font-semibold">{generatedTheme.cakeDesign}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold display-font mb-3">👗 Dress Code</h3>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
                        <p className="text-gray-700 dark:text-gray-300 font-semibold">{generatedTheme.dressCode}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold display-font mb-3 flex items-center gap-2">
                        <Camera className="w-5 h-5" /> Photo Booth Concept
                      </h3>
                      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-yellow-50 to-orange-50'}`}>
                        <p className="text-gray-700 dark:text-gray-300 font-semibold">{generatedTheme.photoBoothConcept}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold display-font mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5" /> Activities & Games
                      </h3>
                      <ul className="space-y-2">
                        {generatedTheme.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'decorations' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold display-font mb-4">🎈 Balloon Setup Ideas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generatedTheme.balloons.map((balloon, idx) => (
                          <div key={idx} className={`p-4 rounded-lg border-l-4 border-indigo-500 ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                            <p className="text-gray-700 dark:text-gray-300 font-semibold">{balloon}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold display-font mb-4">🍽️ Table Setup</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generatedTheme.tableSetup.map((setup, idx) => (
                          <div key={idx} className={`p-4 rounded-lg border-l-4 border-purple-500 ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                            <p className="text-gray-700 dark:text-gray-300 font-semibold">{setup}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold display-font mb-4">💡 Lighting Suggestions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {generatedTheme.lighting.map((light, idx) => (
                          <div key={idx} className={`p-4 rounded-lg border-l-4 border-yellow-500 ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                            <p className="text-gray-700 dark:text-gray-300 font-semibold">{light}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'budget' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-bold display-font mb-4">Budget Breakdown</h4>
                        <div className="space-y-3">
                          {Object.entries(generatedTheme.budget).slice(0, -1).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                              <span className="font-semibold capitalize text-gray-700 dark:text-gray-300">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                                ₹{value.toLocaleString()}
                              </span>
                            </div>
                          ))}
                          <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg">
                            <span>Total Budget</span>
                            <span>₹{generatedTheme.budget.total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold display-font mb-4">Budget Distribution</h4>
                        <div className="space-y-4">
                          {Object.entries(generatedTheme.budget).slice(0, -1).map(([key, value]) => {
                            const percentage = (value / generatedTheme.budget.total) * 100;
                            const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-pink-500', 'bg-blue-500', 'bg-green-500'];
                            return (
                              <div key={key}>
                                <div className="flex justify-between mb-2">
                                  <span className="text-sm font-semibold capitalize text-gray-700 dark:text-gray-300">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                  <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{percentage.toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                  <div
                                    className={`h-full ${colors[Object.keys(generatedTheme.budget).slice(0, -1).indexOf(key)]}`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'shopping' && (
                  <div className="space-y-4">
                    {[
                      { category: '🎈 Balloons & Decorations', items: generatedTheme.balloons },
                      { category: '🍽️ Table & Serveware', items: generatedTheme.tableSetup },
                      { category: '💡 Lighting & Ambience', items: generatedTheme.lighting },
                      { category: '🎁 Return Gifts', items: generatedTheme.returnGifts }
                    ].map((section, idx) => (
                      <div key={idx} className={`p-6 rounded-lg border-l-4 ${isDarkMode ? 'bg-gray-700 border-indigo-500' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-500'}`}>
                        <h4 className="text-lg font-bold display-font mb-3">{section.category}</h4>
                        <ul className="space-y-2">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <input type="checkbox" className="w-4 h-4 rounded accent-indigo-600" />
                              <span className="text-gray-700 dark:text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'music' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold display-font mb-4 flex items-center gap-2">
                        <Music className="w-6 h-6" /> Playlist Mood
                      </h3>
                      <div className={`p-6 rounded-lg border-l-4 border-purple-500 ${isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-purple-50 to-pink-50'}`}>
                        <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">{generatedTheme.musicMood}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold display-font mb-4">Sample Playlist</h3>
                      <div className="space-y-3">
                        {[
                          'Upbeat instrumental for entry',
                          'Dance hits during main party',
                          'Slow songs for dinner time',
                          'Energetic tracks for games',
                          'Background lofi for wind down'
                        ].map((song, idx) => (
                          <div key={idx} className={`p-4 rounded-lg flex items-center gap-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700 dark:text-gray-300">{song}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'invitation' && (
                  <div className="space-y-6">
                    <div className={`p-8 rounded-2xl text-center border-2 border-dashed border-indigo-500 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gradient-to-br from-indigo-100 to-purple-100'}`} style={{
                      background: `linear-gradient(135deg, ${generatedTheme.colors[0]}20, ${generatedTheme.colors[1]}20)`
                    }}>
                      <div className="mb-6">
                        <h2 className="text-4xl font-black display-font mb-2" style={{ color: generatedTheme.colors[0] }}>
                          You're Invited!
                        </h2>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                          to a {generatedTheme.name}
                        </p>
                      </div>

                      <div className="space-y-4 text-left max-w-sm mx-auto mb-8">
                        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border-l-4" style={{ borderColor: generatedTheme.colors[1] }}>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">DATE & TIME</p>
                          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">TBD</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border-l-4" style={{ borderColor: generatedTheme.colors[2] }}>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">VENUE</p>
                          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{formData.venue}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border-l-4" style={{ borderColor: generatedTheme.colors[0] }}>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">GUESTS</p>
                          <p className="text-lg font-bold text-gray-800 dark:text-gray-200">{formData.guestCount}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 italic font-semibold mb-6">
                        "Join us for an unforgettable celebration!"
                      </p>

                      <button className="btn-primary px-6 py-3 rounded-lg text-white font-semibold">
                        Save Invitation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={downloadPlan}
                className="btn-primary px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2"
              >
                <Download className="w-5 h-5" /> Download Plan
              </button>
              <button
                onClick={() => alert('Theme shared! (Demo feature)')}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                <Share2 className="w-5 h-5" /> Share Theme
              </button>
              <button
                onClick={resetForm}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                <Sparkles className="w-5 h-5" /> Try Another Theme
              </button>
            </div>

            {/* Additional Info */}
            <div className={`${cardClass} rounded-2xl p-8 text-center`}>
              <p className="text-gray-600 dark:text-gray-400">
                ✨ Theme generated successfully! Download your complete party plan and start shopping.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200/50 bg-white/50'} mt-16 py-8 backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
          <p>Made with ❤️ by Your Team • AI-Powered Party Planning</p>
        </div>
      </footer>
    </div>
  );
}
