import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { Header } from '../Header';
import { act } from 'react-dom/test-utils';
import { fetchIssues } from '../../../redux/issues';

describe('Header', () => {
  it('renders the Header component', () => {

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Enter repo URL')).toBeInTheDocument();
    expect(screen.getByText(/Load issues/i)).toBeInTheDocument();
  });

  it('handles input change', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  
    const input = screen.getByPlaceholderText('Enter repo URL');
    await act(async () => {
      userEvent.type(input, 'https://github.com/author/repoName');
    });
  
    await waitFor(() => expect(input).toHaveValue('https://github.com/author/repoName'));
  });

  it('button displays "Load issues" when issues are not being fetched', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /load issues/i });

    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Load issues');
  })

  it('displays "Loading..." when issues are being fetched', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  
    const input = screen.getByPlaceholderText('Enter repo URL');
    const button = screen.getByText(/Load issues/i);
  
    await act(async () => {
      userEvent.type(input, 'https://github.com/author/repoName');
    });
  
    await act(async () => {
      store.dispatch({ type: fetchIssues.pending.type });
    });
  
    await waitFor(() => expect(button).toHaveTextContent('Loading...'));
  });

  it('displays an error message when an invalid URL is entered', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
  
    const input = screen.getByPlaceholderText('Enter repo URL');
    const button = screen.getByRole('button');
  
    await act(async () => {
      userEvent.type(input, 'invalid_url');
    });
  
    expect(button).toBeDisabled();
  
    await waitFor(() => {
      expect(input).toHaveAttribute('title', 'https://github.com/author/repoName');
    });
  });
});