import { render, screen, fireEvent } from '@testing-library/react';
import PrimaryButton from '../PrimaryButton';

describe('PrimaryButton', () => {
  test('renders with default text when no name is provided', () => {
    render(<PrimaryButton />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('renders with custom name', () => {
    render(<PrimaryButton name="Submit" />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<PrimaryButton onClick={handleClick} name="Test Button" />);
    
    fireEvent.click(screen.getByText('Test Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom background color', () => {
    render(<PrimaryButton name="Test" backgroundColor="#ff0000" />);
    const button = screen.getByText('Test');
    expect(button).toHaveStyle('background-color: #ff0000');
  });

  test('passes through additional props', () => {
    render(<PrimaryButton name="Test" disabled data-testid="custom-button" />);
    const button = screen.getByTestId('custom-button');
    expect(button).toBeDisabled();
  });
});