import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockEventList from './events-mock.json';
import '@testing-library/jest-dom'

describe('App Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => (mockEventList)
    });
  });

  it('renders the headline', () => {
    render(<App/>);
    const headline = screen.getByText('eventListPage.headline');
    expect(headline).toBeInTheDocument();
  });

  it('allows switching between views', () => {
    render(<App/>);
    const gridViewButton = screen.getByTestId('grid-view-button');
    const listViewButton = screen.getByTestId('list-view-button');
    const calendarViewButton = screen.getByTestId('calendar-view-button');

    setTimeout(() => {
      expect(screen.getByTestId('grid-view-open')).toBeInTheDocument();

      userEvent.click(listViewButton);
      expect(screen.getByTestId('calender-view-open')).toBeInTheDocument();

      userEvent.click(calendarViewButton);
      expect(screen.getByTestId('list-view-open')).toBeInTheDocument();

      userEvent.click(gridViewButton);
      expect(screen.getByTestId('grid-view-open')).toBeInTheDocument();
    }, 10);
  });
});