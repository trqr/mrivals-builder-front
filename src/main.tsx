import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import theme from "./theme/theme.ts";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {AuthProvider} from "./contexts/AuthProvider.tsx";
import {CompoProvider} from "./contexts/CompoProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <CompoProvider>
              <ThemeProvider theme={theme}>
                  <CssBaseline/>
                    <App />
              </ThemeProvider>
          </CompoProvider>
      </AuthProvider>
  </StrictMode>,
)
