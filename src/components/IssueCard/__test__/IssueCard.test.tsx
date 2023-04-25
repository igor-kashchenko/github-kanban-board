import { render, screen } from '@testing-library/react';
import { IssueCard } from '../IssueCard';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import '@testing-library/jest-dom/extend-expect';

const sampleProps = {
  id: 1,
  title: 'Sample Issue',
  index: 0,
  number: 123,
  userLogin: 'user123',
  commentsNum: 5,
  created_at: '2023-04-24T10:30:00Z',
  avatar_url: 'https://example.com/avatar_url',
  assignee: 'assignee123',
  assignee_avatar: 'https://example.com/assignee_avatar',
};

describe('IssueCard component', () => {
  beforeEach(() => {
    render(
    <Provider store={store}>
      <DragDropContext onDragEnd={() => undefined}>
        <Droppable droppableId="test-droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <IssueCard {...sampleProps} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Provider>
    );
  });

  it('renders issue title', () => {
    const titleElement = screen.getByTitle(sampleProps.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders issue number', () => {
    const numberElement = screen.getByText(new RegExp(`#${sampleProps.number}`));
    expect(numberElement).toBeInTheDocument();
  });

  it('renders user login', () => {
    const userLoginElement = screen.getByText(sampleProps.userLogin);
    expect(userLoginElement).toBeInTheDocument();
  });

  it('renders comments number', () => {
    const commentsNumElement = screen.getByText(`${sampleProps.commentsNum}`);
    expect(commentsNumElement).toBeInTheDocument();
  });

  it('renders assignee', () => {
    const assigneeElement = screen.getByText(sampleProps.assignee);
    expect(assigneeElement).toBeInTheDocument();
  });
});