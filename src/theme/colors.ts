export const colors = {
  // Primary palette
  primary: '#1E3A5F',
  primaryLight: '#2A5298',
  primaryDark: '#0F1F33',
  accent: '#FF6B35',
  accentLight: '#FF8F65',

  // Backgrounds
  background: '#F5F7FA',
  surface: '#FFFFFF',
  card: '#FFFFFF',

  // Text (WCAG 2.1 AA compliant contrast ratios)
  textPrimary: '#1A1A2E',      // 16.4:1 on white — AAA
  textSecondary: '#4B5563',     // 7.5:1 on white — AAA (was #6B7280 at 5.0:1)
  textLight: '#6B7280',         // 5.0:1 on white — AA (was #9CA3AF at 2.8:1)
  textOnPrimary: '#FFFFFF',
  textOnAccent: '#FFFFFF',

  // Status
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Borders & Dividers
  border: '#E5E7EB',
  divider: '#F3F4F6',

  // Misc
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: 'rgba(0, 0, 0, 0.1)',
  disabled: '#D1D5DB',
  placeholder: '#6B7280',       // 5.0:1 on white — AA (was #9CA3AF at 2.8:1)

  // Focus indicator (WCAG 2.4.7)
  focusRing: '#1E3A5F',
} as const;
