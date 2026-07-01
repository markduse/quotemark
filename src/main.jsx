import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider, useAuth } from './AuthContext';
import App from './App.jsx';
import AuthScreen from './AuthScreen.jsx';
import PaywallScreen from './PaywallScreen.jsx';
import { PrivacyPage, TermsPage } from './LegalPages.jsx';

class ErrorBoundary extends React.Component {
  constructor(props){super(props);this.state={crashed:false,err:null,info:null};}
  static getDerivedStateFromError(e){return{crashed:true,err:e};}
  componentDidCatch(e,info){
    console.error('[QuoteMark CRASH] Error:', e.message);
    console.error('[QuoteMark CRASH] Stack:', e.stack);
    console.error('[QuoteMark CRASH] Component tree:', info.componentStack);
    this.setState({info});
  }
  render(){
    if(this.state.crashed){
      const msg = this.state.err?.message || 'Unknown error';
      return(
        <div style={{minHeight:'100vh',background:'#060E1A',display:'flex',flexDirection:'column',
          alignItems:'center',justifyContent:'center',fontFamily:"'Barlow Condensed',sans-serif",
          color:'#F1F5F9',gap:16,padding:24,textAlign:'center'}}>
          <div style={{fontSize:28,fontWeight:700}}>Quote<span style={{color:'#C5A059'}}>Mark</span></div>
          <div style={{fontSize:15,color:'#94A3B8'}}>Something went wrong</div>
          <div style={{fontSize:11,color:'#64748B',maxWidth:480,wordBreak:'break-word',
            background:'#0B1120',border:'1px solid #1E293B',borderRadius:8,padding:'10px 14px',
            fontFamily:'monospace'}}>{msg}</div>
          <button onClick={()=>window.location.reload()}
            style={{marginTop:8,padding:'10px 28px',borderRadius:8,border:'none',
              background:'#C5A059',color:'#0A192F',fontWeight:700,fontSize:14,cursor:'pointer',
              fontFamily:"'DM Sans',sans-serif"}}>
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Gate() {
  const { session, loading, isSubscribed } = useAuth();

  // Static legal pages — render before auth gating so they're publicly accessible.
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/privacy') return <PrivacyPage />;
  if (path === '/terms')   return <TermsPage />;

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

  // Dev-only preview bypass: `localStorage.qm_dev_bypass = 1` on localhost skips
  // the gate so the app can be checked without signing in. import.meta.env.DEV
  // is statically false in production builds — this branch is compiled away.
  const devBypass = import.meta.env.DEV && typeof localStorage !== 'undefined' && localStorage.getItem('qm_dev_bypass');
  if (devBypass) return <App />;

  if (!session)       return <AuthScreen />;
  if (!isSubscribed)  return <PaywallScreen />;
  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider><ErrorBoundary><Gate /></ErrorBoundary></AuthProvider>
);
