import React from 'react';

const NpfWidget = () => {
  return (
    <div 
      id="npf-widget-container" 
      style={{ 
        minHeight: '400px', 
        width: '100%',
        position: 'relative',
        backgroundColor: '#A21D2E',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '0',
        overflow: 'hidden'
      }}
    >
      <iframe
        src="/npf-widget.html"
        loading="eager"
        style={{
          width: '100%',
          height: '400px',
          border: 'none',
          borderRadius: '1.5rem',
          backgroundColor: 'transparent'
        }}
        title="CRM Form"
      />
    </div>
  );
};

export default NpfWidget;
