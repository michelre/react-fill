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
    }, 10)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.text !== this.props.text){
      this.updateStateNewText(nextProps);
    }
  }

  updateStateNewText(props){
    const tokens = words(props.text, /[^\s]+/g);
    const nbBlanks = Math.ceil(props.percentBlank * tokens.length);
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
      completedWords: [],
      unCompletedWords: [],
    };
    this.startTime = new Date().getTime();
  }

  completeWord(newPoints, key, isAutocomplete = false){
    const { completeAction } = this.props;
    const { points, completeKeys, missingWords } = this.state;
    let { completedWords, unCompletedWords } = this.state;
    const newCompleteKeys = R.union(completeKeys, [key]);
    const word = missingWords[key].original
    const done = !findNextKey(this.keys, newCompleteKeys)
    this.setState({ completeKeys: newCompleteKeys });
    if(isAutocomplete){
      unCompletedWords = unCompletedWords.concat([word]);
    } else {
      completedWords = completedWords.concat([word]);
    }
    this.setState({ unCompletedWords, completedWords });
    if(!done) {
      this.setState({ points: newPoints });
    } else {
      this.endTime = new Date().getTime();
      completeAction({ duration: this.endTime - this.startTime, points: newPoints },
        isAutocomplete, { completedWords, unCompletedWords });
    }
  }

  handleTab(lensState, originalValue, key){
    const { points } = this.state;
    let newState = R.set(lensState, originalValue, this.state);
    this.setState(newState)
    this.completeWord(points, key, true);
  }

  onChangeAction(e, key){
    const { points } = this.state;
    const { original, value } = this.state.missingWords[key];
    const { originalChars, valueChars } = { originalChars: chars(original), valueChars: chars(value) };
    const nextWantedChar = originalChars[valueChars.length];
    const lensState = R.lensPath(['missingWords', key, 'value']);
    if(e.target.value.toLowerCase() === `${value}${nextWantedChar}`.toLowerCase()){
      const nextValue = `${value}${originalChars[valueChars.length]}`
      this.setState(R.set(lensState, nextValue, this.state));
      if(nextValue === original){
        this.completeWord(points + 1, key, false);
      }
    }
  }

  onKeyUpAction(e, key){
    const { keypressAction } = this.props;
    const { original, value } = this.state.missingWords[key]
    const lensState = R.lensPath(['missingWords', key, 'value']);
    if(e.keyCode === 9 || e.keyCode === 13) {
      this.handleTab(lensState, original, key)
      e.preventDefault();
    }
    keypressAction(e)
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
              onKeyUp={(e) => this.onKeyUpAction(e, k)}
              onChange={(e) => this.onChangeAction(e, k)}
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
