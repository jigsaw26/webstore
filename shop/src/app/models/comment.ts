import { ObjectId } from 'mongodb';

export class Comment {
    constructor(
        public name: string,
        public text: string,
        public productId: ObjectId) {}
}