import { createSlice, createAsyncThunk, Slice } from '@reduxjs/toolkit';
import { Issue } from '../components/types/types';

type IssuesState = {
  issues: Issue[];
  issuesInProgress: Issue[];
  issuesDone: Issue[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
  repoStars: number;
  author: string;
  repoName: string;
};

const initialState: IssuesState = {
  issues: [],
  issuesInProgress: [],
  issuesDone: [],
  status: 'idle',
  error: undefined,
  repoStars: 0,
  author: '',
  repoName: '',
};

const issuesSlice: Slice<IssuesState> = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    reorderIssues: (state, action) => {
      const { source, destination } = action.payload;

      const findIssuesArray = (droppableId: string): Issue[] => {
        switch (droppableId) {
          case 'issues':
            return state.issues;
          case 'issuesInProgress':
            return state.issuesInProgress;
          case 'issuesDone':
            return state.issuesDone;
          default:
            throw new Error(`Invalid droppableId: ${droppableId}`);
        }
      };

      const sourceIssues = findIssuesArray(source.droppableId);
      const destinationIssues = findIssuesArray(destination.droppableId);

      const [removed] = sourceIssues.splice(source.index, 1);
      destinationIssues.splice(destination.index, 0, removed);

      const localStorageKey = `repo_${state.author}/${state.repoName}`;

      const dataToSave = {
        todo: state.issues,
        inProgress: state.issuesInProgress,
        done: state.issuesDone,
        author: state.author,
        repoName: state.repoName,
        stars: state.repoStars,
      };

      localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        Object.assign(state, initialState);
        state.status = 'loading';
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.issues = action.payload.todo;
        state.issuesInProgress = action.payload.inProgress;
        state.issuesDone = action.payload.done;
        state.author = action.payload.author;
        state.repoName = action.payload.repoName;
        state.repoStars = action.payload.stars;
        state.status = 'succeeded';
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const fetchIssues = createAsyncThunk(
  'issues/fetch',
  async (ownerAndRepo: string) => {
    const repoInfoUrl = `https://api.github.com/repos/${ownerAndRepo}`;
    const todoUrl = `https://api.github.com/repos/${ownerAndRepo}/issues?state=open&per_page=50`;
    const inProgressUrl = `https://api.github.com/repos/${ownerAndRepo}/issues?state=open&per_page=50&assignee=*`;
    const doneUrl = `https://api.github.com/repos/${ownerAndRepo}/issues?state=closed&per_page=50`;

    const author = ownerAndRepo.split('/')[0];
    const repoName = ownerAndRepo.split('/')[1];

    const [repoInfoResponse, todoResponse, inProgressResponse, doneResponse] =
      await Promise.all([
        fetch(repoInfoUrl),
        fetch(todoUrl),
        fetch(inProgressUrl),
        fetch(doneUrl),
      ]);

    const localStorageKey = `repo_${ownerAndRepo}`;

    const localStorageData = localStorage.getItem(localStorageKey);

    if (
      ![repoInfoResponse, todoResponse, inProgressResponse, doneResponse].every(
        (response) => response.ok
      )
    ) {
      throw new Error(`Failed to fetch issues: One or more requests failed.`);
    }

    const [repoInfo, todoIssues, inProgressIssues, doneIssues] =
      await Promise.all([
        repoInfoResponse.json(),
        todoResponse.json(),
        inProgressResponse.json(),
        doneResponse.json(),
      ]);

    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      parsedData.stars = repoInfo.stargazers_count;
    }

    const dataToSave = {
      todo: todoIssues,
      inProgress: inProgressIssues,
      done: doneIssues,
      author,
      repoName,
      stars: repoInfo.stargazers_count,
    };

    localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));

    return dataToSave;
  }
);

export const { reorderIssues } = issuesSlice.actions;

export default issuesSlice.reducer;
