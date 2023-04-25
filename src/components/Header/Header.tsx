import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchIssues } from '../../redux/issues';
import { setURL } from '../../redux/header';
import { parseURL } from '../../utils/utils';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const URL = useAppSelector((state) => state.header.URL);
  const status = useAppSelector((state) => state.issues.status);

  const disabled = status === 'loading';

  const handleLoadIssues = (event: React.FormEvent) => {
    event.preventDefault();
    const ownerAndRepo = parseURL(URL);
    const localStorageKey = `repo_${ownerAndRepo}`;
    const localStorageData = localStorage.getItem(localStorageKey);

    if (!localStorageData) {
      dispatch(fetchIssues(ownerAndRepo));
    } else {
      const parsedData = JSON.parse(localStorageData);
      dispatch({ type: fetchIssues.fulfilled.type, payload: parsedData });
    }
  };

  const handleURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setURL(event.target.value));
  };

  return (
    <Navbar bg="light" className="p-3 rounded">
      <Form className="d-flex w-100" onSubmit={handleLoadIssues} data-testid="header-form">
        <FormControl
          type="url"
          required
          placeholder="Enter repo URL"
          className="me-2 w-80"
          value={URL}
          onChange={handleURLChange}
          pattern="https:\/\/github\.com\/[^\/]+\/[^\/]+$"
          title="https://github.com/author/repoName"
        />

        <Button
          variant="primary"
          className="text-nowrap w-20"
          type="submit"
          disabled={disabled}
          data-testid="load-issues-button"
        >
          {disabled ? 'Loading...' : 'Load issues'}
        </Button>
      </Form>
    </Navbar>
  );
};
