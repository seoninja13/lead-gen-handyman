import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { location } = body

    if (!location) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      )
    }

    // In a real app, you would generate SEO content based on the location
    // For now, we'll return a simple template
    const seoContent = {
      title: `Handyman Services in ${location} - Professional Home Repairs & Maintenance`,
      description: `Find reliable handyman services in ${location}. Professional home repairs, maintenance, and improvements by licensed experts. Free estimates and satisfaction guaranteed.`,
      keywords: [
        `handyman ${location}`,
        `home repair ${location}`,
        `home maintenance ${location}`,
        `local handyman services`,
        `professional handyman`,
        `home improvement ${location}`,
      ].join(', '),
      h1: `Professional Handyman Services in ${location}`,
      metaDescription: `Looking for trusted handyman services in ${location}? Our experienced professionals provide quality home repairs, maintenance, and improvements. Get a free estimate today!`,
    }

    return NextResponse.json(seoContent)
  } catch (error) {
    console.error('SEO generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate SEO content' },
      { status: 500 }
    )
  }
}
