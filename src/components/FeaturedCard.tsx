import { Beat } from '../types';

interface FeaturedCardProps {
  beat: Beat;
  onAddToCart: (id: number) => void;
  inCart: boolean;
  onOpenBeat: (beat: Beat) => void;
}

export default function FeaturedCard({ beat, onAddToCart, inCart, onOpenBeat }: FeaturedCardProps) {
  return (
    <div
      className="glass-card liquid-shine"
      style={{
        borderRadius: 30,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        minHeight: 210,
        height: 280,
      }}
    >
      {/* Image */}
      <div
        onClick={() => onOpenBeat(beat)}
        style={{
          width: '42%',
          borderRadius: 30,
          minWidth: 160,
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <img
          src={beat.image}
          alt={beat.title}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 30,
            objectFit: 'cover',
            display: 'block',
            filter: 'brightness(0.85)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, transparent 60%, rgba(20,20,20,0.7) 100%)',
        }} />
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '20px 25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <p
            onClick={() => onOpenBeat(beat)}
            style={{
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1.4,
              marginBottom: 6,
              letterSpacing: '-0.01em',
              cursor: 'pointer',
            }}
          >
            {beat.title}
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 13,
            marginBottom: 18,
          }}>
            {beat.artist}
          </p>
        </div>

        <div>
          <button
            onClick={() => onAddToCart(beat.id)}
            className="glass-btn"
            style={{
              width: '100%',
              padding: '10px 0',
              borderRadius: 15,
              color: inCart ? 'rgba(255,255,255,0.5)' : '#ffffff',
              fontSize: 14,
              fontWeight: 600,
              border: 'none',
              outline: 'none',
              marginBottom: 10,
              letterSpacing: '0.01em',
            }}
          >
            {inCart ? '✓ В корзине' : 'В корзину'}
          </button>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{
              color: '#ffffff',
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}>
              {beat.price}₽
            </span>
            {beat.oldPrice && (
              <span className="price-old" style={{ fontSize: 16, fontWeight: 600 }}>
                {beat.oldPrice}₽
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
