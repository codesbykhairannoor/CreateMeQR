import React, { Suspense } from 'react';
import LayoutA from './landing/LayoutA';
import LayoutB from './landing/LayoutB';
import LayoutC from './landing/LayoutC';
import LayoutD from './landing/LayoutD';

/**
 * LandingContent Router
 * This component acts as a dynamic UI router to prevent Google Duplicate Content Penalties.
 * It maps each QR type to a completely different structural DOM layout.
 */
function LandingContent({ qrType = 'url' }) {
  const getLayoutComponent = () => {
    switch (qrType) {
      // Layout A: Bento Grid Klasik (Default/Standard Tools)
      case 'url':
      case 'text':
        return <LayoutA qrType={qrType} />;
      
      // Layout B: Split-Screen & Big Typography (Spatial/Location Tools)
      case 'wifi':
      case 'location':
        return <LayoutB qrType={qrType} />;

      // Layout C: Profile Centric & Horizontal Scroll (Identity Tools)
      case 'vcard':
      case 'phone':
        return <LayoutC qrType={qrType} />;

      // Layout D: Minimalist & Centered Focus (Messaging/Event Tools)
      case 'email':
      case 'sms':
      case 'event':
        return <LayoutD qrType={qrType} />;

      // Fallback
      default:
        return <LayoutA qrType={qrType} />;
    }
  };

  return (
    <Suspense fallback={<div style={{ minHeight: '50vh' }} />}>
      {getLayoutComponent()}
    </Suspense>
  );
}

export default LandingContent;
