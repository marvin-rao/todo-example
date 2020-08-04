import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { ListItem } from './list-item/list-item.component';


@Injectable({ providedIn: 'root' })
export class DataService {
    private dataSubject: BehaviorSubject<Array<ListItem>> = new BehaviorSubject([]);
    public readonly onDataSubject: Observable<Array<ListItem>> = this.dataSubject.asObservable();

    constructor(private http: HttpClient) {
        this.init();
    }

    private init(): void {
        const url = 'https://todo-example-server.vercel.app/db.json';
        this.http.get(url).subscribe((result: Array<ListItem>) => {
            this.dataSubject.next(result);
        });
    }

    public update(id: string, item: ListItem): void {
        const data = this.dataSubject.value;
        // data[index] = item;

        //  this.dataSubject.next(data);
    }

    public add(item: ListItem): void {
        const data = this.dataSubject.value;
        data.push(item);

        this.dataSubject.next(data);
    }

    public move(oldIdex: number, newIndex: number): void {
        const data = this.dataSubject.value;
        this.arrayMove(data, oldIdex, newIndex);

        this.dataSubject.next(data);
    }

    private arrayMove(arr: Array<any>, oldIndex: number, newIndex: number): void {
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
