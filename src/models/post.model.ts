export default interface Post {
  title: string;
  description: string;
  banner: string;
  attachments?: string;
  _id: string;
  timestamp: Date;
}
