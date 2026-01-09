import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get parameters
    const title = searchParams.get('title') || 'Karasai'
    const type = searchParams.get('type') || 'default' // 'property', 'article', 'default'
    const subtitle = searchParams.get('subtitle') || 'Verified Rental Homes'
    const bedrooms = searchParams.get('bedrooms')
    const bathrooms = searchParams.get('bathrooms')
    const rent = searchParams.get('rent')

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#BFDBF7',
            backgroundImage: 'linear-gradient(135deg, #BFDBF7 0%, #4E70C6 100%)',
          }}
        >
          {/* Logo */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: 'white',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 36,
                fontWeight: 'bold',
                color: '#4E70C6',
              }}
            >
              K
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: 'white',
                letterSpacing: '-0.02em',
              }}
            >
              KARASAI
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 80px',
              maxWidth: '900px',
            }}
          >
            <h1
              style={{
                fontSize: type === 'property' ? 48 : 64,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                lineHeight: 1.2,
                marginBottom: 20,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>

            {/* Property Details */}
            {type === 'property' && bedrooms && bathrooms && rent && (
              <div
                style={{
                  display: 'flex',
                  gap: 30,
                  marginTop: 20,
                  backgroundColor: 'white',
                  padding: '20px 40px',
                  borderRadius: 12,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 'bold', color: '#4E70C6' }}>
                    {bedrooms}
                  </div>
                  <div style={{ fontSize: 16, color: '#666' }}>Beds</div>
                </div>
                <div style={{ fontSize: 32, color: '#ccc' }}>|</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 'bold', color: '#4E70C6' }}>
                    {bathrooms}
                  </div>
                  <div style={{ fontSize: 16, color: '#666' }}>Baths</div>
                </div>
                <div style={{ fontSize: 32, color: '#ccc' }}>|</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 'bold', color: '#4E70C6' }}>
                    ${rent}
                  </div>
                  <div style={{ fontSize: 16, color: '#666' }}>Monthly</div>
                </div>
              </div>
            )}

            {/* Subtitle */}
            <p
              style={{
                fontSize: 28,
                color: 'white',
                textAlign: 'center',
                marginTop: 20,
                opacity: 0.9,
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Verification Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              backgroundColor: 'white',
              padding: '16px 32px',
              borderRadius: 100,
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: '#4EC645',
                fontWeight: 'bold',
              }}
            >
              ✓
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              100% Verified Property
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    console.error(e)
    return new Response('Failed to generate image', { status: 500 })
  }
}