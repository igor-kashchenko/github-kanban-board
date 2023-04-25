import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import issuesReducer from '../../../redux/issues';
import headerReducer from '../../../redux/header';
import { RootState } from '../../../redux/store';
import { Provider } from 'react-redux';
import { Rating } from '../Rating';
import '@testing-library/jest-dom/extend-expect';

const createTestStore = (state: RootState) => configureStore({
  reducer: { 
    issues: issuesReducer,
    header: headerReducer,
  },
  preloadedState: state,
})

describe('Rating component', () => {
  it('renders correct number of stars', () => {
    const state: RootState = {
      issues: {
        issues: [],
        issuesInProgress: [],
        issuesDone: [],
        status: 'idle',
        error: undefined,
        repoStars: 250,
        author: '',
        repoName: '',
      },
      header: {
        URL: '',
      },
    };

    const store = createTestStore(state);

    render(
      <Provider store={store}>
        <Rating />
      </Provider>
    )

    const starsElement = screen.getByText('250 stars');
    expect(starsElement).toBeInTheDocument();
  });

  it('renders 0 stars', () => {
    const state: RootState = {
      issues: {
        issues: [],
        issuesInProgress: [],
        issuesDone: [],
        status: 'idle',
        error: undefined,
        repoStars: 0,
        author: '',
        repoName: '',
      },
      header: {
        URL: '',
      },
    };

    const store = createTestStore(state);

    render(
      <Provider store={store}>
        <Rating />
      </Provider>
    )

    const starsElement = screen.getByText('0 stars');
    expect(starsElement).toBeInTheDocument();
  });

  it('renders 1 star', () => {
    const state: RootState = {
      issues: {
        issues: [],
        issuesInProgress: [],
        issuesDone: [],
        status: 'idle',
        error: undefined,
        repoStars: 1,
        author: '',
        repoName: '',
      },
      header: {
        URL: '',
      },
    };

    const store = createTestStore(state);

    render(
      <Provider store={store}>
        <Rating />
      </Provider>
    )
    
    const starsElement = screen.getByText('1 star');
    expect(starsElement).toBeInTheDocument();
  });
});






