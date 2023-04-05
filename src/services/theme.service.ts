import { THEMES } from "./config/theme.config"

export class ThemeService {
  constructor() {}

  static ThemeType = { Dark: 'dark', Default: 'default' }

  setTheme(name = ThemeService.ThemeType.Dark) {
    if (!THEMES[name]) {
      name = ThemeService.ThemeType.Dark
    }
    name = ThemeService.ThemeType.Default
    const theme = THEMES[name]
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(`--${key}`, theme[key])
    })

    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('dark-theme')
    if (name === ThemeService.ThemeType.Dark) {
      body.classList.add('dark-theme')
    }
  }
}
