
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import './MarkdownEditor.css';

export default function MarkdownEditor() {
  const exampleMarkdown = `# 📘 Project Title

Welcome to the **Markdown Compiler**!

## 🚀 Features
- Live Markdown editing
- GitHub-flavored markdown support
- Syntax highlighting for code
- Copy to Clipboard
- Adjustable font size & line height

## 🧪 Example Code

\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));
\`\`\`

## 📄 License
MIT License`;

  const [markdown, setMarkdown] = useState(exampleMarkdown);
  const [compiledMarkdown, setCompiledMarkdown] = useState(exampleMarkdown);
  const [darkMode, setDarkMode] = useState(true);
  const [autoCompile, setAutoCompile] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (autoCompile) {
      setCompiledMarkdown(markdown);
    }
  }, [markdown, autoCompile]);

  const handleCompile = () => {
    setCompiledMarkdown(markdown);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      {/* Copy success popup */}
      {copied && (
        <div className="copy-popup">
          ✅ Copied to clipboard!
        </div>
      )}

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <button onClick={handleCompile} className="btn btn-primary">
            📄 Compile
          </button>
          <button onClick={handleCopy} className="btn btn-secondary">
            📋 Copy Markdown
          </button>
        </div>

        <div className="toolbar-right">
          <label>
            <input
              type="checkbox"
              checked={autoCompile}
              onChange={(e) => setAutoCompile(e.target.checked)}
            />{' '}
            🔄 Auto-Compile
          </label>
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />{' '}
            🌗 Dark Mode
          </label>
          <label>
            🔠 Font Size:
            <input
              type="number"
              min={12}
              max={30}
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="input"
            />
          </label>
          <label>
            📏 Line Height:
            <input
              type="number"
              step="0.1"
              min="1"
              max="3"
              value={lineHeight}
              onChange={(e) => setLineHeight(parseFloat(e.target.value))}
              className="input"
            />
          </label>
        </div>
      </div>

      {/* Editor + Preview */}
      <div className="main">
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          spellCheck={false}
          placeholder="Write your markdown here..."
          style={{ fontSize: fontSize, lineHeight: lineHeight }}
          className="editor"
        />

        <div className="preview">
          <ReactMarkdown
            children={compiledMarkdown}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          />
        </div>
      </div>
    </div>
  );
}
