import React, { useEffect } from 'react';

const NpfWidget = () => {
  useEffect(() => {
    // Inject the NoPaperForms script
    const script = document.createElement('script');
    script.src = 'https://widgets.nopaperforms.com/emwgts.js';
    script.async = true;
    document.body.appendChild(script);

    // Auto-check checkbox logic specifically for the NPF widget
    const checkInterval = setInterval(function () {
      const checkboxes = document.querySelectorAll('#npf-widget-container input[type="checkbox"]');
      if (checkboxes.length > 0) {
        checkboxes.forEach(function (checkbox) {
          const parentText = checkbox.parentElement ? checkbox.parentElement.textContent || '' : '';
          const nextSiblingText = checkbox.nextSibling ? checkbox.nextSibling.textContent || '' : '';

          if (
            parentText.includes('I agree to receive information') ||
            nextSiblingText.includes('I agree to receive information') ||
            parentText.includes('agree to receive') ||
            nextSiblingText.includes('agree to receive')
          ) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            // Some forms rely on click to register the state
            checkbox.dispatchEvent(new Event('click', { bubbles: true }));
          }
        });
        clearInterval(checkInterval);
      }
    }, 200);

    // Cleanup interval just in case
    return () => clearInterval(checkInterval);
  }, []);

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
        padding: '20px',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        #npf-widget-container .npf_wgts * {
          color: white !important;
          font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }
        #npf-widget-container .npf_wgts input[type="text"],
        #npf-widget-container .npf_wgts input[type="email"],
        #npf-widget-container .npf_wgts input[type="tel"],
        #npf-widget-container .npf_wgts select,
        #npf-widget-container .npf_wgts textarea {
          color: #1e293b !important;
          background-color: white !important;
          border: 1px solid #475569 !important;
          border-radius: 0.75rem !important;
          padding: 12px 16px !important;
          font-size: 16px !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
        }
        #npf-widget-container .npf_wgts input[type="text"]:focus,
        #npf-widget-container .npf_wgts input[type="email"]:focus,
        #npf-widget-container .npf_wgts input[type="tel"]:focus,
        #npf-widget-container .npf_wgts select:focus,
        #npf-widget-container .npf_wgts textarea:focus {
          border-color: #283887 !important;
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(40, 56, 135, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05) !important;
        }
        #npf-widget-container .npf_wgts label {
          color: white !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          margin-bottom: 6px !important;
          display: block !important;
        }
        #npf-widget-container .npf_wgts button,
        #npf-widget-container .npf_wgts input[type="submit"],
        #npf-widget-container .npf_wgts input[type="button"] {
          background: #283887 !important;
          color: white !important;
          border: none !important;
          border-radius: 0.75rem !important;
          padding: 12px 24px !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          box-shadow: 0 2px 4px rgba(40, 56, 135, 0.2) !important;
        }
        #npf-widget-container .npf_wgts button:hover,
        #npf-widget-container .npf_wgts input[type="submit"]:hover,
        #npf-widget-container .npf_wgts input[type="button"]:hover {
          background: #1e2a5a !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 8px rgba(40, 56, 135, 0.3) !important;
        }
        #npf-widget-container .npf_wgts input[type="checkbox"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `}</style>
      <div className="npf_wgts" data-height="400px" data-w="1242a8cbbc551970993f589ee9febba6"></div>
    </div>
  );
};

export default NpfWidget;
