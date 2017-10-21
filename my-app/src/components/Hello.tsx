import * as React from 'react';
import * as Redux from 'redux';
import { incrementEnthusiasm, decrementEnthusiasm, EnthusiasmAction } from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

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
  isInverted: boolean;
};

class Hello extends React.Component<HelloProps, HelloState> {
  render() {
    if (this.props.enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }
  
    return (
      <div className="hello">
        <div className="greeting">
          Hello {this.props.name + Array.from({ length: this.props.enthusiasmLevel + 1 }).join('!')}
        </div>
        <div>
          <button onClick={this.props.decrementEnthusiasm}>-</button>
          <button onClick={this.props.incrementEnthusiasm}>+</button>
        </div>
      </div>
    );
  }
}

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState): HelloStateProps {
  return {
    enthusiasmLevel
  };
}

export function mapDispatchToProps(dispatch: Dispatch<EnthusiasmAction>): HelloDispatchProps {
  return Redux.bindActionCreators({ incrementEnthusiasm, decrementEnthusiasm }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
