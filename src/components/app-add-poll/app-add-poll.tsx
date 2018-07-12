import { Component } from '@stencil/core'

@Component({
  tag: 'app-add-poll'
})
export class AppAddPoll {
  render() {
    return (
      <div>
        <stencil-route-link url='/'>
          <button>
            Back
          </button>
        </stencil-route-link>


        <div>
          I am here to add the polls!
        </div>
      </div>
    )
  }
}
