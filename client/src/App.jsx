import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';
import { HeroList } from './components/HeroList';
import { HeroForm } from './components/HeroForm';

function App() {
  return (
    <main>
      <h1>Heroes of Might and Magic III</h1>
      <Divider />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <HeroList />
          </Grid.Column>
          <Grid.Column>
            <HeroForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </main>
  );
}

export default App;
