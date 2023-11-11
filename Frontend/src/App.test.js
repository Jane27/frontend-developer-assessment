import { screen } from '@testing-library/react';
import App from './App';
import { renderWithClient } from './utils/testUtil';

describe('<App />', () => {
  test('renders the footer text', async () => {
    renderWithClient(<App />);
    expect(screen.getByText(/clearpoint.digital/i)).toBeInTheDocument();
  });
});
