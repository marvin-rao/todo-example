import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { ListItem } from './list-item/list-item.component';
import * as localForage from 'localforage';

export type List = Array<ListItem>;

@Injectable({ providedIn: 'root' })
export class DataService {
    private storageKey = 'todo-cache-0002';
    private dataSubject: BehaviorSubject<List> = new BehaviorSubject([]);
    public readonly onDataSubject: Observable<List> = this.dataSubject.asObservable();

    constructor(private http: HttpClient) {
        this.init();
    }

    private init(): void {
        const url = 'https://todo-example-server.vercel.app/db.json';

        localForage.getItem(this.storageKey).then((data: List) => {
            if (data) {
                this.dataSubject.next(data);
            }
        });

        // this.http.get(url).subscribe((list: List) => this.next(list));
    }

    private next(data: List): void {
        this.dataSubject.next(data);
        localForage.setItem(this.storageKey, data);
    }

    public update(task: ListItem): void {
        const list: List = this.dataSubject.value;

        list[this.indexOfTask(list, task)] = task;

        this.next(list);
    }

    indexOfTask(list: List, task: ListItem): number {
        return list.findIndex((t: ListItem) => t.id === task.id);
    }

    public new(title: string, description: string, dueDate: string): void {
        const data: List = this.dataSubject.value;

        const task: ListItem = {
            title,
            id: + new Date() + '',
            dueDate,
            text: description
        } as ListItem;

        data.push(task);

        this.next(data);
    }

    delete(task: ListItem): void {
        const list: List = this.dataSubject.value;

        list.splice(this.indexOfTask(list, task), 1);

        this.next(list);
    }

    public move(oldIdex: number, newIndex: number): void {
        const data = this.dataSubject.value;
        this.arrayMove(data, oldIdex, newIndex);

        this.next(data);
    }

    private arrayMove(arr: List, oldIndex: number, newIndex: number): void {
        while (oldIndex < 0) {
            oldIndex += arr.length;
        }
        while (newIndex < 0) {
            newIndex += arr.length;
        }
        if (newIndex >= arr.length) {
            let k = newIndex - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    }

}
