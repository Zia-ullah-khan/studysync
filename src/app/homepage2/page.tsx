'use client';

import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';
import CardSwap, { Card } from './CardSwap';
import Dock from './Dock';
export default function Page() {
  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'EduBot', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'SmartNotes', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'NoteCanvas', onClick: () => alert('Settings!') },
    { icon: <VscSettingsGear size={18} />, label: 'LearnSphere', onClick: () => alert('Settings!') },
  ];
  return (
    <div style={{ height: '600px', position: 'relative', backgroundColor: '#0a0a0a', padding: '60px', overflow: 'hidden' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ flex: 1, paddingRight: '80px' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '20px',
            lineHeight: '1.1'
          }}>
            StudySync – Your AI-Powered Learning Companion
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#888', 
            marginBottom: '40px' 
          }}>
            Study smarter, not harder. Four intelligent modules in one seamless platform.
          </p>
        </div>

        <div style={{ flex: 1, position: 'relative', marginTop: '400px' }}>
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={2500}
            pauseOnHover={true}
          >
            <Card>
              <div style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                border: '1px solid #333',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                <div style={{
                  background: '#2a2a2a',
                  padding: '12px 16px',
                  borderBottom: '1px solid #333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42' }}></div>
                  <span style={{ marginLeft: '12px', color: '#888', fontSize: '0.9rem' }}>🤖 EduBot</span>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  color: 'white',
                  textAlign: 'center',
                  padding: '20px'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '16px'
                  }}>💬</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>AI Chat Interface</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Ask questions, generate flashcards & quizzes</p>
                </div>
              </div>
            </Card>
            <Card>
              <div style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                border: '1px solid #333',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                <div style={{
                  background: '#2a2a2a',
                  padding: '12px 16px',
                  borderBottom: '1px solid #333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42' }}></div>
                  <span style={{ marginLeft: '12px', color: '#888', fontSize: '0.9rem' }}>📝 SmartNotes</span>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textAlign: 'center',
                  padding: '20px'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '16px'
                  }}>🎙️</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Live Transcription</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Record lectures & get AI summaries</p>
                </div>
              </div>
            </Card>
            <Card>
              <div style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                border: '1px solid #333',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                <div style={{
                  background: '#2a2a2a',
                  padding: '12px 16px',
                  borderBottom: '1px solid #333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42' }}></div>
                  <span style={{ marginLeft: '12px', color: '#888', fontSize: '0.9rem' }}>📊 LearnSphere</span>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textAlign: 'center',
                  padding: '20px'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '16px'
                  }}>📈</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Personalized Dashboard</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Track progress & get recommendations</p>
                </div>
              </div>
            </Card>
            <Card>
              <div style={{
                background: '#1a1a1a',
                borderRadius: '12px',
                border: '1px solid #333',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                <div style={{
                  background: '#2a2a2a',
                  padding: '12px 16px',
                  borderBottom: '1px solid #333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42' }}></div>
                  <span style={{ marginLeft: '12px', color: '#888', fontSize: '0.9rem' }}>✏️ NoteCanvas</span>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  height: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textAlign: 'center',
                  padding: '20px'
                }}>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '16px'
                  }}>✍️</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Handwritten Notes</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Upload & digitize your handwriting</p>
                </div>
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>
      
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000
      }}>
        <Dock 
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>
    </div>
  );
}