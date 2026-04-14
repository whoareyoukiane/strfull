import { useState } from 'react';
import { Beat } from '../types';
import { licenses } from '../data/beats';

interface BeatPageProps {
  beat: Beat;
  onBack: () => void;
  onAddToCart: (id: number, license?: string, licenseType?: string) => void;
  inCart: boolean;
}

export default function BeatPage({ beat, onBack, onAddToCart, inCart }: BeatPageProps) {
  const [selectedLicense, setSelectedLicense] = useState(0);

  const lic = licenses[selectedLicense];
  
  return (
    <main style={{
      maxWidth: 1400,
      margin: '0 auto',
      padding: '20px 40px 60px',
      color: '#ffffff',
    }}>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 14,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 20,
          padding: 0,
          fontFamily: 'inherit',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '470px 1fr 260px',
        gap: '40px',
        alignItems: 'start',
      }}>
        <div>
          <div style={{
            width: '100%',
            borderRadius: 16,
            overflow: 'hidden',
            aspectRatio: '1 / 0.9',
            marginBottom: 20,
          }}>
            <img
              src={beat.image}
              alt={beat.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 14,
              marginBottom: 10,
              fontWeight: 500,
            }}>
              Теги
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['#cupsize', '#rock', '#madk1d', '#grunge', '#рэйчи', '#alt rock', '#alternative rock', '#punk rock'].map(tag => (
                <span
                  key={tag}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 20,
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.8)',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.04)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            color: 'rgba(255,255,255,0.7)',
            fontSize: 13,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="18" height="13" viewBox="0 0 20 14" fill="none">
                <path d="M10 1C5 1 1 7 1 7C1 7 5 13 10 13C15 13 19 7 19 7C19 7 15 1 10 1Z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
                <circle cx="10" cy="7" r="3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
              </svg>
              <span>13,2K</span>
            </div>
            <span style={{ margin: '0 14px', color: 'rgba(255,255,255,0.25)' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M8 12L12 16L16 12" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 4V16" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4 20H20" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>7628</span>
            </div>
            <span style={{ margin: '0 14px', color: 'rgba(255,255,255,0.25)' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="18" height="16" viewBox="0 0 24 22" fill="none">
                <path d="M12 20C12 20 3 14 3 8C3 5.24 5.24 3 8 3C9.69 3 11.19 3.81 12 5.08C12.81 3.81 14.31 3 16 3C18.76 3 21 5.24 21 8C21 14 12 20 12 20Z" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
              <span>426</span>
            </div>
            <span style={{ margin: '0 14px', color: 'rgba(255,255,255,0.25)' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="18" cy="5" r="3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
                <circle cx="6" cy="12" r="3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
                <circle cx="18" cy="19" r="3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
                <path d="M8.59 13.51L15.42 17.49" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
                <path d="M15.41 6.51L8.59 10.49" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
              </svg>
              <span>Поделиться</span>
            </div>
          </div>
        </div>

        <div>
          <h1 style={{
            fontSize: 36,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: 28,
            textTransform: 'uppercase',
          }}>
            {beat.title}
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Лицензия
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 6,
            marginBottom: 32,
          }}>
            {licenses.map((l, i) => (
              <button
                key={l.name}
                onClick={() => setSelectedLicense(i)}
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: selectedLicense === i
                    ? '1px solid rgba(255,255,255,0.3)'
                    : '1px solid rgba(255,255,255,0.08)',
                  background: selectedLicense === i
                    ? 'rgba(255,255,255,0.12)'
                    : 'rgba(255,255,255,0.04)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{l.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>{l.price}₽</div>
              </button>
            ))}
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 14,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            О лицензии
          </p>
          <div style={{ marginBottom: 32 }}>
            {[
              { label: 'Тип', value: lic.type },
              { label: 'Срок', value: lic.term },
              { label: 'Файлы', value: lic.files },
              { label: 'Выпуск копий', value: lic.copies },
              { label: 'Платные прослушивания', value: lic.streams },
            ].map(row => (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{row.label}</span>
                <span style={{ color: '#ffffff', fontSize: 14 }}>{row.value}</span>
              </div>
            ))}
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 14,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            О товаре
          </p>
          <div>
            {[
              { label: 'BPM', value: '113' },
              { label: 'Жанры', value: 'Rock, Alternative Rock, Pop Rock' },
              { label: 'Тональность', value: 'F Major' },
              { label: 'Дата добавления', value: '24.03.2026' },
            ].map(row => (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{row.label}</span>
                <span style={{ color: '#ffffff', fontSize: 14 }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 14,
          }}>
            {lic.price}₽
          </p>

          <button
            onClick={() => onAddToCart(beat.id, lic.name, lic.type)}
            style={{
              width: '100%',
              padding: '14px 0',
              borderRadius: 12,
              background: inCart ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: inCart ? 'rgba(255,255,255,0.5)' : '#ffffff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: 10,
              fontFamily: 'inherit',
              transition: 'all 0.15s',
            }}
          >
            {inCart ? '✓ В корзине' : 'Добавить в корзину'}
          </button>

          <button
            style={{
              width: '100%',
              padding: '14px 0',
              borderRadius: 12,
              background: '#ffffff',
              border: 'none',
              color: '#111111',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: 24,
              fontFamily: 'inherit',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Купить сейчас
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 14px',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #555, #222)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 700,
              color: '#fff',
            }}>
              {beat.artist[0].toUpperCase()}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 1 }}>
                {beat.artist}
              </p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                {beat.subscribe} подписчиков
              </p>
            </div>

            <button style={{
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#ffffff',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              Подписаться
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
