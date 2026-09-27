import os

base = r"d:\Smart India Hackathon\Identity-X"

def w(path, code):
    full = os.path.join(base, path.replace("/", os.sep))
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8", newline="\n") as f:
        f.write(code.strip() + "\n")
    print(f"Created: {path}")

# 1. index.html
w("index.html", """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IDENTITY-X | AI-Powered Identity & Document Forensics Platform</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-900 text-slate-100 font-sans antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>""")

# 2. src/index.css
w("src/index.css", """@import "tailwindcss";

@layer base {
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    background-color: #0f172a;
    color: #f8fafc;
  }
  code, pre, .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in {
  animation: fadeIn 0.25s ease-out forwards;
}

@keyframes pulseBorder {
  0%, 100% { border-color: rgba(239, 68, 68, 0.4); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  50% { border-color: rgba(239, 68, 68, 0.9); box-shadow: 0 0 12px 2px rgba(239, 68, 68, 0.3); }
}
.pulse-anomaly {
  animation: pulseBorder 2s infinite ease-in-out;
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(1000%); }
}
.scanner-line {
  animation: scanline 3s linear infinite;
}

/* Scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #0f172a;
}
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #475569;
}""")

# 3. src/main.jsx
w("src/main.jsx", """import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)""")

print("Part 1 base files generated successfully")
