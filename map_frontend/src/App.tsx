import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Dashboard />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

