import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from './Home'

describe('Home', () => {
  it('should call the onStart function when the Start button is clicked', () => {
    const onStartMock = jest.fn()
    const { getByText } = render(
      <Home
        onStart={onStartMock}
        onShopButton={function (): void {
          throw new Error('Function not implemented.')
        }}
        onLeaderboardButton={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    )
    const startButton = getByText('Start')
    fireEvent.click(startButton)
    expect(onStartMock).toHaveBeenCalled()
  })

  it('should render three menu items', () => {
    const { getAllByRole } = render(
      <Home
        onStart={() => {}}
        onShopButton={function (): void {
          throw new Error('Function not implemented.')
        }}
        onLeaderboardButton={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    )
    const menuItems = getAllByRole('button')
    expect(menuItems).toHaveLength(3)
  })
})
