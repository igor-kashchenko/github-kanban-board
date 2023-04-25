import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { Breadcrumbs } from '../Breadcrumbs';
import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '../../../redux/issues';
import headerReducer from '../../../redux/header';
import { RootState } from '../../../redux/store';

const createTestStore = (state: RootState) => configureStore({
  reducer: { 
    issues: issuesReducer,
    header: headerReducer,
  },
  preloadedState: state,
});

const succeededState: RootState = {
  issues: {
    status: 'succeeded',
    author: 'testAuthor',
    repoName: 'testRepo',
    issues: [], 
    issuesInProgress: [], 
    issuesDone: [], 
    error: undefined, 
    repoStars: 0,
  },
  header: {
    URL: '',
  },
};

const failedState: RootState = {
  issues: {
    status: 'failed',
    author: 'testAuthor',
    repoName: 'testRepo',
    issues: [],
    issuesInProgress: [],
    issuesDone: [],
    error: undefined,
    repoStars: 0,
  },
  header: {
    URL: '',
  },
};

describe('Breadcrumbs', () => {
  it('renders breadcrumbs with valid author and repoName', () => {
    const store = createTestStore(succeededState)

    render(
      <Provider store={store}>
        <Breadcrumbs />
      </Provider>,
    );

    expect(screen.getByText('testAuthor')).toBeInTheDocument();
    expect(screen.getByText('testRepo')).toBeInTheDocument();
    expect(screen.getByText('testAuthor').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/testAuthor',
    );
    expect(screen.getByText('testRepo').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/testAuthor/testRepo',
    );
  });

  it('does not render breadcrumbs when status is not "succeeded"', () => {
    const store = createTestStore(failedState)

    render(
      <Provider store={store}>
        <Breadcrumbs />
      </Provider>,
    );

    expect(screen.queryByText('testAuthor')).not.toBeInTheDocument();
    expect(screen.queryByText('testRepo')).not.toBeInTheDocument();
  });
});