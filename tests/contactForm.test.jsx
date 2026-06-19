import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ContactForm from '../src/components/ContactForm.jsx';

describe('ContactForm', () => {
  it('warns visitors not to submit highly sensitive information', () => {
    render(<ContactForm />);

    expect(screen.getByText(/Please do not include medical records/i)).toBeInTheDocument();
  });
});

