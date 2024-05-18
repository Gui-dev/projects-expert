import {
  type Subscriber,
  type IVotingPubSubContract,
  type Message,
} from '../contracts/voting-pub-sub-contract'

class VotingPubSub implements IVotingPubSubContract {
  private readonly channels: Record<string, Subscriber[]> = {}

  public subscriber(poll_id: string, subscriber: Subscriber): void {
    if (!this.channels[poll_id]) {
      this.channels[poll_id] = []
    }
    this.channels[poll_id].push(subscriber)
  }

  public publisher(poll_id: string, message: Message): void {
    if (!this.channels[poll_id]) {
      return
    }

    for (const subscriber of this.channels[poll_id]) {
      subscriber(message)
    }
  }
}

export const voting = new VotingPubSub()
