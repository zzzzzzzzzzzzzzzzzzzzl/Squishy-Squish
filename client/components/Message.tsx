import { useState } from 'react'

interface MessageProps {
  message: string
  onClose: () => void
}

function Message({ message, onClose }: MessageProps) {
  const [show, setShow] = useState(true)

  function handleClick() {
    setShow(false)
    onClose()
  }

  return (
    <div className="message-container">
      <div style={{ display: show ? 'block' : 'none' }}>
        <p>{message}</p>
        <button onClick={handleClick}>Close</button>
      </div>
    </div>
  )
}

export default Message
