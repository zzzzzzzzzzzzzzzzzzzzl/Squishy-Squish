import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from '../store'
import Name from '../components/Name'

describe('Name component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Name />
      </Provider>
    )
  })

  it('renders the name input field', () => {
    const nameInput = screen.getByLabelText('Name:')
    expect(nameInput).toBeInTheDocument()
  })

  it('renders the score', () => {
    const score = screen.getByText('0')
    expect(score).toBeInTheDocument()
  })
})
