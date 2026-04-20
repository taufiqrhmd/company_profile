export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          title: string | null
          category: string | null
          impact: string | null
          impactLabel: string | null
          description: string | null
          icon: string | null
          image: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          title?: string | null
          // ... sesuaikan dengan field lainnya
        }
        Update: {
          // ... sesuaikan jika perlu
        }
      }
    }
  }
}