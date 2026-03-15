import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider, useAuth } from './AuthContext';
import App from './App.jsx';
import AuthScreen from './AuthScreen.jsx';
import PaywallScreen from './PaywallScreen.jsx';

class ErrorBoundary extends React.Component {
  constructor(props){super(props);this.state={crashed:false,err:null};}
  static getDerivedStateFromError(e){return{crashed:true,err:e};}
  componentDidCatch(e,info){console.error('[QuoteMark] Uncaught:',e,info);}
  render(){
    if(this.state.crashed){
      return(
        <div style={{minHeight:'100vh',background:'#060E1A',display:'flex',flexDirection:'column',
          alignItems:'center',justifyContent:'center',fontFamily:"'Barlow Condensed',sans-serif",
          color:'#F1F5F9',gap:16}}>
          <div style={{fontSize:28,fontWeight:700}}>Quote<span style={{color:'#F59E0B'}}>Mark</span></div>
          <div style={{fontSize:15,color:'#94A3B8'}}>Something went wrong. Reloading...</div>
        </div>
      );
    }
    return this.props.children;
  }
}

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
  <AuthProvider><ErrorBoundary><Gate /></ErrorBoundary></AuthProvider>
);
