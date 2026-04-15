import { useState } from 'react';
import { Beat } from '../types';
import { defaultLicenses } from '../data/beats';

interface BeatPageProps {
  beat: Beat;
  onAddToCart: (id: number, license?: string, licenseType?: string, licensePrice?: number) => void;
  inCart: boolean;
}

export default function BeatPage({ beat, onAddToCart, inCart }: BeatPageProps) {
  const [selectedLicense, setSelectedLicense] = useState(0);

  const beatLicenses = beat.licenses || defaultLicenses;
  const lic = beatLicenses[selectedLicense];

  const beatTags = beat.tags || ['#beat'];
  const beatViews = beat.views || '0';
  const beatDownloads = beat.downloads || '0';
  const beatLikes = beat.likes || '0';
  const beatBpm = beat.bpm || '—';
  const beatGenres = beat.genres || '—';
  const beatKey = beat.key || '—';
  const beatDate = beat.dateAdded || '—';
  
  return (
    <main style={{
      maxWidth: 1400,
      margin: '0 auto',
      padding: '20px 40px 60px',
      color: '#ffffff',
    }}>
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
              {beatTags.map(tag => (
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
                    backdropFilter: 'blur(3px)'
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
<svg width="20" height="14" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M37.7143 12C37.7143 11.0668 37.5507 10.568 37.2969 10.1566C36.9987 9.67353 36.5332 9.22852 35.6953 8.44922C35.1104 7.90518 34.4493 7.34699 33.7098 6.80039C31.7261 5.33408 29.1773 3.94946 26.0145 3.13828C25.6735 3.05082 25.3246 2.97283 24.9688 2.89922C25.414 3.19819 25.8353 3.52962 26.2277 3.89297C26.701 4.33135 26.7468 5.09046 26.3292 5.5875C25.9117 6.08442 25.1887 6.13132 24.7154 5.69297C23.6506 4.70698 22.3228 4.00617 20.8192 3.72773C16.468 2.92215 12.3188 5.9724 11.5513 10.541C10.7841 15.1097 13.6891 19.4665 18.0402 20.2723C22.3914 21.0779 26.5407 18.0277 27.308 13.459C27.4176 12.8065 28.0103 12.3704 28.6317 12.4852C29.2531 12.6002 29.6685 13.2225 29.5592 13.875C29.0384 16.9759 27.3047 19.5312 24.9621 21.102C29.8523 20.0916 33.3753 17.7084 35.6953 15.5508C36.5332 14.7715 36.9987 14.3265 37.2969 13.8434C37.5507 13.432 37.7143 12.9332 37.7143 12ZM2.28571 12C2.28571 12.9332 2.44929 13.432 2.70313 13.8434C3.00132 14.3265 3.46682 14.7715 4.30469 15.5508C6.34011 17.4438 9.30182 19.5106 13.3002 20.6719C10.2754 18.3109 8.60128 14.2878 9.30022 10.125C9.77618 7.29073 11.2657 4.91235 13.3069 3.32461C9.30493 4.48548 6.3413 6.555 4.30469 8.44922C3.46681 9.22852 3.00133 9.67354 2.70313 10.1566C2.4493 10.568 2.28571 11.0668 2.28571 12ZM40 12C40 13.2799 39.7628 14.2605 39.2154 15.1477C38.7123 15.963 37.9755 16.6362 37.2109 17.3473C33.8517 20.4715 28.2253 24 20 24C11.7747 24 6.14828 20.4715 2.78906 17.3473C2.02449 16.6361 1.28772 15.963 0.784598 15.1477C0.237229 14.2605 0 13.2798 0 12C0 10.7202 0.237222 9.73953 0.784598 8.85234C1.28773 8.03701 2.02449 7.36385 2.78906 6.65273C6.14829 3.52838 11.7747 0 20 0C22.3999 0 24.5833 0.301227 26.5569 0.807422C30.0327 1.6989 32.8404 3.22218 35.0257 4.8375C35.8396 5.43912 36.567 6.05384 37.2109 6.65273C37.9755 7.36384 38.7123 8.03703 39.2154 8.85234C39.7628 9.73952 40 10.7201 40 12Z" fill="rgba(255,255,255,0.6)"/>
</svg>
              <span>{beatViews}</span>
            </div>
            <span style={{ margin: '0 14px', color: 'rgba(255,255,255,0.25)' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>        
<svg width="15" height="14" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.9679 7.96239C21.6457 7.85854 22.2802 8.31607 22.3857 8.98336C22.5982 10.3281 22.6017 11.575 22.5506 12.5132C23.0189 12.6978 23.4573 12.9689 23.8398 13.3455C24.952 14.4407 25.1746 15.9924 24.884 17.4234C24.5913 18.8646 23.7619 20.3385 22.5215 21.5598C21.2812 22.7809 19.7852 23.5977 18.3216 23.886C16.8682 24.1722 15.2924 23.9518 14.1799 22.8566C13.0676 21.7614 12.8439 20.2098 13.1345 18.7787C13.4273 17.3375 14.2566 15.8636 15.497 14.6423C16.7373 13.4212 18.2334 12.6044 19.6969 12.3161C19.8225 12.2914 19.9495 12.2722 20.0765 12.2552C20.1135 11.4546 20.1024 10.4351 19.9322 9.35831C19.8271 8.69128 20.2905 8.06629 20.9679 7.96239ZM11.1819 0C13.3496 0 15.1563 0.365435 16.6504 1.01739C17.2773 1.29096 17.561 2.01335 17.2835 2.63064C17.0056 3.24804 16.2708 3.52762 15.6438 3.25397C14.5194 2.76335 13.0659 2.44556 11.1819 2.44556H7.45138C4.70807 2.4456 2.48404 4.63558 2.48379 7.33667V20.1758C2.48395 20.851 3.03995 21.3986 3.72569 21.3986H7.4526C8.13821 21.3983 8.69449 20.851 8.69449 20.1758V16.8693C8.69449 16.1942 8.13821 15.6469 7.4526 15.6465H2.48258V13.201H7.4526C9.50997 13.2013 11.1783 14.8435 11.1783 16.8693V20.1758C11.1783 22.2016 9.50997 23.8439 7.4526 23.8442H3.72569C1.66854 23.8441 0.000665226 22.2025 0 20.177V7.33547C0.000663193 3.28407 3.33658 4.28505e-05 7.45138 0H11.1819ZM22.0825 15.0746C21.7399 14.7376 21.1143 14.532 20.1845 14.7151C19.2646 14.8963 18.1951 15.444 17.2532 16.3714C16.3112 17.2988 15.7539 18.3519 15.5698 19.2576C15.3838 20.1734 15.5935 20.7903 15.9361 21.1276C16.2786 21.4647 16.9042 21.67 17.8341 21.487C18.7539 21.3058 19.8234 20.7581 20.7654 19.8307C21.7073 18.9033 22.2647 17.8503 22.4487 16.9445C22.6348 16.0287 22.425 15.4118 22.0825 15.0746Z" fill="rgba(255,255,255,0.6)"/>
</svg>
              <span>{beatDownloads}</span>
            </div>
            <span style={{ margin: '0 14px', color: 'rgba(255,255,255,0.25)' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
             
<svg width="20" height="14" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3235 2.87933C15.6314 0.527932 18.1916 -0.742207 20.1963 0.462044L28.3994 5.39025C30.2184 6.48329 30.5488 9.02625 29.0715 10.5645L22.8574 17.0355C22.3742 17.5385 21.5816 17.547 21.0882 17.0544C20.5952 16.5618 20.5867 15.7546 21.0696 15.2516L27.2847 8.78063C27.6256 8.42562 27.5492 7.83863 27.1294 7.58642L18.9263 2.65922C18.4637 2.38131 17.8729 2.67434 17.8019 3.21698L16.8621 10.3902C16.4099 13.843 11.5115 13.843 11.0593 10.3902L10.8014 8.42605C10.4065 5.41127 7.12434 3.78271 4.55403 5.3265C2.22131 6.7278 1.79717 9.98949 3.69142 11.9618L11.9951 20.6081C13.0739 21.7311 14.8475 21.7311 15.9262 20.6081L17.0682 19.4179C17.5514 18.9148 18.344 18.9064 18.8374 19.399C19.3306 19.8915 19.3387 20.6986 18.856 21.2017L17.713 22.3919C15.6535 24.536 12.2679 24.536 10.2084 22.3919L1.90465 13.7457C-1.12595 10.5901 -0.447882 5.37245 3.28405 3.13032C7.39648 0.659938 12.649 3.26477 13.2807 8.08841L13.5377 10.0525C13.5606 10.2276 13.6247 10.3003 13.6715 10.3384C13.7334 10.3887 13.8345 10.43 13.9607 10.43C14.0868 10.43 14.1879 10.3887 14.2498 10.3384C14.2966 10.3003 14.3607 10.2276 14.3837 10.0525L15.3235 2.87933Z" fill="rgba(255,255,255,0.6)"/>
</svg>
              <span>{beatLikes}</span>
            </div>
            <span style={{ margin: '0 14px', color: 'rgba(255,255,255,0.25)' }}>|</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              
<svg width="14" height="14" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.1905 20.3077C17.1905 19.2881 16.3803 18.4615 15.381 18.4615C14.8451 18.4615 14.3644 18.6981 14.0318 19.0772C13.7448 19.4044 13.5714 19.8343 13.5714 20.3077C13.5714 21.3273 14.3816 22.1538 15.381 22.1538C16.3803 22.1538 17.1905 21.3273 17.1905 20.3077ZM5.42857 12C5.42857 10.9804 4.61842 10.1538 3.61905 10.1538C2.61968 10.1538 1.80952 10.9804 1.80952 12C1.80952 13.0196 2.61968 13.8462 3.61905 13.8462C4.12098 13.8462 4.57408 13.6392 4.90286 13.3017C5.22893 12.9669 5.42857 12.508 5.42857 12ZM17.1905 3.69231C17.1905 2.67271 16.3803 1.84615 15.381 1.84615C14.3816 1.84615 13.5714 2.67271 13.5714 3.69231C13.5714 4.16566 13.7448 4.59556 14.0318 4.92278C14.3644 5.30194 14.8451 5.53846 15.381 5.53846C16.3803 5.53846 17.1905 4.71191 17.1905 3.69231ZM19 3.69231C19 5.73151 17.3797 7.38462 15.381 7.38462C14.5787 7.38462 13.8372 7.11741 13.2374 6.66707L6.8564 10.3504C7.09999 10.847 7.2381 11.4069 7.2381 12C7.2381 12.5925 7.09971 13.1523 6.8564 13.6487L13.2374 17.332C13.8371 16.8819 14.5789 16.6154 15.381 16.6154C17.3797 16.6154 19 18.2685 19 20.3077C19 22.3469 17.3797 24 15.381 24C13.3822 24 11.7619 22.3469 11.7619 20.3077C11.7619 19.7656 11.8766 19.2502 12.0826 18.7861L5.63621 15.0658C5.05999 15.461 4.36554 15.6923 3.61905 15.6923C1.6203 15.6923 0 14.0392 0 12C0 9.96079 1.6203 8.30769 3.61905 8.30769C4.36564 8.30769 5.05906 8.53892 5.63532 8.93419L12.0826 5.21304C11.8769 4.7491 11.7619 4.23406 11.7619 3.69231C11.7619 1.6531 13.3822 0 15.381 0C17.3797 0 19 1.6531 19 3.69231Z" fill="rgba(255,255,255,0.6)"/>
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
            {beatLicenses.map((l, i) => (
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
                  backdropFilter: 'blur(6px)',
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
              { label: 'BPM', value: beatBpm },
              { label: 'Жанры', value: beatGenres },
              { label: 'Тональность', value: beatKey },
              { label: 'Дата добавления', value: beatDate },
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
            onClick={() => onAddToCart(beat.id, lic.name, lic.type, lic.price)}
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
              backdropFilter: 'blur(6px)',
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
            backdropFilter: 'blur(6px)',
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
