declare module 'react-adsense' {
  import * as React from 'react';

  interface AdSenseProps {
    client: string;
    slot: string;
    style?: React.CSSProperties;
    format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
    responsive?: boolean;
    className?: string;
  }

  // Define the Google sub-component
  const Google: React.FC<AdSenseProps>;
  
  interface AdSenseNamespace {
    Google: typeof Google;
  }
  
  const AdSense: AdSenseNamespace;
  export default AdSense;
}
