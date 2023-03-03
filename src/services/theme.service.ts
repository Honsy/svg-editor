export const THEMES: any = {
  default: {
    headerBackground: 'hsl(0, 0%, 100%)',
    headerColor: 'rgba(33,33,33,0.92)',
    headerBorder: '#f9f9f9',
    toolboxBackground: '#FBFBFB',
    toolboxColor: '#000000',
    toolboxBorder: '#F1F3F4',
    toolboxPanelBackgroung: '#f9f9f9',
    toolboxButton: '#545454',
    sidenavBackgroung: '#f9f9f9',
    toolboxItemActiveBackgroung: '#3059af',
    toolboxItemActiveColor: '#FFFFFF',
    toolboxFlyColor: '#000000',
    footZoomBackground: '#E4E4E4',
    footZoomBackgroundHover: '#CDCDCD',
    footZoomColor: '#000000',
    svgEditRulersBackground: '#f9f9f9',
    svgEditRulersColor: '#000000',
    svgEditWorkareaBackground: '#e4e4e4',
    svgEditWorkareaContextMenu: '#e4e4e4',
    svgEditWorkareaContextColor: '#000000',
    formInputBackground: '#f1f3f4',
    formExtInputBackground: '#fdfdfd',
    formInputColor: '#000000',
    formInputReadonlyBackground: '#f1f3f4',
    formInputBorderFocus: '#ccc',
    formInputBackgroundFocus: '#FFFFFF',
    formSliderBackground: '#f1f3f4',
    formSeparatorColor: '#e0e0e0',
    formBorder: '#F1F3F4',
    setupSeparatorColor: '#ccc',
    workPanelBackground: '#FFFFFF',
    mapBorderColor: '#3C3C3C',
    formExtBackground: '#f1f3f4',
    formInputExtBackground: '#FFFFFF',
    scrollbarTrack: '#D9D9D9',
    scrollbarThumb: '#BEBEBE',
    chipsBackground: '#F1F1F1',
    chipSelectedBackground: '#3059AF',
    chipSelectedColor: '#FFFFFF'
  },
  dark: {
    headerBackground: '#333333',
    headerColor: 'rgba(255,255,255,1)',
    headerBorder: '#252526',
    toolboxBackground: '#252526',
    toolboxColor: '#FFFFFF',
    toolboxBorder: 'rgba(33,33,33,0.92)',
    toolboxPanelBackgroung: '#252526',
    toolboxButton: '##313131',
    sidenavBackgroung: '#252526',
    toolboxItemActiveBackgroung: '#3059af',
    toolboxItemActiveColor: '#FFFFFF',
    toolboxFlyColor: '#FFFFFF',
    footZoomBackground: '#212121',
    footZoomBackgroundHover: '#161616',
    footZoomColor: '#FFFFFF',
    svgEditRulersBackground: '#2f2f2f',
    svgEditRulersColor: '#A4A4A4',
    svgEditWorkareaBackground: '#434343',
    svgEditWorkareaContextMenu: '#212121',
    svgEditWorkareaContextColor: '#FFFFFF',
    formInputBackground: '#37373D',
    formExtInputBackground: '#2d2d2d',
    formInputColor: '#FFFFFF',
    formInputReadonlyBackground: '#37373D',
    formInputBorderFocus: '#1177BB',
    formInputBackgroundFocus: '#37373D',
    formSliderBackground: '#37373D',
    formSeparatorColor: '#37373D',
    formBorder: 'rgba(39,39,39,0.42)',
    setupSeparatorColor: '#808080',
    workPanelBackground: '#424242',
    mapBorderColor: '#333333',
    formExtBackground: '#37373D',
    formInputExtBackground: '#424242',
    scrollbarTrack: '#414142',
    scrollbarThumb: '#686868',
    chipsBackground: '#242424',
    chipSelectedBackground: '#3059AF',
    chipSelectedColor: '#FFFFFF'
  }
}

export class ThemeService {
  constructor() {}

  static ThemeType = { Dark: 'dark', Default: 'default' }

  setTheme(name = ThemeService.ThemeType.Dark) {
    if (!THEMES[name]) {
      name = ThemeService.ThemeType.Dark
    }
    name = ThemeService.ThemeType.Dark
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
