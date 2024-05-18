export interface Message {
  poll_option_id: string
  votes: number
}
export type Subscriber = (message: Message) => void

export interface IVotingPubSubContract {
  subscriber: (poll_id: string, subscriber: Subscriber) => void
  publisher: (poll_id: string, message: Message) => void
}
