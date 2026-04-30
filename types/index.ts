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

// --- Tabel Admin Accounts ---
export type AdminAccount = Tables<'admin_accounts'>