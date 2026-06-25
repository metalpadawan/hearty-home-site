import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactForm from '../src/components/ContactForm.jsx';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ContactForm', () => {
  it('warns visitors not to submit highly sensitive information', () => {
    render(<ContactForm />);

    expect(screen.getByText(/Please do not include medical records/i)).toBeInTheDocument();
  });

  it('shows a clear message when the enquiry API cannot be reached', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Full name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/Email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Service needed/i), { target: { value: 'Cleaning Services' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Please contact me about cleaning.' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Enquiry/i }));

    await waitFor(() => {
      expect(screen.getByText(/The enquiry service could not be reached/i)).toBeInTheDocument();
    });
  });
});
