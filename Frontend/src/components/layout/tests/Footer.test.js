import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('<Footer />', () => {
  test('should render footer copyright', () => {
    render(<Footer />);
    const footerElement = screen.getByText(/2021 Copyright/i);
    expect(footerElement).toBeInTheDocument();
  });

  test('should render website link', () => {
    render(<Footer />);
    const linkElement = screen.getByRole('link', { name: 'clearpoint.digital' });
    expect(linkElement).toHaveAttribute('href', 'https://clearpoint.digital');
  });
});
