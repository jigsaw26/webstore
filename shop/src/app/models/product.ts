import { Schema, Document } from 'mongoose';
import { ObjectId } from 'mongodb';


export class Product {
    constructor(
        public _id: ObjectId,
        public name: string,
        public price: string,
        public urlImage: string,
        public description: string) {}
}