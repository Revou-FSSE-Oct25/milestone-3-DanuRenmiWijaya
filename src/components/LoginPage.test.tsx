/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginPage from '@/app/login/page';  
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module '@jest/globals' {
  export interface Matchers<R, T>
    extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}

jest.mock('next-auth/react');
jest.mock('react-toastify');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage Component', () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
  });

  it('harus menampilkan error validasi jika form kosong', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const submitBtn = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitBtn);

    expect(await screen.findByText(/username harus diisi/i)).toBeInTheDocument();
    expect(await screen.findByText(/password minimal 6 karakter/i)).toBeInTheDocument();
  });

  it('harus memanggil signIn dan redirect ke dashboard jika login berhasil', async () => {
    const user = userEvent.setup();
    (signIn as jest.Mock).mockResolvedValue({ error: null });

    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText(/username/i), 'admin');
    await user.type(screen.getByPlaceholderText(/••••••/i), 'password123');
    
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', expect.objectContaining({
        username: 'admin',
        password: 'password123',
      }));
      expect(toast.success).toHaveBeenCalledWith('Login Berhasil!');
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('harus menunjukkan status loading saat memproses login', async () => {
    const user = userEvent.setup();
    (signIn as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText(/username/i), 'admin');
    await user.type(screen.getByPlaceholderText(/••••••/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/memproses.../i);
    expect(button).toBeDisabled();
  });
});
