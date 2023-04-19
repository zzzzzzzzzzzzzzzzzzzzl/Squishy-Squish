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
    show && (
      <div className="message-container">
        <p>{message}</p>
        <button onClick={handleClick}>Close</button>
      </div>
    )
  )
}

export default Message
