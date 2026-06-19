// types/index.ts
import type { Tables, TablesInsert, TablesUpdate } from './database.types'

// --- Tabel Projects ---
export type Project = Tables<'projects'>
export type ProjectInsert = TablesInsert<'projects'>
export type ProjectUpdate = TablesUpdate<'projects'>

// --- Tabel Project Details ---
export type ProjectDetail = Tables<'project_details'>
export type ProjectDetailInsert = TablesInsert<'project_details'>
export type ProjectWithDetails = Project & {
  project_details: ProjectDetail | null
}

// --- Tabel Services ---
export type Service = Tables<'services'>
export type ServiceInsert = TablesInsert<'services'>
export type ServiceUpdate = TablesUpdate<'services'>

// --- Tabel Admin Accounts ---
export type AdminAccount = Tables<'admin_accounts'>
export type AdminAccountInsert = TablesInsert<'admin_accounts'>
export type AdminAccountUpdate = TablesUpdate<'admin_accounts'>

// --- Tabel Testimonials ---
export type Testimonial = Tables<'testimonials'>
export type TestimonialInsert = TablesInsert<'testimonials'>
export type TestimonialUpdate = TablesUpdate<'testimonials'>

// --- Tabel Inquiries ---
export type Inquiry = Tables<'inquiries'>
export type InquiryInsert = TablesInsert<'inquiries'>
export type InquiryUpdate = TablesUpdate<'inquiries'>