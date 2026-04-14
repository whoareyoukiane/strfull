import { useState } from 'react';
import { CartItem, CheckoutData } from '../types';
import { IconTrash, IconCheck } from './Icons';

function SbpIcon() {
  return (
<svg width="23" height="30" viewBox="0 0 33 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8.70667L4.92954 17.365V22.6463L0.00576674 31.2877L0 8.70667Z" fill="#5B57A2"/>
<path d="M18.9275 14.2143L23.5466 11.4323L33 11.4237L18.9275 19.895V14.2143Z" fill="#D90751"/>
<path d="M18.9013 8.65567L18.9275 20.119L13.9864 17.1357V0L18.9013 8.65567Z" fill="#FAB718"/>
<path d="M33 11.4237L23.5466 11.4323L18.9013 8.65567L13.9864 0L33 11.4237Z" fill="#ED6F26"/>
<path d="M18.9275 31.3357V25.774L13.9864 22.8473L13.9891 40L18.9275 31.3357Z" fill="#63B22F"/>
<path d="M23.5351 28.579L4.92954 17.365L0 8.70667L32.98 28.5677L23.5351 28.579Z" fill="#1487C9"/>
<path d="M13.9894 40L18.9275 31.3357L23.5351 28.579L32.98 28.5677L13.9894 40Z" fill="#017F36"/>
<path d="M0.00576674 31.2877L14.0267 22.8477L9.31295 20.0057L4.92954 22.6463L0.00576674 31.2877Z" fill="#984995"/>
</svg>
  );
}

function TinkoffIcon() {
  return (
<svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H40V20.1171C40 25.2742 37.2488 30.0397 32.7829 32.6186L20 40L7.21719 32.6186C2.75114 30.0397 4.58451e-06 25.2742 4.58451e-06 20.1171L0 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0345 12.4138V18.7014C11.8847 17.7303 13.4306 17.0732 15.1981 17.0732H17.1188V24.3824C17.1188 26.3271 16.5963 28.0292 15.8211 28.9655H24.176C23.4023 28.0282 22.8811 26.3284 22.8811 24.3862V17.0732H24.8019C26.5694 17.0732 28.1153 17.7303 28.9655 18.7014V12.4138H11.0345Z" fill="#333333"/>
</svg>
  );
}

function AlphaIcon() {
  return (  
<svg width="16" height="30" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 34.5387H0V40H26V34.5387Z" fill="white"/>
<path d="M17.7594 4.00074C17.0186 1.76531 16.1638 0 13.2355 0C10.3072 0 9.3991 1.75787 8.61785 4.00074L0.57373 27.1188H5.90829L7.76491 21.6222H18.0296L19.752 27.1188H25.4248L17.7576 4.00074H17.7594ZM9.32005 16.9804L12.9671 6.02434H13.1013L16.5462 16.9804H9.32005Z" fill="white"/>
</svg>
  );
}

function CardIcon() {
  return (
<svg width="45" height="30" viewBox="0 0 65 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.5524 0L10.9121 10.0017H61.3596L65 0H14.5524ZM9.09073 15.0003L5.45035 24.9997H55.8979L59.5383 15.0003H9.09073ZM3.64038 30.0006L0 40H50.4476L54.0857 30.0006H3.64038Z" fill="#00AAFF"/>
</svg>
  );
}

interface CartPageProps {
  cartItems: CartItem[];
  onRemoveFromCart: (id: number) => void;
  onCheckout: (payload: CheckoutData) => void;
  defaultEmail?: string;
}

export default function CartPage({ cartItems, onRemoveFromCart, onCheckout, defaultEmail = '' }: CartPageProps) {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set(cartItems.map(item => item.id)));
  const [email, setEmail] = useState(defaultEmail);

  const toggleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    }
  };

  const toggleItem = (id: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const selectedCartItems = cartItems.filter(item => selectedItems.has(item.id));
  const totalPrice = selectedCartItems.reduce((sum, item) => sum + item.price, 0);

  const paymentMethods = [
    { id: 'sbp', name: 'СБП', color: '#ffffff', icon: <SbpIcon /> },
    { id: 'tinkoff', name: 'Tinkoff', color: '#FFDD2D', icon: <TinkoffIcon /> },
    { id: 'alpha', name: 'Alpha', color: '#EF3124', icon: <AlphaIcon /> },
    { id: 'card', name: 'Карта', color: '#102D71', icon: <CardIcon /> },
  ];

  const [selectedPayment, setSelectedPayment] = useState('sbp');

  if (cartItems.length === 0) {
    return (
      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px',
        color: '#ffffff',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            margin: '0 auto 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Корзина пуста</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Добавьте биты, чтобы оформить заказ</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{
      maxWidth: 1400,
      margin: '0 auto',
      padding: '24px 24px 60px',
      color: '#ffffff',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 380px',
        gap: '24px',
        alignItems: 'start',
      }}>
        {/* Left column - Cart items */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.07)',
          padding: '24px',
        }}>
          {/* Select all */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}>
            <button
              onClick={toggleSelectAll}
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                border: '1px solid rgba(255,255,255,0.2)',
                background: selectedItems.size === cartItems.length ? 'rgba(255,255,255,0.1)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              {selectedItems.size === cartItems.length && <IconCheck />}
            </button>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Выбрать все</span>
          </div>

          {/* Cart items list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cartItems.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 16,
                  border: selectedItems.has(item.id) ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleItem(item.id)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: selectedItems.has(item.id) ? 'rgba(255,255,255,0.1)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 0,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {selectedItems.has(item.id) && <IconCheck />}
                </button>

                {/* Image */}
                <div style={{
                  width: 88,
                  height: 88,
                  borderRadius: 12,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    fontSize: 15,
                    fontWeight: 700,
                    lineHeight: 1.4,
                    marginBottom: 8,
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  }}>
                    <p style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 500,
                    }}>
                      Лицензия
                    </p>
                    <p style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.5)',
                    }}>
                      {item.license}
                    </p>
                  </div>
                </div>

                {/* Price & Delete */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 8,
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}>
                    <span style={{
                      fontSize: 16,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                    }}>
                      {item.price}₽
                    </span>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        border: 'none',
                        background: 'rgba(255,107,107,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,107,107,0.2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,107,107,0.1)'}
                    >
                      <IconTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column - Summary */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.07)',
          padding: '24px',
          position: 'sticky',
          top: 100,
        }}>
          {/* Items count */}
          <p style={{
            fontSize: 15,
            fontWeight: 700,
            marginBottom: 20,
          }}>
            {selectedCartItems.length} {selectedCartItems.length === 1 ? 'товар' : selectedCartItems.length < 5 ? 'товара' : 'товаров'}
          </p>

          {/* Selected items preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {selectedCartItems.slice(0, 3).map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: 12,
                }}
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 10,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.5)',
                    marginTop: 2,
                  }}>
                    Лицензия
                  </p>
                  <p style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.4)',
                  }}>
                    {item.license}
                  </p>
                </div>
                <span style={{
                  fontSize: 14,
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {item.price}₽
                </span>
              </div>
            ))}
          </div>

          {/* Payment methods */}
          <p style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 12,
          }}>
            Способ оплаты
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
            marginBottom: 16,
          }}>
            {paymentMethods.map(method => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                style={{
                  height: 64,
                  borderRadius: 12,
                  border: selectedPayment === method.id ? '2px solid rgba(255,255,255,0.3)' : '2px solid transparent',
                  background: method.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  if (selectedPayment !== method.id) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {method.icon}
              </button>
            ))}
          </div>

          {/* Email input */}
          <div style={{ marginBottom: 20 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Электронная почта"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 500,
                outline: 'none',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'}
              onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
            />
          </div>

          {/* Total */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <span style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}>
              {totalPrice}₽
            </span>
            <span style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'line-through',
            }}>
              -0₽
            </span>
          </div>

          {/* Checkout button */}
          <button
            onClick={() =>
              onCheckout({
                items: selectedCartItems,
                email,
                paymentMethod: selectedPayment,
                total: totalPrice,
              })
            }
            disabled={selectedItems.size === 0 || !/^\S+@\S+\.\S+$/.test(email)}
            style={{
              width: '100%',
              padding: '16px 0',
              borderRadius: 12,
              background: selectedItems.size === 0 || !/^\S+@\S+\.\S+$/.test(email) ? 'rgba(255,255,255,0.2)' : '#ffffff',
              border: 'none',
              color: selectedItems.size === 0 || !/^\S+@\S+\.\S+$/.test(email) ? 'rgba(255,255,255,0.4)' : '#111111',
              fontSize: 15,
              fontWeight: 700,
              cursor: selectedItems.size === 0 || !/^\S+@\S+\.\S+$/.test(email) ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (selectedItems.size > 0 && /^\S+@\S+\.\S+$/.test(email)) {
                e.currentTarget.style.opacity = '0.88';
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Оплатить
          </button>
        </div>
      </div>
    </main>
  );
}
