import React from 'react';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import Image from 'react-bootstrap/Image';
import { useAppSelector } from '../../redux/hooks';
import commentLogo from '../../assets/comment.svg';
import Container from 'react-bootstrap/Container';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  id: number;
  title: string;
  index: number;
  number: number;
  userLogin: string;
  commentsNum: number;
  created_at: string;
  avatar_url: string;
  assignee: null | string;
  assignee_avatar: undefined | string;
};

export const IssueCard: React.FC<Props> = ({
  title,
  number,
  userLogin,
  commentsNum,
  created_at,
  avatar_url,
  assignee,
  index,
  assignee_avatar,
  id,
}) => {
  const URL = useAppSelector((state) => state.header.URL);

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <Card
          className="mb-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card.Body>
            <Card.Title className="text-truncate pb-2 m-0">
              <Card.Link
                href={`${URL}/issues/${number}`}
                target="_blank"
                className="text-decoration-none"
                title={title}
              >
                {title}
              </Card.Link>
            </Card.Title>

            <Card.Text>
              {`#${number} opened ${moment(created_at).fromNow()}`}
            </Card.Text>

            {assignee && (
              <Card.Text className="m-0 d-flex align-items-center mb-2">
                Assignee:
                <Card.Link
                  href={`https://github.com/${assignee}`}
                  target="_blank"
                  className="text-decoration-none d-flex align-items-center ms-2"
                >
                  {assignee}

                  <Image
                    src={assignee_avatar}
                    alt="assignee avatar"
                    roundedCircle
                    width={20}
                    height={20}
                    className="mx-1"
                  />
                </Card.Link>
              </Card.Text>
            )}

            <Container className="p-0 d-flex align-items-center ">
              <Card.Text className="d-flex align-items-center justify-content-between">
                <span>By</span>

                <Card.Link
                  href={`${URL}/issues/created_by/${userLogin}`}
                  target="_blank"
                  className="text-decoration-none d-flex align-items-center ms-2"
                >
                  {`${userLogin}`}

                  <Image
                    src={avatar_url}
                    alt="avatar"
                    roundedCircle
                    width={20}
                    height={20}
                    className="mx-1"
                  />
                </Card.Link>

                {commentsNum > 0 && (
                  <Card.Link
                    href={`${URL}/issues/${number}`}
                    target="_blank"
                    className="text-decoration-none d-flex align-items-center"
                  >
                    <Image
                      src={commentLogo}
                      alt="comment logo"
                      roundedCircle
                      width={20}
                      height={20}
                      className="mx-1"
                    />

                    {`${commentsNum}`}
                  </Card.Link>
                )}
              </Card.Text>
            </Container>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};
