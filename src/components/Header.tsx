import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, ChevronLeft, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to replace cn from @/lib/utils
function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// Simple button component to replace shadcn Button
const Button = ({
  children,
  className,
  variant = "default",
  size = "default",
  asChild = false,
  onClick,
  ...props
}: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50";
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  };
  const styles = cn(
    baseStyles,
    variant === "ghost" ? variantStyles.ghost : variantStyles.default,
    size === "icon" ? sizeStyles.icon : size === "sm" ? sizeStyles.sm : size === "lg" ? sizeStyles.lg : sizeStyles.default,
    className
  );
  if (asChild) {
    return React.cloneElement(children, {
      className: cn(styles, children.props.className),
      ...props
    });
  }
  return (
    <button className={styles} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// Simple badge component to replace shadcn Badge
const Badge = ({ children, className, ...props }: any) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

// Define our sports background data
const sportsBackgrounds = [
  {
    id: 1,
    name: 'Soccer',
    tagline: 'Where passion meets precision',
    image: {
      desktop: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=2000',
      mobile: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800'
    },
    color: 'orange'
  },
  {
    id: 2,
    name: 'Basketball',
    tagline: 'Rise to the occasion',
    image: {
      desktop: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=2000',
      mobile: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800'
    },
    color: 'orange'
  },
  {
    id: 3,
    name: 'Tennis',
    tagline: 'Advantage, you',
    image: {
      desktop: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=2000',
      mobile: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800'
    },
    color: 'orange'
  },
  {
    id: 4,
    name: 'Cricket',
    tagline: 'Every moment counts',
    image: {
      desktop: 'https://images.unsplash.com/photo-1587280501635-a19de238a81e?auto=format&fit=crop&q=80&w=2000',
      mobile: 'https://images.unsplash.com/photo-1587280501635-a19de238a81e?auto=format&fit=crop&q=80&w=800'
    },
    color: 'orange'
  },
  {
    id: 5,
    name: 'Athletics',
    tagline: 'Push your limits',
    image: {
      desktop: 'https://images.unsplash.com/photo-1603102859961-64b17d43580d?auto=format&fit=crop&q=80&w=2000',
      mobile: 'https://images.unsplash.com/photo-1603102859961-64b17d43580d?auto=format&fit=crop&q=80&w=800'
    },
    color: 'orange'
  }
];

// Animation variants
const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 0.5 } }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

interface HeaderProps {
  eventList?: string[];
}

export const Header: React.FC<HeaderProps> = ({ eventList = [] }) => {
  const [currentSportIndex, setCurrentSportIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false); // Controls visibility of the registration form

  // Current sport background based on index
  const currentSport = sportsBackgrounds[currentSportIndex];

  // Function to handle smooth scrolling
  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setMobileMenuOpen(false);
  };

  // Change to next sport
  const nextSport = () => {
    setCurrentSportIndex((prevIndex) =>
      prevIndex === sportsBackgrounds.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Change to previous sport
  const prevSport = () => {
    setCurrentSportIndex((prevIndex) =>
      prevIndex === 0 ? sportsBackgrounds.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate backgrounds every 8 seconds if autoplay is enabled
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoplay) {
      timer = setInterval(() => {
        nextSport();
      }, 8000);
    }
    return () => clearInterval(timer);
  }, [autoplay]);

  // Pause autoplay when user interacts with controls
  const handleUserInteraction = () => {
    setAutoplay(false);
    // Resume autoplay after 30 seconds of inactivity
    setTimeout(() => setAutoplay(true), 30000);
  };

  // Smoothly close the registration form
  const closeForm = () => {
    setIsFormVisible(false); // Start the exit animation
    setTimeout(() => {
      // Perform any cleanup or additional actions here
    }, 300); // Match this duration with the CSS transition duration
  };

  return (
    <header className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Dynamic Background Image with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSport.id}
          className="absolute inset-0"
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <picture>
            <source
              srcSet={currentSport.image.mobile}
              media="(max-width: 768px)"
            />
            <img
              src={currentSport.image.desktop}
              className="w-full h-full object-cover"
              alt={`${currentSport.name} background`}
            />
          </picture>
          <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
          {/* Animated particles overlay - Aceternity-inspired */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-full h-full">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-1 w-1 md:h-2 md:w-2 rounded-full bg-white opacity-20"
                  animate={{
                    x: [
                      Math.random() * 100 - 50 + "%",
                      Math.random() * 100 - 50 + "%",
                      Math.random() * 100 - 50 + "%",
                    ],
                    y: [
                      Math.random() * 100 - 50 + "%",
                      Math.random() * 100 - 50 + "%",
                      Math.random() * 100 - 50 + "%",
                    ],
                    scale: [0.5, Math.random() * 2 + 0.5, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Bar */}
      <div className="relative z-10">
        <div className="flex justify-between items-center px-4 py-4 sm:px-6 sm:py-6">
          <div className="flex items-center">
            <img
              src="../../assets/Kayrakaram_logo_white.png"
              alt="Karyakaram Logo"
              className="w-12 h-8 sm:w-16 sm:h-10"
            />
            <span className="ml-2 text-xl sm:text-2xl font-bold text-white">Karyakaram</span>
          </div>
          {/* Mobile Navigation */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              className="text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex gap-6 text-white">
            {["Tournaments", "About", "Contact"].map((item) => (
              <Button 
                key={item} 
                variant="ghost" 
                className="text-white hover:text-orange-500 hover:bg-white/10"
                onClick={() => {
                  handleSmoothScroll(item.toLowerCase());
                }}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sm:hidden absolute top-20 right-0 left-0 bg-black/90 backdrop-blur-md z-20 border-t border-white/10"
          >
            <nav className="flex flex-col p-4">
              {["Tournaments", "About", "Contact"].map((item) => (
                <Button 
                  key={item} 
                  variant="ghost" 
                  className="justify-start text-white hover:text-orange-500 hover:bg-white/10 py-3"
                  onClick={() => {
                    handleSmoothScroll(item.toLowerCase());
                  }}
                >
                  {item}
                </Button>
              ))}
            </nav>
          </motion.div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-grow flex-col items-center justify-center min-h-screen text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSport.id}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl"
          >
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
              {currentSport.name}
            </Badge>
            
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6">
              Connect, Play &amp;
              <span className={`text-${currentSport.color}-500`}> Yapp</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-2 sm:mb-3">
              Where Communities Compete, Connect, and Grow Through Events and Challenges, Both On-Field and Online!
            </p>
            
            <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 italic">
              {currentSport.tagline}
            </p>
            
            <Button 
              className={`bg-${currentSport.color}-500 hover:bg-${currentSport.color}-600 text-white px-8 py-6 rounded-full`}
              size="lg"
              asChild
            >
              <a
                href="https://chat.whatsapp.com/FB89mTLBV81HNS8fzMuJ6E"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Join Our Community
                <ChevronRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Sport Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 rounded-full h-8 w-8"
            onClick={() => {
              prevSport();
              handleUserInteraction();
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex space-x-2">
            {sportsBackgrounds.map((sport, index) => (
              <Button
                key={sport.id}
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full h-2 w-2 p-0 flex items-center justify-center",
                  currentSportIndex === index 
                    ? `bg-${currentSport.color}-500` 
                    : "bg-white/30 hover:bg-white/50"
                )}
                onClick={() => {
                  setCurrentSportIndex(index);
                  handleUserInteraction();
                }}
                aria-label={`Switch to ${sport.name} theme`}
              />
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 rounded-full h-8 w-8"
            onClick={() => {
              nextSport();
              handleUserInteraction();
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/70 flex flex-col items-center"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
      </motion.div>
    </header>
  );
};
