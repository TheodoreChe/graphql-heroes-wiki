import React from 'react';
import { HeroList } from './components/HeroList';
import { HeroForm } from './components/HeroForm';

function App() {
  return (
    <main>
      <h1>Heroes of Might and Magic III</h1>
      <h3>Heroes List</h3>
      <HeroList />
      <h3>Add Hero</h3>
      <HeroForm />
    </main>
  );
}

export default App;
