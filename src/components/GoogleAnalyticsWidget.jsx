import React, { useEffect, useState } from 'react';

const GoogleAnalyticsWidget = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [trackingEvents, setTrackingEvents] = useState([]);
  const [userMetrics, setUserMetrics] = useState({});
  const [realtimeData, setRealtimeData] = useState({});

  useEffect(() => {
    // Initialize Google Analytics
    const initGoogleAnalytics = () => {
      // Load gtag.js script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-MW8F57LZQ5';
      
      script1.onload = () => {
        // Initialize dataLayer and gtag function
        window.dataLayer = window.dataLayer || [];
        const originalDataLayer = [...window.dataLayer];
        
        function gtag(){dataLayer.push(arguments);}
        
        // Configure gtag
        gtag('js', new Date());
        gtag('config', 'G-MW8F57LZQ5', {
          debug_mode: true
        });
        
        // Make gtag available globally
        window.gtag = gtag;
        
        // Track meaningful events
        gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname
        });
        
        gtag('event', 'user_engagement', {
          event_category: 'engagement',
          event_label: 'crm_page_visit',
          value: 1
        });
        
        setIsScriptLoaded(true);
        
        // Monitor dataLayer
        const checkDataLayer = () => {
          const newEvents = window.dataLayer.slice(originalDataLayer.length);
          const formattedEvents = newEvents.map((event, index) => ({
            id: index + 1,
            command: event[0],
            data: event[1] || {},
            timestamp: new Date().toLocaleTimeString()
          }));
          setTrackingEvents(formattedEvents);
        };
        
        checkDataLayer();
        const interval = setInterval(checkDataLayer, 2000);
        
        // Set up user metrics
        setUserMetrics({
          sessionId: Math.random().toString(36).substr(2, 9),
          startTime: new Date().toLocaleTimeString(),
          userAgent: navigator.userAgent.split(' ').slice(-2).join(' '),
          referrer: document.referrer || 'Direct',
          landingPage: window.location.pathname
        });
        
        // Set up real-time data
        setRealtimeData({
          currentPage: document.title,
          timeOnPage: '0:00',
          scrollDepth: '0%',
          interactions: 0
        });
        
        // Track time on page
        let seconds = 0;
        const pageTimer = setInterval(() => {
          seconds++;
          const minutes = Math.floor(seconds / 60);
          const secs = seconds % 60;
          setRealtimeData(prev => ({
            ...prev,
            timeOnPage: `${minutes}:${secs.toString().padStart(2, '0')}`
          }));
        }, 1000);
        
        // Track interactions
        let interactionCount = 0;
        const trackInteraction = () => {
          interactionCount++;
          setRealtimeData(prev => ({
            ...prev,
            interactions: interactionCount
          }));
          gtag('event', 'user_interaction', {
            event_category: 'engagement',
            event_label: 'click_or_scroll',
            value: interactionCount
          });
        };
        
        document.addEventListener('click', trackInteraction);
        document.addEventListener('scroll', trackInteraction);
        
        return () => {
          clearInterval(interval);
          clearInterval(pageTimer);
          document.removeEventListener('click', trackInteraction);
          document.removeEventListener('scroll', trackInteraction);
        };
      };

      document.head.appendChild(script1);
    };

    initGoogleAnalytics();
  }, []);

  const getInsights = () => {
    const pageViews = trackingEvents.filter(e => e.data.event_name === 'page_view').length;
    const engagements = trackingEvents.filter(e => e.data.event_category === 'engagement').length;
    const totalEvents = trackingEvents.length;
    
    return {
      pageViews,
      engagements,
      totalEvents,
      engagementRate: pageViews > 0 ? Math.round((engagements / pageViews) * 100) : 0
    };
  };

  const insights = getInsights();

  return (
    <div 
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
        borderRadius: '16px',
        padding: '24px',
        margin: '16px',
        marginTop: '100px', // Add top margin to avoid overlapping with fixed nav
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px',
        color: 'white',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 1
      }}
      data-testid="ga-widget"
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div>
          <h3 style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '4px'
          }}>
            📊 Analytics Dashboard
          </h3>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
            Real-time visitor tracking for Medicaps CRM
          </p>
        </div>
        <div style={{
          padding: '8px 16px',
          backgroundColor: isScriptLoaded ? '#10b981' : '#ef4444',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          {isScriptLoaded ? '🟢 LIVE' : '🔴 OFFLINE'}
        </div>
      </div>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            {insights.pageViews}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Page Views</div>
        </div>
        
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            {realtimeData.interactions || 0}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Interactions</div>
        </div>
        
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            {realtimeData.timeOnPage || '0:00'}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Time on Page</div>
        </div>
        
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
            {insights.engagementRate}%
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Engagement</div>
        </div>
      </div>

      {/* Current Session Info */}
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          👤 Current Visitor Session
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
          <div>
            <div style={{ opacity: 0.7, marginBottom: '4px' }}>Session ID:</div>
            <div style={{ fontFamily: 'monospace', fontWeight: '600' }}>
              {userMetrics.sessionId || 'Generating...'}
            </div>
          </div>
          
          <div>
            <div style={{ opacity: 0.7, marginBottom: '4px' }}>Started at:</div>
            <div style={{ fontWeight: '600' }}>
              {userMetrics.startTime || 'Loading...'}
            </div>
          </div>
          
          <div>
            <div style={{ opacity: 0.7, marginBottom: '4px' }}>Current Page:</div>
            <div style={{ fontWeight: '600' }}>
              {realtimeData.currentPage || 'Loading...'}
            </div>
          </div>
          
          <div>
            <div style={{ opacity: 0.7, marginBottom: '4px' }}>Traffic Source:</div>
            <div style={{ fontWeight: '600' }}>
              {userMetrics.referrer === 'Direct' ? '🔗 Direct Traffic' : '🌐 Referral'}
            </div>
          </div>
        </div>
      </div>

      {/* What's Being Tracked Right Now */}
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px'
      }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          🎯 What's Being Tracked
        </h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>👁️</span>
            <span>Page views and navigation</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🖱️</span>
            <span>Clicks and interactions</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>⏱️</span>
            <span>Time spent on each page</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>📱</span>
            <span>Device and browser info</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🌍</span>
            <span>Geographic location</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🔄</span>
            <span>Session flow and behavior</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        padding: '20px'
      }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          📈 Recent Activity
        </h4>
        
        {trackingEvents.length === 0 ? (
          <div style={{ fontSize: '13px', opacity: 0.7 }}>
            Waiting for visitor activity...
          </div>
        ) : (
          <div style={{ maxHeight: '120px', overflow: 'auto' }}>
            {trackingEvents.slice(-5).reverse().map((event) => (
              <div key={event.id} style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '13px' }}>
                    {event.command === 'config' ? '⚙️ Analytics configured' :
                     event.command === 'event' && event.data.event_name === 'page_view' ? '👁️ Page viewed' :
                     event.command === 'event' && event.data.event_category === 'engagement' ? '💡 User engaged' :
                     event.command === 'js' ? '🚀 Tracking started' :
                     '📊 ' + event.command}
                  </div>
                  {event.data.page_title && (
                    <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px' }}>
                      {event.data.page_title}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>
                  {event.timestamp}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div style={{
        marginTop: '20px',
        fontSize: '11px',
        opacity: 0.7,
        textAlign: 'center'
      }}>
        Tracking ID: G-MW8F57LZQ5 | Data sent to Google Analytics in real-time
      </div>
    </div>
  );
};

export default GoogleAnalyticsWidget;
