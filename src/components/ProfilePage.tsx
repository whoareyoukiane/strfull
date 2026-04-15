import { CSSProperties, FormEvent, useMemo, useState } from 'react';
import { Order, UserAccount } from '../types';

interface ProfilePageProps {
  currentUser: UserAccount | null;
  orders: Order[];
  cartCount: number;
  onLogin: (email: string, password: string) => { ok: boolean; message: string };
  onRegister: (name: string, email: string, password: string) => { ok: boolean; message: string };
  onLogout: () => void;
  onGoToPayment: () => void;
  onGoToCart: () => void;
}

export default function ProfilePage({
  currentUser,
  orders,
  cartCount,
  onLogin,
  onRegister,
  onLogout,
  onGoToPayment,
  onGoToCart,
}: ProfilePageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders.filter(order => order.userEmail === currentUser.email);
  }, [orders, currentUser]);

  const submitAuth = (event: FormEvent) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (mode === 'register') {
      const result = onRegister(trimmedName, trimmedEmail, password);
      setMessage(result.message);
      if (result.ok) {
        setName('');
        setEmail('');
        setPassword('');
      }
      return;
    }

    const result = onLogin(trimmedEmail, password);
    setMessage(result.message);
    if (result.ok) {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <main
      style={{
        maxWidth: 1240,
        margin: '0 auto',
        padding: '24px 24px 60px',
        color: '#ffffff',
      }}
    >
      {currentUser ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: 24,
            alignItems: 'start',
          }}
        >
          <section
            className="glass-card"
            style={{
              borderRadius: 24,
              padding: 24,
            }}
          >
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 20 }}>Профиль</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.04))',
                  border: '1px solid rgba(255,255,255,0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                {currentUser.name[0]?.toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize: 20, fontWeight: 700 }}>{currentUser.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>{currentUser.email}</p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 2 }}>
                  С нами с {new Date(currentUser.joinedAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
              <button
                onClick={onGoToCart}
                className="glass-btn"
                style={{
                  padding: '10px 16px',
                  borderRadius: 12,
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                }}
              >
                Корзина ({cartCount})
              </button>
              <button
                onClick={onGoToPayment}
                className="glass-btn"
                style={{
                  padding: '10px 16px',
                  borderRadius: 12,
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                }}
              >
                К оплате
              </button>
              <button
                onClick={onLogout}
                style={{
                  padding: '10px 16px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.8)',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                }}
              >
                Выйти
              </button>
            </div>

            <h2 style={{ fontSize: 18, marginBottom: 14, fontWeight: 700 }}>История покупок</h2>
            {userOrders.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>У вас пока нет оплаченных заказов.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {userOrders.slice(0, 6).map(order => (
                  <div
                    key={order.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderTop: '1px solid rgba(255,255,255,0.07)',
                      paddingTop: 10,
                    }}
                  >
                    <div>
                      <p style={{ fontWeight: 600 }}>Заказ #{order.id.slice(-6)}</p>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
                        {order.items.length} треков • {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <span style={{ fontWeight: 700 }}>{order.total}₽</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside
            className="glass-card"
            style={{
              borderRadius: 24,
              padding: 24,
            }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>Аккаунт</h3>
            <div style={{ display: 'grid', gap: 10 }}>
              <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 12 }}>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>Почта для чеков</p>
                <p style={{ fontWeight: 600 }}>{currentUser.email}</p>
              </div>
              <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 12 }}>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>Заказов оплачено</p>
                <p style={{ fontWeight: 600 }}>{userOrders.length}</p>
              </div>
              <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 12 }}>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>Товаров в корзине</p>
                <p style={{ fontWeight: 600 }}>{cartCount}</p>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <section
          className="glass-card"
          style={{
            maxWidth: 520,
            margin: '40px auto 0',
            borderRadius: 24,
            padding: 24,
          }}
        >
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Аккаунт</h1>

          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            <button
              onClick={() => setMode('login')}
              style={{
                flex: 1,
                borderRadius: 12,
                padding: '10px 0',
                border: mode === 'login' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.08)',
                background: mode === 'login' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Вход
            </button>
            <button
              onClick={() => setMode('register')}
              style={{
                flex: 1,
                borderRadius: 12,
                padding: '10px 0',
                border: mode === 'register' ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.08)',
                background: mode === 'register' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={submitAuth} style={{ display: 'grid', gap: 10 }}>
            {mode === 'register' && (
              <input
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder="Имя"
                required
                style={inputStyle}
              />
            )}
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="Электронная почта"
              required
              style={inputStyle}
            />
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Пароль"
              required
              minLength={6}
              style={inputStyle}
            />
            <button
              type="submit"
              style={{
                marginTop: 6,
                borderRadius: 12,
                border: 'none',
                padding: '12px 0',
                background: '#ffffff',
                color: '#111',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          </form>

          {message && (
            <p
              style={{
                marginTop: 12,
                fontSize: 14,
                color: message.includes('успешно') ? '#99f6b3' : '#ffb4b4',
              }}
            >
              {message}
            </p>
          )}
        </section>
      )}
    </main>
  );
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.04)',
  color: '#fff',
  outline: 'none',
  fontFamily: 'inherit',
};