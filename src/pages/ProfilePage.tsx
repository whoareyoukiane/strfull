import { useState } from 'react';

interface User {
  name: string;
  email: string;
}

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
  onBack: () => void;
}

export default function ProfilePage({ user, onLogout, onBack }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('purchased');

  return (
    <main style={{
      maxWidth: 1400,
      margin: '0 auto',
      padding: '20px 40px 60px',
      color: '#ffffff',
    }}>
      {/* Header withlogout */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <button
          onClick={onLogout}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.7)',
            fontSize: 13,
            fontWeight: 600,
            padding: '10px 20px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.2s ease'
          }}
        >
          Выйти из аккаунта
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '40px'
      }}>
        {/* Profile Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-card" style={{ padding: '30px', borderRadius: '25px', textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              border: '2px solid rgba(255,255,255,0.1)',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 800
            }}>
              {user.name[0].toUpperCase()}
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>{user.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>{user.email}</p>
          </div>

          <div className="glass-card" style={{ padding: '15px', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <button
              onClick={() => setActiveTab('purchased')}
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '12px',
                background: activeTab === 'purchased' ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none',
                color: activeTab === 'purchased' ? '#fff' : 'rgba(255,255,255,0.5)',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Купленные биты
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div>
          <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '30px' }}>
            {activeTab === 'purchased' ? 'Ваши покупки' : 'Список избранного'}
          </h3>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            minHeight: '400px',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '30px',
            border: '2px dashed rgba(255,255,255,0.05)'
          }}>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '15px' }}>
              {activeTab === 'purchased'
                ? 'Вы еще не купили ни одного бита.'
                : 'Ваш список избранного пока пуст.'}
            </p>
            <button
              onClick={onBack}
              className="glass-btn"
              style={{
                padding: '12px 25px',
                borderRadius: '15px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                marginTop: '10px'
              }}
            >
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
