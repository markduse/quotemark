import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider, useAuth } from './AuthContext';
import App from './App.jsx';
import AuthScreen from './AuthScreen.jsx';
import PaywallScreen from './PaywallScreen.jsx';

function Gate() {
  const { session, loading, isSubscribed } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight:'100vh',background:'#060E1A',
        display:'flex',alignItems:'center',justifyContent:'center',
        fontFamily:"'Barlow Condensed',sans-serif",
        fontSize:28,fontWeight:700,color:'#F1F5F9',letterSpacing:'-0.5px',
      }}>
        Quote<span style={{color:'#F59E0B'}}>Mark</span>
      </div>
    );
  }

  if (!session)       return <AuthScreen />;
  if (!isSubscribed)  return <PaywallScreen />;
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider><Gate /></AuthProvider>
);
