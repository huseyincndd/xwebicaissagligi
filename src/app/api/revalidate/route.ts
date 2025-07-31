import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();
    
    // Ana sayfayı revalidate et
    revalidatePath('/');
    
    // Tüm dinamik sayfaları revalidate et
    revalidatePath('/admin/dashboard');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Pages revalidated successfully',
      revalidated: true,
      now: Date.now()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error revalidating pages',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 