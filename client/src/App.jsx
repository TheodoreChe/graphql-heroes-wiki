import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { HeroList } from './components/HeroList';
import { HeroForm } from './components/HeroForm';

function App() {
  return (
    <main>
      <h1>Heroes of Might and Magic III</h1>

      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <HeroForm />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <HeroList />
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
    </main>
  );
}

export default App;
