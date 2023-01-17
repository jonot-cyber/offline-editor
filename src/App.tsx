import React, { useEffect, useRef } from 'react';

function App() {
  let areaRef = useRef<HTMLTextAreaElement>(null)

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

    current.value = current.value.substring(0, start) + "\t" + current.value.substring(end);

    current.selectionStart = start + 1
    current.selectionEnd = start + 1
  }

  useEffect(() => {
    areaRef.current?.focus()
  })

  return (
    <div className="flex w-screen h-screen">
      <textarea className="grow font-mono" placeholder="Start Typing..." onKeyDown={keyDown} ref={areaRef} />
    </div>
  );
}

export default App;
