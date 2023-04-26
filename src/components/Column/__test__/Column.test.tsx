import { render } from '@testing-library/react';
import { Column } from '../Column';
import { Provider } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { store } from '../../../redux/store';
import '@testing-library/jest-dom/extend-expect';
import { Issue } from '../../types/types';

const defaultProps = {
  title: 'Test Column',
  className: 'test-class',
  issues: [],
  droppableId: 'test-droppable',
};

type Props = {
  issues?: Issue[];
};

const mockIssue: Issue = {
  title: 'Test Issue',
  id: 1,
  number: 1,
  comments: 0,
  user: {
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.jpg',
  },
  state: 'open',
  created_at: '2022-01-01T00:00:00Z',
  assignee: {
    login: '',
    avatar_url: '',
  },
};

const mockIssues: Issue[] = [mockIssue];

const MockComponent: React.FC<Props> = ({ issues = [] }) => (
  <Provider store={store}>
    <DragDropContext onDragEnd={() => undefined}>
      <Column {...defaultProps} issues={issues} />
    </DragDropContext>
  </Provider>
);

describe('Column', () => {
  it('renders the title', () => {
    const { getByText } = render(<MockComponent />);
    expect(getByText('Test Column')).toBeInTheDocument();
  });

  it('renders the issues', () => {
    const { getByText } = render(<MockComponent issues={mockIssues} />);
    expect(getByText(mockIssue.title)).toBeInTheDocument();
  });

  it('renders the "No issues" message if there are no issues', () => {
    const { getByText } = render(<MockComponent issues={[]} />);
    expect(getByText('No issues in this column')).toBeInTheDocument();
  });
});
