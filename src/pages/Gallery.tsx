import { useState, useEffect, useCallback } from 'react'
import Navigation from '../components/Navigation'
import { Album, FilterCategory } from '../types/album'

const CATEGORIES: Record<string, string> = {
  graduation:  '🎓 졸업식',
  event:       '🎉 학교 행사',
  class:       '📚 수업 활동',
  culture:     '🎨 문화 체험',
  performance: '🏅 발표회',
  other:       '📷 기타',
}

const EMOJIS: Record<string, string> = {
  graduation: '🎓', event: '🎉', class: '📚', culture: '🎨', performance: '🏅', other: '📷',
}

const SAMPLE_ALBUMS: Album[] = [
  {
    title: '2024년 졸업식', date: '2024-11-30', category: 'graduation', cover: null, published: true, slug: '2024-11-30-graduation',
    description: '2024년 한 해를 마무리하는 졸업식이 성황리에 열렸습니다.',
    photos: [{ image: null, caption: '졸업식 전체 사진' }, { image: null, caption: '졸업생들과 선생님' }, { image: null, caption: '상장 수여식' }],
  },
  {
    title: '추석 문화 체험', date: '2024-09-14', category: 'culture', cover: null, published: true, slug: '2024-09-14-chuseok',
    description: '추석을 맞아 송편 만들기와 한복 입기 체험을 진행했습니다.',
    photos: [{ image: null, caption: '송편 만들기' }, { image: null, caption: '한복 입기 체험' }],
  },
  {
    title: '2024 발표회', date: '2024-06-22', category: 'performance', cover: null, published: true, slug: '2024-06-22-performance',
    description: '1학기 마무리 발표회. 학생들이 한 학기 동안 배운 것들을 발표했습니다.',
    photos: [{ image: null, caption: '1학기 발표회' }, { image: null, caption: '노래 발표' }, { image: null, caption: '시 낭송' }, { image: null, caption: '단체 사진' }],
  },
  {
    title: '신입생 환영회', date: '2024-02-10', category: 'event', cover: null, published: true, slug: '2024-02-10-welcome',
    description: '새 학년 신입생들을 환영하는 자리였습니다.',
    photos: [{ image: null, caption: '환영 행사' }],
  },
  {
    title: '한국어 수업 활동', date: '2023-08-19', category: 'class', cover: null, published: true, slug: '2023-08-19-class',
    description: '열심히 공부하는 학생들의 수업 장면입니다.',
    photos: [{ image: null, caption: '수업 장면' }, { image: null, caption: '그룹 활동' }],
  },
]

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

function getYear(dateStr: string) {
  return new Date(dateStr).getFullYear()
}

interface LightboxState {
  album: Album
  photoIdx: number
}

export default function Gallery() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [filter, setFilter] = useState<FilterCategory>('all')
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  useEffect(() => {
    fetch('/albums.json')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setAlbums)
      .catch(() => setAlbums(SAMPLE_ALBUMS))
      .finally(() => setLoading(false))
  }, [])

  const filtered = albums.filter(a => a.published !== false && (filter === 'all' || a.category === filter))

  // Group by year
  const byYear: Record<number, Album[]> = {}
  filtered.forEach(a => {
    const y = getYear(a.date)
    if (!byYear[y]) byYear[y] = []
    byYear[y].push(a)
  })
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)

  const openLightbox = (album: Album) => setLightbox({ album, photoIdx: 0 })
  const closeLightbox = useCallback(() => setLightbox(null), [])

  const prevPhoto = useCallback(() => {
    setLightbox(lb => lb && lb.photoIdx > 0 ? { ...lb, photoIdx: lb.photoIdx - 1 } : lb)
  }, [])
  const nextPhoto = useCallback(() => {
    setLightbox(lb => lb && lb.photoIdx < lb.album.photos.length - 1 ? { ...lb, photoIdx: lb.photoIdx + 1 } : lb)
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [lightbox, closeLightbox, prevPhoto, nextPhoto])

  return (
    <div>
      <Navigation variant="gallery" />

      {/* ── HERO ──────────────────────────────────────── */}
      <div
        className="page-hero-gradient"
        data-word="앨범"
        style={{ padding: '140px 48px 80px' }}
      >
        <div className="relative z-[1] max-w-[1200px] mx-auto">
          <span
            className="inline-flex items-center gap-2.5 mb-4"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2aa99a' }}
          >
            <span style={{ display: 'block', width: 24, height: 2, background: '#2aa99a' }} />
            알림마당
          </span>
          <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 'clamp(32px,5vw,60px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
            학교 <em style={{ color: '#c8973a', fontStyle: 'normal' }}>앨범</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15 }}>소중한 순간들을 함께 나눕니다</p>
        </div>
      </div>

      {/* ── FILTERS ───────────────────────────────────── */}
      <div
        className="bg-white sticky z-50"
        style={{ padding: '28px 48px', borderBottom: '1px solid rgba(0,0,0,0.07)', top: 72 }}
      >
        <div className="max-w-[1200px] mx-auto flex gap-2.5 flex-wrap items-center">
          <span style={{ fontSize: 12, fontWeight: 700, color: '#4a5f75', letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: 8 }}>
            분류
          </span>
          {([['all', '전체'], ['graduation', '🎓 졸업식'], ['event', '🎉 학교 행사'], ['class', '📚 수업 활동'], ['culture', '🎨 문화 체험'], ['performance', '🏅 발표회']] as [FilterCategory, string][]).map(([val, label]) => (
            <button
              key={val}
              className="filter-btn px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
              style={{
                border: '1px solid',
                borderColor: filter === val ? 'transparent' : 'rgba(0,0,0,0.12)',
                background: filter === val ? '#0d2340' : 'transparent',
                color: filter === val ? '#fff' : '#4a5f75',
              }}
              onClick={() => setFilter(val)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAIN ──────────────────────────────────────── */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 48px 100px' }}>
        {loading ? (
          <div className="text-center py-20" style={{ color: '#4a5f75', fontSize: 15 }}>앨범을 불러오는 중...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div style={{ fontSize: 64, marginBottom: 20 }}>📷</div>
            <h3 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 24, color: '#0d2340', marginBottom: 10 }}>아직 앨범이 없어요</h3>
            <p style={{ color: '#4a5f75', fontSize: 15 }}>곧 추가될 예정입니다</p>
          </div>
        ) : (
          years.map(year => (
            <div key={year} style={{ marginBottom: 64 }}>
              <div className="flex items-center gap-4 mb-7">
                <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 32, fontWeight: 900, color: '#0d2340' }}>{year}</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(0,0,0,0.08)' }} />
                <span style={{ fontSize: 12, color: '#4a5f75', fontWeight: 500 }}>앨범 {byYear[year].length}개</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
                {byYear[year].map(album => (
                  <a
                    key={album.slug}
                    href="#"
                    className="album-card block rounded-2xl overflow-hidden no-underline"
                    style={{ background: '#f2f4f7', border: '1px solid transparent' }}
                    onClick={e => { e.preventDefault(); openLightbox(album) }}
                  >
                    <div className="album-thumb relative" style={{ aspectRatio: '4/3', background: '#1a3a5c', overflow: 'hidden' }}>
                      {album.cover ? (
                        <img src={album.cover} alt={album.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg,#1a3a5c,#0f3050)' }}>
                          <div style={{ fontSize: 40, marginBottom: 8, opacity: 0.6 }}>{EMOJIS[album.category] || '📷'}</div>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{album.title}</div>
                        </div>
                      )}
                      {album.photos.length > 0 && (
                        <span
                          className="absolute top-3 right-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: 'rgba(13,35,64,0.85)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                          📸 {album.photos.length}장
                        </span>
                      )}
                      <span
                        className="absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md"
                        style={{ background: 'rgba(200,151,58,0.9)', color: '#0d2340' }}
                      >
                        {CATEGORIES[album.category] || '기타'}
                      </span>
                    </div>
                    <div style={{ padding: 20 }}>
                      <div style={{ fontSize: 12, color: '#4a5f75', marginBottom: 6 }}>{formatDate(album.date)}</div>
                      <div style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 17, fontWeight: 700, color: '#0d2340', marginBottom: 6, lineHeight: 1.4 }}>
                        {album.title}
                      </div>
                      {album.description && (
                        <div className="album-desc" style={{ fontSize: 13, color: '#4a5f75', lineHeight: 1.6 }}>
                          {album.description}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      {/* Admin footer link */}
      <div style={{ textAlign: 'center', padding: '24px 48px', background: '#060f1a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <a
          href="/admin/"
          style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseOver={e => (e.currentTarget.style.color = '#c8973a')}
          onMouseOut={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
        >
          ⚙️ 관리자 페이지 (앨범 등록/수정)
        </a>
      </div>

      {/* ── LIGHTBOX ──────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
          style={{ background: 'rgba(5,12,22,0.96)', backdropFilter: 'blur(8px)' }}
          onClick={e => { if (e.target === e.currentTarget) closeLightbox() }}
        >
          <div
            className="lightbox-inner bg-white rounded-3xl overflow-hidden w-full"
            style={{
              maxWidth: 1000, maxHeight: '90vh',
              display: 'grid', gridTemplateColumns: '1fr 340px',
            }}
          >
            {/* Photos area */}
            <div className="relative flex items-center justify-center" style={{ background: '#000', minHeight: 400 }}>
              {lightbox.album.photos[lightbox.photoIdx]?.image ? (
                <img
                  src={lightbox.album.photos[lightbox.photoIdx].image!}
                  alt={lightbox.album.photos[lightbox.photoIdx].caption || lightbox.album.title}
                  style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
                />
              ) : (
                <div className="flex items-center justify-center text-5xl opacity-30">📷</div>
              )}

              {lightbox.photoIdx > 0 && (
                <button
                  className="absolute flex items-center justify-center rounded-full cursor-pointer transition-all"
                  style={{
                    left: 16, top: '50%', transform: 'translateY(-50%)',
                    width: 44, height: 44,
                    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff', fontSize: 18,
                  }}
                  onClick={prevPhoto}
                  aria-label="이전 사진"
                >
                  ‹
                </button>
              )}
              {lightbox.photoIdx < lightbox.album.photos.length - 1 && (
                <button
                  className="absolute flex items-center justify-center rounded-full cursor-pointer transition-all"
                  style={{
                    right: 16, top: '50%', transform: 'translateY(-50%)',
                    width: 44, height: 44,
                    background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff', fontSize: 18,
                  }}
                  onClick={nextPhoto}
                  aria-label="다음 사진"
                >
                  ›
                </button>
              )}

              <div
                className="absolute left-1/2 -translate-x-1/2 text-xs px-3.5 py-1 rounded-full"
                style={{ bottom: 16, background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.8)' }}
              >
                {lightbox.photoIdx + 1} / {lightbox.album.photos.length}
              </div>
            </div>

            {/* Info panel */}
            <div className="flex flex-col overflow-y-auto" style={{ padding: '36px 32px' }}>
              <button
                className="self-end flex items-center justify-center rounded-full mb-6 cursor-pointer transition-colors"
                style={{ width: 36, height: 36, background: '#f2f4f7', border: 'none', fontSize: 18, color: '#1c2b3a' }}
                onClick={closeLightbox}
                aria-label="닫기"
              >
                ✕
              </button>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a7a6e', marginBottom: 8 }}>
                {CATEGORIES[lightbox.album.category] || ''}
              </div>
              <h2 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 22, fontWeight: 700, color: '#0d2340', marginBottom: 8, lineHeight: 1.35 }}>
                {lightbox.album.title}
              </h2>
              <p style={{ fontSize: 13, color: '#4a5f75', marginBottom: 16 }}>{formatDate(lightbox.album.date)}</p>
              {lightbox.album.description && (
                <p style={{ fontSize: 14, color: '#4a5f75', lineHeight: 1.75, marginBottom: 24, flex: 1 }}>
                  {lightbox.album.description}
                </p>
              )}

              {/* Thumbnails */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                {lightbox.album.photos.map((photo, i) => (
                  <div
                    key={i}
                    className="cursor-pointer rounded-lg overflow-hidden"
                    style={{
                      aspectRatio: '1',
                      border: `2px solid ${i === lightbox.photoIdx ? '#c8973a' : 'transparent'}`,
                      transition: 'all 0.15s',
                    }}
                    onClick={() => setLightbox(lb => lb ? { ...lb, photoIdx: i } : lb)}
                  >
                    {photo.image ? (
                      <img src={photo.image} alt={photo.caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg" style={{ background: '#1a3a5c' }}>📷</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
