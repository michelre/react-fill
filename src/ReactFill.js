import React from 'react';
import R from 'ramda';
import chars from 'voca/chars';
import words from 'voca/words';

import { getRandoms, findNextKey } from './utils';
import '../scss/style.scss';

class ReactFill extends React.Component {

  constructor(props){
    super(props);
    const tokens = words(props.text);
    const missingIndexes = getRandoms(props.nbBlanks, tokens.length - 1);
    const data = R.map((idx) =>
      [`${idx}-${tokens[idx]}`, { original: tokens[idx], value: '' }], missingIndexes);

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

  componentDidMount(){
    this.refs[this.state.focusKey].focus()
  }

  focusNextKey(newPoints, key){
    const { completeAction } = this.props;
    const { focusKey, points, completeKeys } = this.state;
    const newCompleteKeys = R.union(completeKeys, [key]);
    const nextKey = findNextKey(this.keys, key, newCompleteKeys)
    this.setState({ focusKey: nextKey, completeKeys: newCompleteKeys });
    if(nextKey) {
      this.setState({ points: newPoints });
      this.refs[nextKey].focus();
    }
    if(!nextKey) {
      this.endTime = new Date().getTime();
      completeAction({ duration: this.endTime - this.startTime, points: newPoints })
    }
  }

  handleTab(lensState, originalValue, key){
    const { points } = this.state;
    this.setState(R.set(lensState, originalValue, this.state))
    this.focusNextKey(points, key);
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
        this.focusNextKey(points + 1, key);
      }
    }
  }

  render(){
    const mapIndex = R.addIndex(R.map);
    const { missingWords, tokens } = this.state;
    return <div>
      {mapIndex((token, idx) => {
        const k = `${idx}-${token}`;
        if(missingWords[k]) {
          return <div className="missing-word" key={k}>
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
          </div>
        } else {
          return <span key={k}>{token}&nbsp;</span>
        }
      }, tokens)}
    </div>
  }
}

export default ReactFill;
