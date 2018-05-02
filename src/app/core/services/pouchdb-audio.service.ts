import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

@Injectable()
export class PouchdbAudioService {
  db: any;


  constructor() {
    if (!this.db) this.db = new PouchDB('angular-podcast-audio');
    this.createIndexes();
  }


  private async createIndexes() {
    try {
      await this.db.createIndex({ index: { fields: ['lastPlay'] } });
    } catch (err) {
      console.log(err);
    }
  }


  public getAll(): Promise<any> {
    return this.db.allDocs({ include_docs: true });
  }


  public query(query: any, sort: any, limit: number = 1): Promise<any> {
    return this.db.find({
      selector: query,
      sort: [sort],
      limit
    });
  }


  public getOne(id: string): Promise<any> {
    return this.db.get(id);
  }


  public async putOne(id: string, document: any): Promise<any> {
    let doc = null;

    try {
      doc = await this.getOne(id);
    } catch (e) {
      if (e.status !== 404) throw new Error(e);
    }

    if (doc) {
      return this.db.put({ ...document, _id: id, _rev: doc._rev, lastPlay: new Date() });
    }

    return this.db.put({ ...document, _id: id, lastPlay: new Date() });
  }
}
