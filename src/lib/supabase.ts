import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xbtnjqxborukiuhwdbsh.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhidG5qcXhib3J1a2l1aHdkYnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MzA0MTgsImV4cCI6MjA2OTQwNjQxOH0.r5FwwtDOQjsGVixOQ9AuvbwxOV3XLVh2mM0fRKz7fiw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Bağlantı test fonksiyonu
export async function testConnection() {
  try {
    // Önce basit bir bağlantı testi
    const { data, error } = await supabase
      .from('test')
      .select('*')
      .limit(1)
    
    if (error) {
      console.log('Bağlantı hatası:', error)
      return { success: false, error: error.message }
    }
    
    console.log('Bağlantı başarılı!')
    return { success: true, data }
  } catch (error) {
    console.log('Bağlantı hatası:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu' }
  }
}

// Test için basit bir veri ekleme fonksiyonu
export async function addTestData() {
  try {
    const { data, error } = await supabase
      .from('test')
      .insert([
        {
          name: 'Test Kullanıcı',
          message: 'Bağlantı çalışıyor!',
          created_at: new Date().toISOString()
        }
      ])
      .select()
    
    if (error) {
      console.log('Veri ekleme hatası:', error)
      return { success: false, error: error.message }
    }
    
    console.log('Test verisi eklendi:', data)
    return { success: true, data }
  } catch (error) {
    console.log('Veri ekleme hatası:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu' }
  }
} 