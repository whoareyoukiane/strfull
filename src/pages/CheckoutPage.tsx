import { useState } from 'react';

interface CheckoutPageProps {
  totalAmount: number;
  onBack: () => void;
  onSuccess: () => void;
}

export default function CheckoutPage({ totalAmount, onBack, onSuccess }: CheckoutPageProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(val.substring(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 3) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setExpiry(val.substring(0, 5));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value.replace(/\D/g, '').substring(0, 3));
  };

  const isFormValid = cardNumber.length === 19 && expiry.length === 5 && cvc.length === 3;

  const handlePay = () => {
    if (!isFormValid) return;
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

  const inputStyle = (id: string) => ({
    background: 'rgba(255,255,255,0.03)',
    border: focusedInput === id ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '16px',
    color: '#fff',
    outline: 'none',
    fontSize: '15px',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    boxShadow: focusedInput === id ? '0 0 0 3px rgba(255,255,255,0.05)' : 'none',
  });

  if (success) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '450px',
          padding: '50px 40px',
          borderRadius: '30px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          background: 'rgba(28, 28, 28, 0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
        }}>
          <div style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            background: 'rgba(52, 211, 153, 0.1)',
            border: '2px solid rgba(52, 211, 153, 0.2)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 40px rgba(52, 211, 153, 0.2)'
          }}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                style={{ strokeDasharray: 24, strokeDashoffset: 24, animation: 'draw 0.5s ease 0.3s forwards' }} 
              />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Оплата прошла успешно!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.5, marginBottom: '24px' }}>
              Чек отправлен вам на почту. Биты теперь доступны для скачивания в вашем профиле.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', animation: 'spin 1s linear infinite' }} />
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 500 }}>
                Возвращаемся на главную...
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes scaleIn { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
          @keyframes draw { to { stroke-dashoffset: 0; } }
        `}</style>
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
      <div style={{
        width: '100%',
        maxWidth: '450px',
        padding: '36px',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        background: 'rgba(28, 28, 28, 0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '36px', height: '36px', borderRadius: '12px', 
              background: 'rgba(255,255,255,0.1)', display: 'flex', 
              alignItems: 'center', justifyContent: 'center' 
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="#fff" strokeWidth="2"/>
                <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>Оплата</h2>
          </div>
          <button 
            onClick={onBack} 
            disabled={loading}
            style={{ 
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', 
              fontSize: '14px', fontWeight: 600, cursor: loading ? 'default' : 'pointer',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => !loading && (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => !loading && (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            Отмена
          </button>
        </div>

        <div style={{
          padding: '20px 24px',
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', fontWeight: 500 }}>К оплате</span>
          <span style={{ fontSize: '28px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>{totalAmount}₽</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 500, marginLeft: '4px' }}>Номер карты</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                value={cardNumber}
                onChange={handleCardChange}
                onFocus={() => setFocusedInput('card')}
                onBlur={() => setFocusedInput(null)}
                disabled={loading}
                style={{
                  ...inputStyle('card'),
                  width: '100%',
                  paddingLeft: '44px',
                  boxSizing: 'border-box'
                }}
              />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', left: '14px', top: '16px', opacity: 0.4 }}>
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="#fff" strokeWidth="2"/>
                <path d="M2 10H22" stroke="#fff" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 500, marginLeft: '4px' }}>Срок действия</label>
              <input
                type="text"
                placeholder="ММ/ГГ"
                value={expiry}
                onChange={handleExpiryChange}
                onFocus={() => setFocusedInput('expiry')}
                onBlur={() => setFocusedInput(null)}
                disabled={loading}
                style={{ ...inputStyle('expiry'), width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 500, marginLeft: '4px' }}>CVC</label>
              <input
                type="password"
                placeholder="•••"
                value={cvc}
                onChange={handleCvcChange}
                onFocus={() => setFocusedInput('cvc')}
                onBlur={() => setFocusedInput(null)}
                disabled={loading}
                style={{ ...inputStyle('cvc'), width: '100%', boxSizing: 'border-box', letterSpacing: '2px' }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={loading || !isFormValid}
          style={{
            marginTop: '8px',
            padding: '18px',
            borderRadius: '16px',
            color: loading || !isFormValid ? 'rgba(255,255,255,0.4)' : '#111',
            fontWeight: 700,
            fontSize: '16px',
            background: loading || !isFormValid ? 'rgba(255,255,255,0.1)' : '#fff',
            border: 'none',
            cursor: loading || !isFormValid ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'all 0.2s ease',
            fontFamily: 'inherit'
          }}
          onMouseEnter={e => {
            if (!loading && isFormValid) e.currentTarget.style.opacity = '0.9';
          }}
          onMouseLeave={e => {
            if (!loading && isFormValid) e.currentTarget.style.opacity = '1';
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: '18px',
                height: '18px',
                border: '2px solid rgba(255,255,255,0.1)',
                borderTop: '2px solid rgba(255,255,255,0.6)',
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
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px',
          marginTop: '12px',
          opacity: 0.3
        }}>
          {/* T Logo */}
          
<svg width="55" height="15" viewBox="0 0 55 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 -0.000100683H5.159C5.6265 -0.000100683 7.0345 -0.153947 7.6615 2.03287C8.129 3.43946 8.756 5.62627 9.6965 8.90649H10.01C10.945 5.46693 11.726 3.12627 12.0395 2.03287C12.6665 -0.153947 14.2285 -0.000100683 14.8555 -0.000100683H19.701V14.9999H14.696V6.0988H14.3825L11.726 14.9999H7.975L5.3185 6.0988H4.851V14.9999H0M21.736 -0.000100683H26.741V8.901H27.2085L30.492 1.56034C31.119 0.153745 32.527 -0.000100683 32.527 -0.000100683H37.2185V14.9999H32.2135V6.0988H31.9L28.6165 13.4395C27.9895 14.8461 26.4275 14.9999 26.4275 14.9999H21.736M43.9395 10.4669V14.9999H39.248V7.18671H54.571C53.944 9.06034 51.755 10.4669 49.2525 10.4669" fill="white"/>
<path d="M54.8845 6.25265C55.506 3.43946 53.6305 -0.000100683 49.566 -0.000100683H38.9345C39.248 3.28012 42.064 6.24715 45.034 6.24715" fill="white"/>
</svg>
          
          {/* Mastercard Logo */}   
          <svg width="23" height="20" viewBox="0 0 33 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8.70667L4.92954 17.365V22.6463L0.00576674 31.2877L0 8.70667Z" fill="#444444"/>
<path d="M18.9275 14.2143L23.5466 11.4323L33 11.4237L18.9275 19.895V14.2143Z" fill="#bbbbbb"/>
<path d="M18.9013 8.65567L18.9275 20.119L13.9864 17.1357V0L18.9013 8.65567Z" fill="#ffffff"/>
<path d="M33 11.4237L23.5466 11.4323L18.9013 8.65567L13.9864 0L33 11.4237Z" fill="#dddddd"/>
<path d="M18.9275 31.3357V25.774L13.9864 22.8473L13.9891 40L18.9275 31.3357Z" fill="#999999"/>
<path d="M23.5351 28.579L4.92954 17.365L0 8.70667L32.98 28.5677L23.5351 28.579Z" fill="#888888"/>
<path d="M13.9894 40L18.9275 31.3357L23.5351 28.579L32.98 28.5677L13.9894 40Z" fill="#777777"/>
<path d="M0.00576674 31.2877L14.0267 22.8477L9.31295 20.0057L4.92954 22.6463L0.00576674 31.2877Z" fill="#666666"/>
</svg>    
        </div>
      </div>
    </div>
  );
}
