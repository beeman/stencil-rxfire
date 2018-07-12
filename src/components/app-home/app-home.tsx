import { Component, Listen } from '@stencil/core'

export class Poll {
  question: string
  answers: string[]
}

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {

  public polls: Poll[] = [
    {
      question: 'What do you think of Stencil?',
      answers: ['Great!', 'Awesome!', 'The Best!'],
    },
    {
      question: 'What is your favorite Firebase DB?',
      answers: ['Realtime Database', 'Firestore'],
    },
  ]

  @Listen('voted')
  votedHandler(event: CustomEvent) {
    alert(
      [
        'Poll   : ' + event.detail.question,
        'Answers: ' + event.detail.answers.join(', '),
        'Voted  : ' + event.detail.voted,
      ].join('\n'),
    )
  }

  render() {
    return (
      <div class="app-home">
        <stencil-route-link url='/add'>
          <button>
            Add Poll
          </button>
        </stencil-route-link>

        {this.polls.map(poll => (
          <app-poll question={poll.question} answers={poll.answers}/>
        ))}
      </div>
    )
  }
}
