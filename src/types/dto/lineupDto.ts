export interface CreateLineupDto {
  name: string
  date: string
  isTemplate?: boolean
  templateId?: string
}

export interface UpdateLineupDto {
  name?: string
  date?: string
  isTemplate?: boolean
  templateId?: string
}
