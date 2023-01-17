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

  useEffect(() => {
    areaRef.current?.focus()
  })

  return (
    <div className="flex w-screen h-screen flex-col">
      <textarea className="grow font-mono" placeholder="Start Typing..." onKeyDown={keyDown} ref={areaRef} />
      <div className="flex">
        <input type="range" name="tab" min={2} max={16} value={tabs} onChange={handleChange} className="grow" />
        <span>{tabs}</span>
      </div>
    </div> 
  );
}

export default App;
