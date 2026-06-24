// Runs before paint to set the theme with no flash of the wrong mode.
// Respects a saved choice, otherwise follows the system preference.
export function ThemeScript() {
  const code = `(function(){try{var k='denlux-theme';var s=localStorage.getItem(k);var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='light'||s==='dark'?s:(m?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
