import React, { useEffect, useRef, useState } from 'react';

function App() {
  let areaRef = useRef<HTMLTextAreaElement>(null)
  const [tabs, setTabs] = useState(4)

  function keyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Tab") {
      return
    }
    e.preventDefault()
    let current = areaRef.current

    if (current === null) {
      return
    }

    let start = current.selectionStart;
    let end = current.selectionEnd;

    current.value = current.value.substring(0, start) + " ".repeat(tabs) + current.value.substring(end);

    current.selectionStart = start + tabs
    current.selectionEnd = start + tabs
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const setTo = parseInt(e.target.value)
    setTabs(setTo)
  }

  return (
    <div className="flex w-screen h-screen flex-col">
      <datalist id="tabstops">
        <option value={2} />
        <option value={4} />
        <option value={8} />
        <option value={16} />
      </datalist>
      <textarea className="grow font-mono resize-none" placeholder="Start Typing..." onKeyDown={keyDown} ref={areaRef} autoFocus spellCheck={false} />
      <div className="flex">
        <input type="range" name="tab" min={2} max={16} value={tabs} onChange={handleChange} className="grow" list="tabstops" />
        <span>{tabs}</span>
      </div>
    </div> 
  );
}

export default App;
