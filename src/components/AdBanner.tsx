import React from 'react';
import AdSense from 'react-adsense';
import ErrorBoundary from './ErrorBoundary';
import AdPlaceholder from './AdPlaceholder';

// Publisher ID for AdSense (replace this with your actual ID in production)
const PUBLISHER_ID = 'ca-pub-1234567890123456';

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  responsive?: boolean;
  width?: string | number;
  height?: string | number;
}

export const AdBanner: React.FC<AdBannerProps> = ({ 
  slot, 
  format = 'auto', 
  style = {}, 
  responsive = true,
  width,
  height
}) => {
  // In development mode, just show a placeholder
  if (isDevelopment) {
    return (
      <div className="ad-container my-4 flex justify-center">
        <AdPlaceholder 
          width={width || style.width || '100%'} 
          height={height || style.height || '90px'} 
          label={`Ad Placeholder (${format}) - Slot: ${slot}`}
        />
      </div>
    );
  }

  // In production, render the actual ad with an error boundary
  return (
    <div className="ad-container my-4 flex justify-center">
      <ErrorBoundary
        fallback={
          <AdPlaceholder 
            width={width || style.width || '100%'} 
            height={height || style.height || '90px'} 
            label="Ad could not be loaded"
          />
        }
      >
        <AdSense.Google
          client={PUBLISHER_ID}
          slot={slot}
          style={{ 
            display: 'block', 
            width: width || style.width, 
            height: height || style.height, 
            ...style 
          }}
          format={format}
          responsive={responsive}
        />
      </ErrorBoundary>
    </div>
  );
};

// Banner sizes commonly used in web advertising
export const LeaderboardBanner: React.FC = () => (
  <AdBanner 
    slot="1234567890" 
    format="horizontal" 
    width="728px"
    height="90px"
    responsive={false}
  />
);

export const RectangleBanner: React.FC = () => (
  <AdBanner 
    slot="0987654321" 
    format="rectangle" 
    width="300px"
    height="250px"
    responsive={false}
  />
);

export const MobileBanner: React.FC = () => (
  <AdBanner 
    slot="1122334455" 
    format="horizontal" 
    width="320px"
    height="50px"
    responsive={false}
  />
);

export const ResponsiveBanner: React.FC = () => (
  <AdBanner 
    slot="5566778899" 
    responsive={true}
    format="auto" 
  />
);
