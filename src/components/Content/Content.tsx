import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import { Column } from '../Column';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { reorderIssues } from '../../redux/issues';
import { Loader } from '../Loader';

export const Content: React.FC = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  const issuesToDo = useAppSelector((state) => state.issues.issues);
  const issuesInProgress = useAppSelector(
    (state) => state.issues.issuesInProgress
  );
  const issuesDone = useAppSelector((state) => state.issues.issuesDone);
  const status = useAppSelector((state) => state.issues.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'succeeded') {
      setIsContentVisible(true);
    }
  }, [status]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    dispatch(reorderIssues({ source, destination }));
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <h1 className="text-center mt-4">Repository not found</h1>;
  }

  if (!isContentVisible) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Row className="d-flex flex-nowrap m-0 p-0 mt-2">
        <Column
          title="Todo"
          className="pe-3"
          issues={issuesToDo}
          droppableId="issues"
        />
        <Column
          title="In Progress"
          className="pe-3"
          issues={issuesInProgress}
          droppableId="issuesInProgress"
        />
        <Column title="Done" issues={issuesDone} droppableId="issuesDone" />
      </Row>
    </DragDropContext>
  );
};
