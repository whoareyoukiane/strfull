import { useState } from 'react';
import Navbar from './components/Navbar';
import BeatCard from './components/BeatCard';
import FeaturedCard from './components/FeaturedCard';
import BeatPage from './components/BeatPage';
import CartPage from './components/CartPage';
import Background from './components/Background';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import { beats, defaultLicenses } from './data/beats';
import { Beat, CartItem } from './types';

interface User {
  name: string;
  email: string;
}

function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const addToCart = (id: number, license?: string, licenseType?: string, licensePrice?: number) => {
    const beat = beats.find(b => b.id === id);
    if (!beat) return;
    
    const beatLicenses = beat.licenses || defaultLicenses;
    const selectedLicense = license ? beatLicenses.find(l => l.name === license) : beatLicenses[0];
    const price = licensePrice ?? selectedLicense?.price ?? beat.price;
    
    setCart(prev => {
      const exists = prev.find(item => item.id === id);
      if (exists) return prev;
      
      return [...prev, {
        ...beat,
        license: license || selectedLicense?.name || beatLicenses[0].name,
        licenseType: licenseType || selectedLicense?.type || beatLicenses[0].type,
        cartPrice: price,
      }];
    });
  };
  
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };
  
  const isInCart = (id: number) => cart.some(item => item.id === id);
  
  return { cart, addToCart, removeFromCart, isInCart };
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBeat, setCurrentBeat] = useState<Beat | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [checkoutAmount, setCheckoutAmount] = useState<number | null>(null);
  
  const { cart, addToCart, removeFromCart, isInCart } = useCart();

  const featured = beats.filter(b => b.featured);
  const regular = beats.filter(b => !b.featured);

  const filteredBeats = searchQuery
    ? beats.filter(beat =>
        beat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beat.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : regular;

  const openBeat = (beat: Beat) => {
    setCurrentBeat(beat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    setCurrentBeat(null);
  };

  const handleCheckout = (total: number) => {
    setCheckoutAmount(total);
  };

  const handlePaymentSuccess = () => {
    setCheckoutAmount(null);
    setActiveTab('home');
    // In a real app, clear cart or update user's purchases
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setActiveTab('profile');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#131313' }}>
      <Background />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar
          cartCount={cart.length}
          activeTab={activeTab}
          setActiveTab={handleSetActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {checkoutAmount !== null ? (
          <CheckoutPage 
            totalAmount={checkoutAmount} 
            onBack={() => setCheckoutAmount(null)}
            onSuccess={handlePaymentSuccess}
          />
        ) : currentBeat ? (
          <BeatPage
            beat={currentBeat}
            onAddToCart={addToCart}
            inCart={isInCart(currentBeat.id)}
          />
        ) : activeTab === 'cart' ? (
          <CartPage
            cartItems={cart}
            onRemoveFromCart={removeFromCart}
            onCheckout={handleCheckout}
          />
        ) : activeTab === 'profile' ? (
          user ? (
            <ProfilePage 
              user={user} 
              onLogout={handleLogout} 
              onBack={() => setActiveTab('home')}
            />
          ) : (
            <AuthPage 
              onLogin={handleLogin} 
              onBack={() => setActiveTab('home')}
            />
          )
        ) : (
          <main style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '10px 24px 60px',
          }}>
            {(searchQuery || activeTab === 'catalog') && filteredBeats.length > 0 ? (
              <section>
                <div className="products-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 24,
                }}>
                  {filteredBeats.map(beat => (
                    <BeatCard
                      key={beat.id}
                      beat={beat}
                      onAddToCart={addToCart}
                      inCart={isInCart(beat.id)}
                      onOpenBeat={openBeat}
                    />
                  ))}
                </div>
              </section>
            ) : !searchQuery && activeTab === 'home' && (
              <>
                <section style={{ marginBottom: 24 }}>
                  <div className="featured-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                    gap: 24,
                  }}>
                    {featured.map(beat => (
                      <FeaturedCard
                        key={beat.id}
                        beat={beat}
                        onAddToCart={addToCart}
                        inCart={isInCart(beat.id)}
                        onOpenBeat={openBeat}
                      />
                    ))}
                  </div>
                </section>

                <section>
                  <div className="products-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 24,
                  }}>
                    {regular.map(beat => (
                      <BeatCard
                        key={beat.id}
                        beat={beat}
                        onAddToCart={addToCart}
                        inCart={isInCart(beat.id)}
                        onOpenBeat={openBeat}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </main>
        )}
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: #0a0a0a;
          color: #ffffff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .glass-card {
          background: rgba(28, 28, 28, 0.2);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow: 0 4px 32px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.06);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        .glass-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.2s ease;
        }

        .glass-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .price-old {
          color: rgba(255, 255, 255, 0.4);
          text-decoration: line-through;
        }

        .liquid-shine {
          position: relative;
          overflow: hidden;
        }

        .liquid-shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.03),
            transparent
          );
          transition: left 0.5s ease;
        }

        .liquid-shine:hover::before {
          left: 100%;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(28, 28, 28, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
