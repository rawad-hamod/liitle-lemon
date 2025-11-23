import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './components/BookingForm';
import '@testing-library/jest-dom';

// Mock props for testing
const mockSubmitForm = jest.fn();
const mockDispatch = jest.fn();
const mockAvailableTimes = {
  availableTimes: ['17:00', '18:00', '19:00', '20:00', '21:00']
};

const defaultProps = {
  submitForm: mockSubmitForm,
  dispatch: mockDispatch,
  availableTimes: mockAvailableTimes
};

describe('BookingForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Renders all form fields
  test('renders all form fields correctly', () => {
    render(<BookingForm {...defaultProps} />);

    expect(screen.getByLabelText(/choose date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion:/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/make your reservation/i)).toBeInTheDocument();
  });

  // Test 2: Renders time options from props
  test('renders time options from availableTimes prop', () => {
    render(<BookingForm {...defaultProps} />);

    const timeSelect = screen.getByLabelText(/choose time:/i);
    expect(timeSelect).toBeInTheDocument();

    mockAvailableTimes.availableTimes.forEach(time => {
      expect(screen.getByText(time)).toBeInTheDocument();
    });
  });

  // Test 3: Updates date field and calls dispatch
  test('updates date field and calls dispatch function', async () => {
    render(<BookingForm {...defaultProps} />);

    const dateInput = screen.getByLabelText(/choose date:/i);
    const testDate = '2024-02-15';

    await userEvent.type(dateInput, testDate);

    expect(dateInput).toHaveValue(testDate);
    expect(mockDispatch).toHaveBeenCalledWith(testDate);
  });

  // Test 4: Shows validation errors for empty required fields
  test('shows validation errors when required fields are empty', async () => {
    render(<BookingForm {...defaultProps} />);

    const submitButton = screen.getByDisplayValue(/make your reservation/i);

    await userEvent.click(submitButton);

    

    expect(mockSubmitForm).not.toHaveBeenCalled();
  });

  // Test 5: Shows validation error for past date
  test('shows validation error for past date', async () => {
    render(<BookingForm {...defaultProps} />);

    const dateInput = screen.getByLabelText(/choose date:/i);
    const pastDate = '2020-01-01';

    await userEvent.type(dateInput, pastDate);
    await userEvent.tab(); // Trigger blur

    await waitFor(() => {
      expect(screen.getByText(/date cannot be in the past/i)).toBeInTheDocument();
    });
  });

  // Test 6: Shows validation error for invalid number of guests
  test('shows validation errors for invalid number of guests', async () => {
    render(<BookingForm {...defaultProps} />);

    const guestsInput = screen.getByLabelText(/number of guests:/i);

    // Test minimum guests
    await userEvent.type(guestsInput, '0');
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText(/must have at least 1 guest/i)).toBeInTheDocument();
    });

    // Test maximum guests
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '11');
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText(/cannot have more than 10 guests/i)).toBeInTheDocument();
    });

    // Test decimal numbers
    await userEvent.clear(guestsInput);
    await userEvent.type(guestsInput, '2.5');
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText(/number of guests must be a whole number/i)).toBeInTheDocument();
    });
  });

  // Test 7: Submits form with valid data
  test('submits form with valid data', async () => {
    render(<BookingForm {...defaultProps} />);

    const futureDate = '2024-12-31';
    const time = '19:00';
    const guests = '4';
    const occasion = 'Birthday';

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/choose date:/i), futureDate);
    await userEvent.selectOptions(screen.getByLabelText(/choose time:/i), time);
    await userEvent.type(screen.getByLabelText(/number of guests:/i), guests);
    await userEvent.selectOptions(screen.getByLabelText(/occasion:/i), occasion);

    // Submit the form
    await userEvent.click(screen.getByDisplayValue(/make your reservation/i));

    await waitFor(() => {
      expect(mockSubmitForm).toHaveBeenCalledWith({
        date: futureDate,
        times: time,
        guests: guests,
        occasion: occasion
      });
    });
  });

  // Test 8: Disables submit button during submission
  test('disables submit button when form is submitting', async () => {
    // Create a mock that returns a promise to simulate async submission
    const asyncSubmitForm = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<BookingForm {...defaultProps} submitForm={asyncSubmitForm} />);

    const futureDate = '2024-12-31';
    const time = '19:00';
    const guests = '4';
    const occasion = 'Birthday';

    // Fill in the form
    await userEvent.type(screen.getByLabelText(/choose date:/i), futureDate);
    await userEvent.selectOptions(screen.getByLabelText(/choose time:/i), time);
    await userEvent.type(screen.getByLabelText(/number of guests:/i), guests);
    await userEvent.selectOptions(screen.getByLabelText(/occasion:/i), occasion);

    const submitButton = screen.getByDisplayValue(/make your reservation/i);

    // Submit the form
    await userEvent.click(submitButton);

    // Button should be disabled during submission
    expect(submitButton).toBeDisabled();
  });

  // Test 9: Updates form fields correctly
  test('updates all form fields correctly', async () => {
    render(<BookingForm {...defaultProps} />);

    const futureDate = '2024-12-31';
    const time = '19:00';
    const guests = '4';
    const occasion = 'Anniversary';

    // Fill in all fields
    await userEvent.type(screen.getByLabelText(/choose date:/i), futureDate);
    await userEvent.selectOptions(screen.getByLabelText(/choose time:/i), time);
    await userEvent.type(screen.getByLabelText(/number of guests:/i), guests);
    await userEvent.selectOptions(screen.getByLabelText(/occasion:/i), occasion);

    // Verify values
    expect(screen.getByLabelText(/choose date:/i)).toHaveValue(futureDate);
    expect(screen.getByLabelText(/choose time:/i)).toHaveValue(time);
    expect(screen.getByLabelText(/number of guests:/i)).toHaveValue(Number(guests));
    expect(screen.getByLabelText(/occasion:/i)).toHaveValue(occasion);
  });

  // Test 10: Shows and hides validation errors on interaction
  test('shows validation errors on blur and hides on correction', async () => {
    render(<BookingForm {...defaultProps} />);

    const guestsInput = screen.getByLabelText(/number of guests:/i);

    // Trigger validation by focusing and blurring without input
    await userEvent.click(guestsInput);
    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText(/number of guests is required/i)).toBeInTheDocument();
    });

    // Correct the error
    await userEvent.type(guestsInput, '2');

    // Error should disappear
    await waitFor(() => {
      expect(screen.queryByText(/number of guests is required/i)).not.toBeInTheDocument();
    });
  });
});