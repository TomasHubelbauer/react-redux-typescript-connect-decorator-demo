import * as React from 'react';
import * as Redux from 'redux';
import { incrementEnthusiasm, decrementEnthusiasm, EnthusiasmAction } from '../actions/';
import { StoreState } from '../types/index';
import { Dispatch } from 'react-redux';
import { connect } from '../connect';

type HelloStateProps = {
  enthusiasmLevel: number;
};

type HelloDispatchProps = {
  incrementEnthusiasm: () => void;
  decrementEnthusiasm: () => void;
};

type HelloOwnProps = {
  name: string;
};

type HelloProps = HelloStateProps & HelloDispatchProps & HelloOwnProps;

type HelloState = {
  useHi: boolean;
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Hello extends React.Component<HelloProps, HelloState> {
  state: HelloState = { useHi: false };

  onChangeGreetingButtonClick: React.MouseEventHandler<HTMLButtonElement> = event =>
    this.setState(state => ({ useHi: !state.useHi }))

  render() {
    const { useHi } = this.state;
    const { name, enthusiasmLevel } = this.props;
    return (
      <div className="hello">
        {useHi ? 'Hi' : 'Hello'} {name} x{enthusiasmLevel}
        <div>
          <button onClick={this.props.decrementEnthusiasm}>-</button>
          <button onClick={this.props.incrementEnthusiasm}>+</button>
          <button onClick={this.onChangeGreetingButtonClick}>Change greeting</button>
        </div>
      </div>
    );
  }
}

export function mapStateToProps({ enthusiasmLevel }: StoreState): HelloStateProps {
  return { enthusiasmLevel };
}

export function mapDispatchToProps(dispatch: Dispatch<EnthusiasmAction>): HelloDispatchProps {
  return Redux.bindActionCreators({ incrementEnthusiasm, decrementEnthusiasm }, dispatch);
}
