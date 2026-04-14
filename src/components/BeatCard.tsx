import { Beat } from '../types';

interface BeatCardProps {
  beat: Beat;
  onAddToCart: (id: number) => void;
  inCart: boolean;
  onOpenBeat: (beat: Beat) => void;
}

export default function BeatCard({ beat, onAddToCart, inCart, onOpenBeat }: BeatCardProps) {
  return (
    <div
      className="glass-card liquid-shine"
      style={{
        borderRadius: 30,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Image */}
      <div
        onClick={() => onOpenBeat(beat)}
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          borderRadius: 30,
          position: 'relative',
          flexShrink: 0,
          cursor: 'pointer',
        }}
      >
        <img
          src={beat.image}
          alt={beat.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            borderRadius: 30,
            filter: 'brightness(0.88)',
            transition: 'transform 0.35s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
        }} />
      </div>

      {/* Info */}
      <div style={{
        padding: '15px 15px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        
      }}>
        <span style={{
          color: '#ffffff',
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: '-0.02em',
        }}>
          {beat.price}₽
        </span>

        <p
          onClick={() => onOpenBeat(beat)}
          style={{
            color: '#ffffff',
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.35,
            overflow: 'hidden',
            maxHeight: '2.7em',
            cursor: 'pointer',
          }}
        >
          {beat.title}
        </p>

        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: 12,
          marginBottom: 10,
        }}>
          {beat.artist}
        </p>

        <button
          onClick={() => onAddToCart(beat.id)}
          className="glass-btn"
          style={{
            width: '100%',
            padding: '9px 0',
            borderRadius: 15,
            color: inCart ? 'rgba(255,255,255,0.5)' : '#ffffff',
            fontSize: 13,
            fontWeight: 600,
            border: 'none',
            outline: 'none',
            marginTop: 'auto',
          }}
        >
          {inCart ? '✓ В корзине' : 'В корзину'}
        </button>
      </div>
    </div>
  );
}
