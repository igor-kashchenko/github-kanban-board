import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Issue } from '../types/types';
import { Droppable } from 'react-beautiful-dnd';
import { IssueCard } from '../IssueCard';

type Props = {
  title: string;
  className?: string;
  issues: Issue[];
  droppableId: string;
};

export const Column: React.FC<Props> = ({
  title,
  className,
  issues,
  droppableId,
}) => {
  return (
    <Container
      className={`d-flex flex-column p-0 m-0 ${className} col-4`}
      style={{ maxHeight: '830px' }}
    >
      <h2 className="text-center">{title}</h2>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <Col
            className="bg-light overflow-auto border rounded p-3 pe-1"
            style={{ boxShadow: 'inset 0 10px 20px rgba(0, 0, 0, 0.1)' }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {issues
              .filter((issue) => issue !== null)
              .map((issue, index) => {
                const {
                  title,
                  id,
                  number,
                  comments,
                  user: { login, avatar_url },
                  created_at,
                  assignee,
                } = issue;

                return (
                  <IssueCard
                    id={id}
                    title={title}
                    key={id}
                    index={index}
                    number={number}
                    commentsNum={comments}
                    userLogin={login}
                    created_at={created_at}
                    avatar_url={avatar_url}
                    assignee={assignee ? assignee.login : null}
                    assignee_avatar={assignee ? assignee.avatar_url : undefined}
                  />
                );
              })}
            {issues.length === 0 && (
              <p className="text-muted">No issues in this column</p>
            )}
            {provided.placeholder}
          </Col>
        )}
      </Droppable>
    </Container>
  );
};
