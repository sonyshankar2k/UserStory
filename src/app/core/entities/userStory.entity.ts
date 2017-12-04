import { TransactionalBase } from './transactionalBase.entity';

export class UserStory extends TransactionalBase {
    public userId: number;
    public id: number;
    public title: string;
    public body: string;
}
