/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#00D4FF', // Electric blue for primary actions and key data highlights - blue-400
        'primary-50': '#E6F9FF', // Very light blue tint - blue-50
        'primary-100': '#CCF3FF', // Light blue tint - blue-100
        'primary-200': '#99E7FF', // Medium light blue - blue-200
        'primary-300': '#66DBFF', // Medium blue - blue-300
        'primary-400': '#33CFFF', // Medium dark blue - blue-400
        'primary-500': '#00D4FF', // Base primary color - blue-500
        'primary-600': '#00A7CC', // Darker blue - blue-600
        'primary-700': '#007A99', // Dark blue - blue-700
        'primary-800': '#004D66', // Very dark blue - blue-800
        'primary-900': '#002033', // Darkest blue - blue-900

        // Secondary Colors
        'secondary': '#8B5CF6', // Purple accent for secondary actions - purple-500
        'secondary-50': '#F3F0FF', // Very light purple tint - purple-50
        'secondary-100': '#E7E0FF', // Light purple tint - purple-100
        'secondary-200': '#CFC1FF', // Medium light purple - purple-200
        'secondary-300': '#B7A2FF', // Medium purple - purple-300
        'secondary-400': '#9F83FF', // Medium dark purple - purple-400
        'secondary-500': '#8B5CF6', // Base secondary color - purple-500
        'secondary-600': '#7C3AED', // Darker purple - purple-600
        'secondary-700': '#6D28D9', // Dark purple - purple-700
        'secondary-800': '#5B21B6', // Very dark purple - purple-800
        'secondary-900': '#4C1D95', // Darkest purple - purple-900

        // Accent Colors
        'accent': '#FF6B6B', // Coral red for alerts and profit highlights - red-400
        'accent-50': '#FFF0F0', // Very light coral tint - red-50
        'accent-100': '#FFE1E1', // Light coral tint - red-100
        'accent-200': '#FFC3C3', // Medium light coral - red-200
        'accent-300': '#FFA5A5', // Medium coral - red-300
        'accent-400': '#FF8787', // Medium dark coral - red-400
        'accent-500': '#FF6B6B', // Base accent color - red-500
        'accent-600': '#FF4757', // Darker coral - red-600
        'accent-700': '#E63946', // Dark coral - red-700
        'accent-800': '#CC2936', // Very dark coral - red-800
        'accent-900': '#B31B26', // Darkest coral - red-900

        // Background Colors
        'background': '#0A0A0B', // Deep charcoal base - gray-950
        'background-50': '#F9FAFB', // Very light background - gray-50
        'background-100': '#F3F4F6', // Light background - gray-100
        'background-200': '#E5E7EB', // Medium light background - gray-200
        'background-300': '#D1D5DB', // Medium background - gray-300
        'background-400': '#9CA3AF', // Medium dark background - gray-400
        'background-500': '#6B7280', // Base background - gray-500
        'background-600': '#4B5563', // Darker background - gray-600
        'background-700': '#374151', // Dark background - gray-700
        'background-800': '#1F2937', // Very dark background - gray-800
        'background-900': '#111827', // Darkest background - gray-900

        // Surface Colors
        'surface': '#1A1A1D', // Elevated surface color - gray-900
        'surface-50': '#F8FAFC', // Very light surface - slate-50
        'surface-100': '#F1F5F9', // Light surface - slate-100
        'surface-200': '#E2E8F0', // Medium light surface - slate-200
        'surface-300': '#CBD5E1', // Medium surface - slate-300
        'surface-400': '#94A3B8', // Medium dark surface - slate-400
        'surface-500': '#64748B', // Base surface - slate-500
        'surface-600': '#475569', // Darker surface - slate-600
        'surface-700': '#334155', // Dark surface - slate-700
        'surface-800': '#1E293B', // Very dark surface - slate-800
        'surface-900': '#0F172A', // Darkest surface - slate-900

        // Text Colors
        'text-primary': '#FFFFFF', // Pure white for primary text - white
        'text-secondary': '#A0A0A3', // Muted gray for secondary text - gray-400
        'text-50': '#F8FAFC', // Very light text - slate-50
        'text-100': '#F1F5F9', // Light text - slate-100
        'text-200': '#E2E8F0', // Medium light text - slate-200
        'text-300': '#CBD5E1', // Medium text - slate-300
        'text-400': '#94A3B8', // Medium dark text - slate-400
        'text-500': '#64748B', // Base text - slate-500
        'text-600': '#475569', // Darker text - slate-600
        'text-700': '#334155', // Dark text - slate-700
        'text-800': '#1E293B', // Very dark text - slate-800
        'text-900': '#0F172A', // Darkest text - slate-900

        // Success Colors
        'success': '#00FF88', // Bright green for profit indicators - green-400
        'success-50': '#ECFDF5', // Very light success tint - green-50
        'success-100': '#D1FAE5', // Light success tint - green-100
        'success-200': '#A7F3D0', // Medium light success - green-200
        'success-300': '#6EE7B7', // Medium success - green-300
        'success-400': '#34D399', // Medium dark success - green-400
        'success-500': '#10B981', // Base success - green-500
        'success-600': '#059669', // Darker success - green-600
        'success-700': '#047857', // Dark success - green-700
        'success-800': '#065F46', // Very dark success - green-800
        'success-900': '#064E3B', // Darkest success - green-900

        // Warning Colors
        'warning': '#FFB800', // Amber for caution states - yellow-500
        'warning-50': '#FFFBEB', // Very light warning tint - yellow-50
        'warning-100': '#FEF3C7', // Light warning tint - yellow-100
        'warning-200': '#FDE68A', // Medium light warning - yellow-200
        'warning-300': '#FCD34D', // Medium warning - yellow-300
        'warning-400': '#FBBF24', // Medium dark warning - yellow-400
        'warning-500': '#F59E0B', // Base warning - yellow-500
        'warning-600': '#D97706', // Darker warning - yellow-600
        'warning-700': '#B45309', // Dark warning - yellow-700
        'warning-800': '#92400E', // Very dark warning - yellow-800
        'warning-900': '#78350F', // Darkest warning - yellow-900

        // Error Colors
        'error': '#FF4757', // Vibrant red for errors - red-500
        'error-50': '#FEF2F2', // Very light error tint - red-50
        'error-100': '#FEE2E2', // Light error tint - red-100
        'error-200': '#FECACA', // Medium light error - red-200
        'error-300': '#FCA5A5', // Medium error - red-300
        'error-400': '#F87171', // Medium dark error - red-400
        'error-500': '#EF4444', // Base error - red-500
        'error-600': '#DC2626', // Darker error - red-600
        'error-700': '#B91C1C', // Dark error - red-700
        'error-800': '#991B1B', // Very dark error - red-800
        'error-900': '#7F1D1D', // Darkest error - red-900
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'], // Modern geometric sans-serif for headings
        'body': ['Inter', 'sans-serif'], // Consistent with headings for body text
        'caption': ['JetBrains Mono', 'monospace'], // Monospace for technical data
        'data': ['JetBrains Mono', 'monospace'], // Monospace for financial figures
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-semibold': '600',
        'heading-bold': '700',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'data-medium': '500',
      },
      boxShadow: {
        'glow-primary': '0 4px 20px rgba(0, 212, 255, 0.15)',
        'glow-secondary': '0 4px 20px rgba(139, 92, 246, 0.15)',
        'elevation-base': '0 2px 10px rgba(0, 0, 0, 0.3)',
        'cinematic': '0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 20px rgba(0, 212, 255, 0.1)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backdropBlur: {
        'cinematic': '12px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}