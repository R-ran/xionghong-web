import { NextRequest, NextResponse } from 'next/server'
import { getAboutSections } from '@/lib/wordpress'

export async function GET(request: NextRequest) {
  try {
    const sections = await getAboutSections()
    return NextResponse.json(sections, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch about sections' },
      { status: 500 }
    )
  }
}

