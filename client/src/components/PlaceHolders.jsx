import React from 'react';
import { Table, Label, Placeholder, Form } from 'semantic-ui-react';

export const PlaceholderList = () => (
  <Table>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Label content="Loading..." />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const PlaceholderForm = () => (
  <Form>
    <Form.Field disabled>
      <label>Name</label>
      <input type="text"/>
    </Form.Field>
    <Form.Field disabled>
      <label>Movement Points</label>
      <input type="text"/>
    </Form.Field>
    <Form.Field disabled>
      <label>Town</label>
      <input type="text"/>
    </Form.Field>
    <Form.Button color="green" fluid content="Add Hero" icon="save" disabled />
  </Form>
);
