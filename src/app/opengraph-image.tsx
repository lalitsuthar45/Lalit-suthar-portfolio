import { ImageResponse } from 'next/og';
import { SITE } from '@/constants/site';

export const alt = `${SITE.name} — ${SITE.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Social preview card, rendered at build time.
 * Uses inline styles only — next/og supports a limited CSS subset, not Tailwind.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #09090b 0%, #0f172a 55%, #0b1220 100%)',
          position: 'relative',
        }}
      >
        {/* Accent bloom */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.42) 0%, rgba(59,130,246,0) 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -220,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.34) 0%, rgba(139,92,246,0) 70%)',
            display: 'flex',
          }}
        />

        {/* Top rule */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #3b82f6, #22d3ee, #8b5cf6)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontSize: 26,
              color: '#93c5fd',
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: '#22d3ee',
                display: 'flex',
              }}
            />
            Portfolio
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 96,
              fontWeight: 700,
              color: '#ffffff',
              marginTop: 24,
              letterSpacing: -3,
            }}
          >
            {SITE.name}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 44,
              fontWeight: 600,
              marginTop: 8,
              background: 'linear-gradient(90deg, #60a5fa, #22d3ee, #a78bfa)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {SITE.headline}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: '#a1a1aa',
              marginTop: 28,
              maxWidth: 880,
              lineHeight: 1.45,
            }}
          >
            3+ years building distributed, scalable and low-latency systems with Spring Boot,
            Microservices, Kafka, Redis and PostgreSQL.
          </div>

          <div style={{ display: 'flex', gap: 14, marginTop: 44, flexWrap: 'wrap' }}>
            {['Java', 'Spring Boot', 'Microservices', 'Kafka', 'Redis', 'PostgreSQL'].map((tech) => (
              <div
                key={tech}
                style={{
                  display: 'flex',
                  padding: '10px 22px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.16)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#e4e4e7',
                  fontSize: 24,
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', fontSize: 24, color: '#71717a', marginTop: 44 }}>
            {SITE.location}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
