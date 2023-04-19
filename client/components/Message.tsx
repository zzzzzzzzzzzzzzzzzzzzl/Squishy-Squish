import { useState } from 'react'

interface MessageProps {
  message: string

}

function Message({ message }: MessageProps) {

  const [show, setShow] = useState(true)

  return (
    <div className="message-container">
      <div style={{ display: show ? 'block' : 'none' }}>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Message
