import { useState } from 'react';

interface CheckoutPageProps {
  totalAmount: number;
  onBack: () => void;
  onSuccess: () => void;
}

export default function CheckoutPage({ totalAmount, onBack, onSuccess }: CheckoutPageProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2500);
    }, 2000);
  };

  if (success) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '20px'
      }}>
        <div className="glass-card" style={{
          width: '100%',
          maxWidth: '450px',
          padding: '40px',
          borderRadius: '30px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(52, 211, 153, 0.1)',
            border: '2px solid rgba(52, 211, 153, 0.2)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff' }}>Оплата прошла успешно!</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>
            Ваши биты доступны для скачивания в личном кабинете.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
            Перенаправление на главную страницу...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '20px'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '450px',
        padding: '40px',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>Оплата</h2>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '13px', cursor: 'pointer' }}>Отмена</button>
        </div>

        <div style={{
          padding: '20px',
          borderRadius: '20px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>К оплате:</span>
          <span style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>{totalAmount}₽</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginLeft: '4px' }}>Номер карты</label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '14px',
                color: '#fff',
                outline: 'none',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginLeft: '4px' }}>Срок действия</label>
              <input
                type="text"
                placeholder="ММ/ГГ"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '14px',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginLeft: '4px' }}>CVC</label>
              <input
                type="password"
                placeholder="•••"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '14px',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="glass-btn"
          style={{
            marginTop: '12px',
            padding: '18px',
            borderRadius: '15px',
            color: '#000',
            fontWeight: 800,
            fontSize: '16px',
            background: '#fff',
            border: 'none',
            cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: '18px',
                height: '18px',
                border: '2px solid rgba(0,0,0,0.1)',
                borderTop: '2px solid #000',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Обработка...
            </>
          ) : (
            `Оплатить ${totalAmount}₽`
          )}
        </button>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '10px'
        }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" height="15" alt="Visa" style={{ opacity: 0.3 }} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" height="15" alt="Mastercard" style={{ opacity: 0.3 }} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Mir-logo.svg/1280px-Mir-logo.svg.png" height="15" alt="Mir" style={{ opacity: 0.3 }} />
        </div>
      </div>
    </div>
  );
}
