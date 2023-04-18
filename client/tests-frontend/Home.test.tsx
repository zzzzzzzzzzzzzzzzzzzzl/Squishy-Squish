import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from '../store'
import Home from '../components/Home'
import MainMenu from '../components/MainMenu'
import Store from '../components/Store'
import Leaderboard from '../components/Leaderboard'

jest.mock('../components/MainMenu', () => {
  return jest.fn(() => <div>MainMenu</div>)
})

jest.mock('../components/Store', () => {
  return jest.fn(() => <div>Store</div>)
})

jest.mock('../components/Leaderboard', () => {
  return jest.fn(() => <div>Leaderboard</div>)
})

describe('Home component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
  })

  it('renders the MainMenu component by default', () => {
    expect(screen.getByText('MainMenu')).toBeInTheDocument()
  })
})
