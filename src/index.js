import React from 'react';
import ReactDOM from 'react-dom';

import ReactFill from './ReactFill';

const text = 'Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum';

ReactDOM.render(<ReactFill
  nbBlanks={8}
  text={text}
  completeAction={(data) => console.log(data)}
/>, document.querySelector('#app'));
