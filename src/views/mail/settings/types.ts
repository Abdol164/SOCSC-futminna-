export type SettingsViewType =
  | 'subname'
  | 'notifications'
  | 'account'
  | 'preferences'

export interface SettingsTab {
  label: string
  view: SettingsViewType
}
