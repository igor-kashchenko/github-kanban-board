import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Content } from '../Content';

const mockStore = configureMockStore();

const initialStateLoading = {
  issues: {
    status: 'loading',
    issues: [],
    issuesInProgress: [],
    issuesDone: [],
  },
};

const initialStateFailed = {
  issues: {
    status: 'failed',
    issues: [],
    issuesInProgress: [],
    issuesDone: [],
  },
};

const initialStateSucceeded = {
  header: {
    URL: 'https://api.github.com/repos/your-repo-url',
  },
  issues: {
    status: 'succeeded',
    issues: [
      {
        id: '1',
        title: 'Issue 1',
        content: 'Content 1',
        user: { login: 'user1', avatar_url: 'avatar_url_1' },
      },
    ],
    issuesInProgress: [
      {
        id: '2',
        title: 'Issue 2',
        content: 'Content 2',
        user: { login: 'user2', avatar_url: 'avatar_url_2' },
      },
    ],
    issuesDone: [
      {
        id: '3',
        title: 'Issue 3',
        content: 'Content 3',
        user: { login: 'user3', avatar_url: 'avatar_url_3' },
      },
    ],
  },
};

describe('Content', () => {
  test('renders Loader when status is loading', () => {
    const store = mockStore(initialStateLoading);
    render(
      <Provider store={store}>
          <Content />
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders error message when status is failed', () => {
    const store = mockStore(initialStateFailed);
    render(
      <Provider store={store}>
          <Content />
      </Provider>
    );

    expect(screen.getByText(/repository not found/i)).toBeInTheDocument();
  });

  test('renders columns with correct titles when status is succeeded', () => {
    const store = mockStore(initialStateSucceeded);
    render(
      <Provider store={store}>
          <Content />
      </Provider>
    );

    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});