import { useState } from 'react';
import { 
  MessageCircle, 
  Search, 
  Book, 
  Shield, 
  Wallet, 
  Send, 
  X, 
  ChevronDown, 
  ChevronRight,
  Bot,
  User,
  ArrowRight,
  ExternalLink,
  
  Mail,
  Settings,
  Lock
} from 'lucide-react';

const HelpSection = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hi! I\'m your Suimail assistant. I can help you with wallet connection, sending encrypted emails, gas fees, security, and more. What would you like to know?' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const sections = [
    { id: 'overview', title: 'What is Suimail?', icon: Book },
    { id: 'wallet', title: 'Wallet Integration', icon: Wallet },
    { id: 'security', title: 'Security & Privacy', icon: Shield },
    { id: 'messaging', title: 'Email Features', icon: Mail },
    { id: 'settings', title: 'Settings', icon: Settings }
  ];

  const faqs = [
    {
      category: 'About Suimail',
      items: [
        {
          question: 'What is Suimail?',
          answer: 'Suimail is a decentralized, blockchain-based email platform built on the Sui network. It allows you to send and receive encrypted emails using your Sui wallet, ensuring privacy, security, and true ownership of your communications.'
        },
        {
          question: 'How is Suimail different from traditional email?',
          answer: 'Unlike traditional email, Suimail stores your messages on the Sui blockchain, making them tamper-proof and censorship-resistant. All emails are end-to-end encrypted, and only you and your recipient can read them.'
        },
        {
          question: 'Do I need a Sui wallet to use Suimail?',
          answer: 'Yes, a Sui-compatible wallet is required to use Suimail. Your wallet is used to sign in, send/receive emails, and manage your encryption keys.'
        }
      ]
    },
    {
      category: 'Wallet & Security',
      items: [
        {
          question: 'Is my data secure on Suimail?',
          answer: 'Absolutely! All emails are encrypted end-to-end before being stored on the Sui blockchain. Only you and your recipient can decrypt and read your messages.'
        },
        {
          question: 'What happens if I lose my wallet?',
          answer: 'If you lose access to your wallet, you lose access to your Suimail account and email history. Always back up your wallet seed phrase securely.'
        }
      ]
    },
    {
      category: 'Features & Usage',
      items: [
        {
          question: 'Can I send attachments?',
          answer: 'Yes! Suimail supports encrypted file attachments. The maximum size depends on your subscription plan.'
        },
        {
          question: 'How much does it cost to send an email?',
          answer: 'Sending an email on Suimail costs a small blockchain fee (gas), usually less than 0.001 SUI per message.'
        },
        {
          question: 'Can I use Suimail on mobile?',
          answer: 'Yes, Suimail is accessible on both desktop and mobile browsers. A mobile app is coming soon!'
        }
      ]
    }
  ];

  const quickActions = [
    { title: 'Connect Wallet', description: 'Link your Sui wallet to start using Suimail', icon: Wallet },
    { title: 'Send First Email', description: 'Learn how to compose and send secure messages', icon: Send },
    { title: 'Manage Contacts', description: 'Add and organize your Suimail contacts', icon: User },
    { title: 'Security Settings', description: 'Configure privacy and security options', icon: Lock }
  ];

  // Smart chatbot responses
  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    
    if (input.includes('wallet') || input.includes('connect')) {
      if (input.includes('which') || input.includes('what wallet')) {
        return "You can use any Sui-compatible wallet like Sui Wallet, Ethos Wallet, or Martian Wallet. I recommend Sui Wallet for the best experience. Make sure you have some SUI tokens for transaction fees!";
      }
      if (input.includes('connect') || input.includes('how')) {
        return "To connect your wallet: 1) Click 'Connect Wallet' in the top-right corner, 2) Select your wallet type, 3) Approve the connection in your wallet popup. Need SUI tokens? You can get them from exchanges like Binance or KuCoin.";
      }
      if (input.includes('problem') || input.includes('error') || input.includes('not working')) {
        return "Wallet connection issues? Try: 1) Refresh the page, 2) Make sure your wallet extension is unlocked, 3) Clear browser cache, 4) Try switching to a different network and back. Still stuck? Let me know the exact error message!";
      }
    
      return "For wallet help, I can assist with connection, supported wallets, or troubleshooting. What specific wallet issue are you facing?";
    }
    
    // Email/messaging queries
    if (input.includes('email') || input.includes('message') || input.includes('send')) {
      if (input.includes('cost') || input.includes('fee') || input.includes('gas')) {
        return "Sending emails costs very little - typically under 0.001 SUI per message (less than $0.01). The exact fee depends on network congestion. Your wallet will show the exact amount before confirming.";
      }
      if (input.includes('private') || input.includes('secure') || input.includes('encrypted')) {
        return "Yes! All emails are end-to-end encrypted before going on the blockchain. Only you and the recipient can read them using your wallet keys. Much more secure than traditional email!";
      }
      if (input.includes('how') && (input.includes('send') || input.includes('compose'))) {
        return "To send an email: 1) Click 'Compose' or the + button, 2) Enter recipient's Sui address or ENS name, 3) Write your message, 4) Click 'Send' and confirm in your wallet. The message will be on-chain in seconds!";
      }
      return "I can help with sending emails, costs, privacy, or any messaging features. What would you like to know?";
    }
    
    // Security queries
    if (input.includes('security') || input.includes('safe') || input.includes('secure') || input.includes('private')) {
      return "Your emails are super secure! They're encrypted with your wallet keys before going on Sui blockchain. No one can read them without your private key - not even us. Always keep your seed phrase safe and never share it!";
    }
    
    // SUI token queries
    if (input.includes('sui') && (input.includes('token') || input.includes('buy') || input.includes('get'))) {
      return "You can get SUI tokens from major exchanges like Binance, KuCoin, or OKX. You'll need small amounts for sending emails (gas fees). Consider getting at least 1-2 SUI to start - that's enough for hundreds of emails!";
    }
    
    // Speed/performance queries
    if (input.includes('slow') || input.includes('fast') || input.includes('speed')) {
      return "Sui is super fast! Your emails are typically confirmed in 2-3 seconds. If it seems slow, check your wallet connection and network status. The Sui network processes thousands of transactions per second.";
    }
    
    // Backup/recovery queries
    if (input.includes('backup') || input.includes('recover') || input.includes('lost') || input.includes('seed phrase')) {
      return "⚠️ Important: Your emails are tied to your wallet. If you lose your wallet/seed phrase, you lose access to your email history forever. Always backup your seed phrase securely and never share it with anyone!";
    }
    
    // Contact/address queries
    if (input.includes('contact') || input.includes('address') || input.includes('friend')) {
      return "To email someone, you need their Sui wallet address (starts with 0x...). You can also use Sui Name Service (SuiNS) names if they have one - much easier to remember! Save frequent contacts for quick access.";
    }
    
    // General help
    if (input.includes('help') || input.includes('start') || input.includes('begin')) {
      return "Welcome to decentralized email! Start by: 1) Connecting your Sui wallet, 2) Getting some SUI tokens for fees, 3) Sending your first encrypted email. Check our Quick Start guide above for step-by-step instructions!";
    }
    
    // Error handling
    if (input.includes('error') || input.includes('problem') || input.includes('issue')) {
      return "I'm here to help! Can you tell me more about the specific error or problem you're experiencing? Is it related to wallet connection, sending emails, or something else?";
    }
    
    // Pricing queries  
    if (input.includes('price') || input.includes('cost') || input.includes('free')) {
      return "The app is free to use! You only pay tiny blockchain fees (gas) when sending emails - usually less than 0.001 SUI per message. No monthly subscriptions or hidden costs!";
    }
    
    // Default responses for unmatched queries
    const defaultResponses = [
      "That's a great question! Could you provide more details so I can give you the most helpful answer?",
      "I'd love to help! Can you tell me more about what you're trying to do with the Sui Email app?",
      "I'm here to assist with wallet connection, sending emails, security, or any other features. What specific area would you like help with?",
      "Let me help you with that! Are you looking for help with technical issues, getting started, or learning about features?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    const botResponse = getBotResponse(userMessage);
    
    const newMessages = [
      ...chatMessages,
      { type: 'user', message: userMessage },
      { type: 'bot', message: botResponse }
    ];
    
    setChatMessages(newMessages);
    setUserMessage('');
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
              <p className="text-gray-600 mt-1">Get help with your Suimail experience</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Help Topics</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 rounded-lg border border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer group"
                    >
                      <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <h3 className="text-lg font-medium text-blue-700 mb-4 border-b border-blue-100 pb-2">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 10 + faqIndex;
                      return (
                        <div
                          key={faqIndex}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <button
                            onClick={() => toggleFaq(globalIndex)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            {expandedFaq === globalIndex ? (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          {expandedFaq === globalIndex && (
                            <div className="px-4 pb-4 text-gray-700 border-t border-gray-100 bg-gray-50">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mt-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
                  <p className="text-blue-100">Our support team is here to assist you with any questions.</p>
                </div>
                <div className="flex space-x-3">
                  <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                    Contact Support
                  </button>
                  <button className="border border-blue-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4" />
                    <span>Documentation</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Toggle */}
      <button
        onClick={() => setChatbotOpen(!chatbotOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors z-50"
      >
        {chatbotOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chatbot Modal */}
      {chatbotOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-2xl border border-blue-100 z-50">
          <div className="bg-blue-600 text-white p-4 rounded-t-xl flex items-center space-x-3">
            <Bot className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Sui Email Assistant</h3>
              <p className="text-sm text-blue-100">Online now</p>
            </div>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about wallets, sending emails, fees..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!userMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {['How to connect wallet?', 'Email costs?', 'Is it secure?'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setUserMessage(suggestion)}
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSection;