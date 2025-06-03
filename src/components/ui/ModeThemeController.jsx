import React, { useState, useEffect, createContext, useContext } from 'react';
import Icon from '../AppIcon';

const ModeThemeContext = createContext();

export const useModeTheme = () => {
  const context = useContext(ModeThemeContext);
  if (!context) {
    throw new Error('useModeTheme must be used within a ModeThemeProvider');
  }
  return context;
};

const ModeThemeController = ({ children }) => {
  const [currentMode, setCurrentMode] = useState('hustle');
  const [animationIntensity, setAnimationIntensity] = useState('medium');
  const [uiDensity, setUiDensity] = useState('comfortable');
  const [isControllerOpen, setIsControllerOpen] = useState(false);

  const resellModes = {
    study: {
      id: 'study',
      label: 'Study Mode',
      icon: 'BookOpen',
      description: 'Focused learning with reduced distractions',
      colorScheme: {
        primary: '#00D4FF',
        secondary: '#8B5CF6',
        accent: '#FF6B6B',
        intensity: 0.7
      },
      animations: 'reduced',
      density: 'spacious',
      features: {
        particleEffects: false,
        glowEffects: true,
        transitions: 'smooth',
        notifications: 'minimal'
      }
    },
    chill: {
      id: 'chill',
      label: 'Chill Mode',
      icon: 'Coffee',
      description: 'Relaxed interface for casual browsing',
      colorScheme: {
        primary: '#00D4FF',
        secondary: '#8B5CF6',
        accent: '#00FF88',
        intensity: 0.8
      },
      animations: 'standard',
      density: 'comfortable',
      features: {
        particleEffects: true,
        glowEffects: true,
        transitions: 'smooth',
        notifications: 'standard'
      }
    },
    hustle: {
      id: 'hustle',
      label: 'Hustle Mode',
      icon: 'Zap',
      description: 'High-energy interface for peak productivity',
      colorScheme: {
        primary: '#00D4FF',
        secondary: '#8B5CF6',
        accent: '#FFB800',
        intensity: 1.0
      },
      animations: 'enhanced',
      density: 'compact',
      features: {
        particleEffects: true,
        glowEffects: true,
        transitions: 'fast',
        notifications: 'enhanced'
      }
    }
  };

  const animationSettings = {
    reduced: {
      duration: '300ms',
      easing: 'ease-out',
      particles: false,
      glow: 'subtle'
    },
    standard: {
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      particles: true,
      glow: 'medium'
    },
    enhanced: {
      duration: '150ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      particles: true,
      glow: 'intense'
    }
  };

  const densitySettings = {
    compact: {
      spacing: 'tight',
      padding: 'sm',
      fontSize: 'sm'
    },
    comfortable: {
      spacing: 'normal',
      padding: 'md',
      fontSize: 'base'
    },
    spacious: {
      spacing: 'loose',
      padding: 'lg',
      fontSize: 'lg'
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('resellMode');
    if (savedMode && resellModes[savedMode]) {
      setCurrentMode(savedMode);
    }
  }, []);

  useEffect(() => {
    const mode = resellModes[currentMode];
    if (mode) {
      // Apply CSS custom properties for dynamic theming
      const root = document.documentElement;
      
      // Update color intensity
      root.style.setProperty('--mode-intensity', mode.colorScheme.intensity);
      root.style.setProperty('--mode-primary', mode.colorScheme.primary);
      root.style.setProperty('--mode-secondary', mode.colorScheme.secondary);
      root.style.setProperty('--mode-accent', mode.colorScheme.accent);
      
      // Update animation settings
      const animSettings = animationSettings[mode.animations];
      root.style.setProperty('--animation-duration', animSettings.duration);
      root.style.setProperty('--animation-easing', animSettings.easing);
      
      // Update density settings
      const densSettings = densitySettings[mode.density];
      root.style.setProperty('--ui-spacing', densSettings.spacing);
      root.style.setProperty('--ui-padding', densSettings.padding);
      
      // Apply body classes for mode-specific styling
      document.body.className = document.body.className.replace(/mode-\w+/g, '');
      document.body.classList.add(`mode-${currentMode}`);
      
      setAnimationIntensity(mode.animations);
      setUiDensity(mode.density);
      
      // Save to localStorage
      localStorage.setItem('resellMode', currentMode);
    }
  }, [currentMode]);

  const switchMode = (modeId) => {
    setCurrentMode(modeId);
    setIsControllerOpen(false);
  };

  const toggleController = () => {
    setIsControllerOpen(!isControllerOpen);
  };

  const ModeButton = ({ mode }) => {
    const isActive = currentMode === mode.id;
    
    return (
      <button
        onClick={() => switchMode(mode.id)}
        className={`
          relative group flex items-center space-x-3 w-full p-4 rounded-lg transition-smooth
          ${isActive 
            ? 'bg-primary/10 border border-primary/30 text-primary glow-primary' :'bg-surface/50 border border-subtle text-text-secondary hover:text-text-primary hover:bg-surface/70'
          }
        `}
      >
        <div className={`
          flex items-center justify-center w-10 h-10 rounded-lg transition-smooth
          ${isActive ? 'bg-primary text-white' : 'bg-surface text-text-secondary group-hover:text-primary'}
        `}>
          <Icon name={mode.icon} size={20} />
        </div>
        
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-sm">{mode.label}</h3>
          <p className="text-xs opacity-70">{mode.description}</p>
        </div>
        
        {isActive && (
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        )}
      </button>
    );
  };

  const ControllerPanel = () => (
    <div className={`
      fixed top-20 right-6 w-80 bg-background/95 backdrop-blur-cinematic border border-subtle rounded-xl shadow-cinematic z-80 transition-smooth
      ${isControllerOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
    `}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Resell Mode
          </h2>
          <button
            onClick={toggleController}
            className="p-2 text-text-secondary hover:text-text-primary transition-smooth"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
        
        <div className="space-y-3 mb-6">
          {Object.values(resellModes).map((mode) => (
            <ModeButton key={mode.id} mode={mode} />
          ))}
        </div>
        
        <div className="pt-4 border-t border-subtle">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Current Settings</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-1 bg-surface rounded text-text-primary">
                {animationIntensity}
              </span>
              <span className="text-xs px-2 py-1 bg-surface rounded text-text-primary">
                {uiDensity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const contextValue = {
    currentMode,
    resellModes,
    animationIntensity,
    uiDensity,
    switchMode,
    getCurrentModeConfig: () => resellModes[currentMode]
  };

  return (
    <ModeThemeContext.Provider value={contextValue}>
      {children}
      
      {/* Mode Controller Trigger */}
      <button
        onClick={toggleController}
        className={`
          fixed top-24 right-6 z-70 flex items-center justify-center w-12 h-12 rounded-full transition-smooth
          bg-gradient-to-br from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 
          text-white shadow-lg glow-primary hover:scale-110 active:scale-95
        `}
        title="Switch Resell Mode"
      >
        <Icon name={resellModes[currentMode].icon} size={20} />
      </button>
      
      {/* Controller Panel */}
      <ControllerPanel />
      
      {/* Overlay */}
      {isControllerOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-60"
          onClick={() => setIsControllerOpen(false)}
        />
      )}
    </ModeThemeContext.Provider>
  );
};

export default ModeThemeController;
export { ModeThemeContext };