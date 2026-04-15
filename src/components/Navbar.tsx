import { useRef, useState } from 'react';
import {
  IconGrid, IconGridActive,
  IconHome, IconHomeActive,
  IconCart, IconCartActive,
  IconUser, IconUserActive,
  IconSearchClose,
} from './Icons';

interface NavbarProps {
  cartCount: number;
  activeTab: string;
  setActiveTab: (t: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function Navbar({ cartCount, activeTab, setActiveTab, searchQuery, setSearchQuery }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const prevTabRef = useRef<string>('home');
  const inputRef = useRef<HTMLInputElement>(null);

  const openSearch = () => {
    prevTabRef.current = activeTab;
    setIsSearchOpen(true);
    setActiveTab('catalog');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setActiveTab(prevTabRef.current);
  };

  const tabs = [
    { id: 'catalog', icon: <IconGrid />, iconActive: <IconGridActive /> },
    { id: 'home',    icon: <IconHome />, iconActive: <IconHomeActive /> },
    { id: 'cart',    icon: <IconCart />, iconActive: <IconCartActive />, badge: cartCount },
    { id: 'profile', icon: <IconUser />, iconActive: <IconUserActive /> },
  ];

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '6px 6px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {isSearchOpen ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: '6px 6px',
          borderRadius: '50px',
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          width: 418,
          boxSizing: 'border-box',
        }}>
          <button
            onClick={closeSearch}
            style={{
              width: 100,
              height: 60,
              borderRadius: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              background: 'transparent',
              flexShrink: 0,
            }}
          >
            <IconSearchClose />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Поиск битов..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontSize: 15,
              fontWeight: 500,
              fontFamily: 'inherit',
              caretColor: '#ffffff',
              height: 60,
              padding: '0 12px 0 4px',
            }}
          />
        </div>
      ) : (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: '6px 6px',
          borderRadius: '50px',
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          {tabs.map(tab => {
            const isActive = tab.id === activeTab;
            const isHovered = hoveredTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'catalog') {
                    openSearch();
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{
                  width: 100,
                  height: 60,
                  borderRadius: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  background: isActive
                    ? 'rgba(255, 255, 255, 0.1)'
                    : isHovered
                      ? 'rgba(255, 255, 255, 0.06)'
                      : 'transparent',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
              >
                {isActive ? tab.iconActive : tab.icon}
                {tab.badge && tab.badge > 0 ? (
                  <span style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    background: '#ffffff',
                    color: '#131313',
                    borderRadius: '50%',
                    width: 15,
                    height: 15,
                    fontSize: 9,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}>
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
