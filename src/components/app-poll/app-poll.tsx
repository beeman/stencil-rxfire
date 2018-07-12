import { Component, Event, EventEmitter, Listen, Prop } from '@stencil/core'

@Component({
  tag: 'app-poll'
})
export class AppPoll {
  @Prop() question: string = 'Do you like polls?';
  @Prop() answers: string[] = ['Yes', 'No'];
  @Event() voted: EventEmitter;

  @Listen('vote')
  votedHandler(event: CustomEvent) {
    this.voted.emit({
      question: this.question,
      answers: this.answers,
      voted: event.detail,
    })
  }

  render() {
    return (
      <div>
        <p>{ this.question }</p>
        <ul>
          {
            this.answers.map(answer => <app-poll-item answer={answer} />)
          }
        </ul>
      </div>
    );
  }

}
