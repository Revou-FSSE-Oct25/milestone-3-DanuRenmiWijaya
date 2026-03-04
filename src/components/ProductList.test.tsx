import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductList from '@/components/ProductList';
import { apiService } from '@/lib/api';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module '@jest/globals' {
  interface Matchers<R> extends TestingLibraryMatchers<typeof expect.stringContaining, R> {}
}

jest.mock('@/lib/api');

const mockedApiService = apiService as jest.Mocked<typeof apiService>;

describe('ProductList Component', () => {
  
  it('harus merender produk dari mock setelah loading selesai', async () => {
    render(<ProductList category="" params="homepage" />);

    expect(screen.getByText(/Product List.../i)).toBeInTheDocument();

    const title = await screen.findByText("Produk Mock 1");
    expect(title).toBeInTheDocument();
  });

  it('harus menyaring produk berdasarkan kategori yang diberikan', async () => {
    render(<ProductList category="pakaian" params="homepage" />);

    const product = await screen.findByText("Produk Mock 2");
    expect(product).toBeInTheDocument();

    expect(screen.queryByText("Produk Mock 1")).not.toBeInTheDocument();
  });

});
