import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class NotificationSchema {
  @Field({ nullable: true })
  message?: string;
}

export interface INotification {
  message?: string;
}
