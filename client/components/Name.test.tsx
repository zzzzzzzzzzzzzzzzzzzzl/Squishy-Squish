import request from 'supertest'

import { render, screen, fireEvent, act } from '@testing-library/react'

import { addToLeaderboard } from '../apiClient'
import Name from './Name'

jest.mock('../apiClient')

describe('Name', () => {
  beforeEach(() => {
  })

  it('should render a form with Name and Score input fields and a Submit button', () => {
    render(<Name />)

    expect(screen.getByLabelText('Name:')).toBeInTheDocument()
    expect(screen.getByLabelText('Score:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  test('should update the state when the Name input field is changed', () => {
    render(<Name />)

    const nameInput = screen.getByLabelText('Name:')

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })

    expect(nameInput.value).toBe('John Doe')
  })

  test('should update the state when the Score input field is changed', () => {
    render(<Name />)

    const scoreInput = screen.getByLabelText('Score:')

    fireEvent.change(scoreInput, { target: { value: '100' } })

    expect(scoreInput.value).toBe('100')
  })

  test('should call the addToLeaderboard function with the correct score data when the form is submitted', async () => {
    render(<Name />)

    const nameInput = screen.getByLabelText('Name:')
    const scoreInput = screen.getByLabelText('Score:')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(scoreInput, { target: { value: '100' } })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(addToLeaderboard).toHaveBeenCalledTimes(1)
    expect(addToLeaderboard).toHaveBeenCalledWith({ name: 'John Doe', score: '100' })
  })

  test('should display an error message when there is an error adding the score', async () => {
    const error = Error('Failed to add score')
    // const response = await request()
    addToLeaderboard.(error.message)

    render(<Name />)

    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(screen.getByText('Error adding score')).toBeInTheDocument()
    expect(screen.getByText(error.message)).toBeInTheDocument()
  })
})