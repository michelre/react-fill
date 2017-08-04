import React from 'react';
import ReactDOM from 'react-dom';
import ReactFill from '../src/ReactFill';

import '../scss/style.scss';

const text = 'Le L\'orem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum';

ReactDOM.render(<ReactFill
  percentBlank={0.75}
  text={text}
  completeAction={(data) => console.log(data)}
  keypressAction={(e) => {}}
/>, document.querySelector('#app'));
