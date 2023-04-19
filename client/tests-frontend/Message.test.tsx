import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Message from '../components/Message'

describe('Message', () => {
  test('renders the message', () => {
    const message = 'This is a test message'
    render(<Message message={message} />)

    const messageElement = screen.getByText(message)
    expect(messageElement).toBeInTheDocument()
  })
})
