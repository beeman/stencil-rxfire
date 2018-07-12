import { Component, Event, Prop, EventEmitter } from '@stencil/core';

@Component({
  tag: 'app-poll-item'
})
export class AppPollItem {
  @Prop() answer: string;
  @Event() vote: EventEmitter;

  render() {
    return (
      <li>
        <button onClick={() => this.vote.emit(this.answer)}>
          {this.answer}
        </button>
      </li>
    );
  }

}
