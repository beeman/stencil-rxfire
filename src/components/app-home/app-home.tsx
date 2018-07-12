import { Component, Listen } from '@stencil/core'
import { firestore, initializeApp } from 'firebase'
import 'firebase/firestore'
import { collection } from 'rxfire/firestore'
import { map } from 'rxjs/operators'

export const app = initializeApp({
  apiKey: 'AIzaSyB-bZ3-OR7H06meylTtvyhhkDM077WqRZ8',
  authDomain: 'rxfire-test-edbfa.firebaseapp.com',
  databaseURL: 'https://rxfire-test-edbfa.firebaseio.com',
  projectId: 'rxfire-test-edbfa',
  storageBucket: 'rxfire-test-edbfa.appspot.com',
  messagingSenderId: '323171055725',
})

export class Poll {
  question: string
  answers: string[]
}

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  private db: firestore.Firestore
  private collection: firestore.CollectionReference

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

  constructor() {
    this.db = app.firestore()
    this.collection = this.db.collection('Polls')

    collection(this.collection)
      .pipe(map(docs => docs.map(d => d.data())))
      .subscribe((polls: Poll[]) => (this.polls = polls))
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
