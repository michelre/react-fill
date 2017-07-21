import React from 'react';
import R from 'ramda';
import chars from 'voca/chars';
import words from 'voca/words';

import { getRandoms, findNextKey } from './utils';
import '../scss/style.scss';

class ReactFill extends React.Component {

  constructor(props){
    super(props);
    this.updateStateNewText(props);
  }

  componentDidMount(){
    this.refs[this.state.focusKey].focus()
    this.intervalID = setInterval(() => {
      const nextKey = findNextKey(this.keys, this.state.completeKeys);
      if(nextKey){
        this.refs[nextKey].focus();
      }
    }, 200)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.text !== this.props.text){
      this.updateStateNewText(nextProps);
    }
  }

  updateStateNewText(props){
    const tokens = words(props.text, /[^\s]+/g);
    const nbBlanks = Math.floor(props.percentBlank * tokens.length);
    const missingIndexes = getRandoms(nbBlanks, tokens.length);
    const data = R.map((idx) => [`${idx}-${tokens[idx]}`, { original: tokens[idx], value: '' }], missingIndexes)

    this.refs = {}
    this.keys = R.map((idx) => `${idx}-${tokens[idx]}`, missingIndexes);
    this.state = {
      missingWords: R.fromPairs(data),
      tokens,
      focusKey: R.head(this.keys),
      completeKeys: [],
      points: 0,
    };
    this.startTime = new Date().getTime();
  }

  completeWord(newPoints, key){
    const { completeAction } = this.props;
    const { points, completeKeys } = this.state;
    const newCompleteKeys = R.union(completeKeys, [key]);
    const done = !findNextKey(this.keys, newCompleteKeys)
    this.setState({ completeKeys: newCompleteKeys });
    if(!done) {
      this.setState({ points: newPoints });
    } else {
      this.endTime = new Date().getTime();
      completeAction({ duration: this.endTime - this.startTime, points: newPoints })
    }
  }

  handleTab(lensState, originalValue, key){
    const { points } = this.state;
    let newState = R.set(lensState, originalValue, this.state);
    this.setState(newState)
    this.completeWord(points, key);
  }

  onKeyPressAction(e, key){
    const { original, value } = this.state.missingWords[key]
    const { points, completeKeys } = this.state;
    const originalChars = chars(original);
    const valueChars = chars(value);
    const currentIdx = (valueChars.length === 0) ? 0 : valueChars.length;
    const lensState = R.lensPath(['missingWords', key, 'value']);
    if(e.keyCode === 9) {
      this.handleTab(lensState, original, key)
      e.preventDefault();
    }
    if (e.key === originalChars[currentIdx]) {
      this.setState(R.set(lensState, `${value}${e.key}`, this.state));
      if(currentIdx === originalChars.length - 1) {
        this.completeWord(points + 1, key);
      }
    }
  }

  render(){
    const mapIndex = R.addIndex(R.map);
    const { missingWords, tokens } = this.state;
    if(!missingWords) return null;
    return <div className={this.props.className}>
      {mapIndex((token, idx) => {
        const k = `${idx}-${token}`;
        if(missingWords[k]) {
          return <span className="missing-word" key={k}>
            <input
              ref={(input) => this.refs = R.merge(this.refs, { [k]: input })}
              id={k}
              value={missingWords[k].value}
              onKeyDown={(e) => this.onKeyPressAction(e, k)}
            />
            <label htmlFor={k}>
              {mapIndex((char, idx) => {
                const valueChar = chars(missingWords[k].value)[idx];
                return valueChar || <i key={idx} className="dot" />
              }, chars(missingWords[k].original))}

            </label>&nbsp;
          </span>
        } else {
          return `${token} `
        }
      }, tokens)}
    </div>
  }
}

export default ReactFill;
