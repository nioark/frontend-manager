import { Observable, BehaviorSubject, map } from "rxjs"

export class ListenData<T extends {id?:number, deleted_at?:string}> {
  data$: Observable<T[]>

  private _data: BehaviorSubject<T[]>
  constructor(initValue:T[]) {
    initValue = initValue?.length ? initValue : []
    this._data = new BehaviorSubject<T[]>(initValue)
    this.data$ = this._data.asObservable().pipe(
      map((data)=> {
        console.log("Inside LISTENDATA PIPE: ", data)
        return data?.length ? data : []
        }
      )
    )
  }

  add(value:T):void {
    // console.log("Inside listendata add: ", this._data?.value, value)
    // const newData = [value].concat(this._data?.value.slice() || [])
    this._data.next([value, ...this._data?.value])
    // console.log("Inside listendata add after: ", this._data?.value, value)

  }

  edit(value:T):void {
    const index = this._data.value.findIndex((item)=> item.id === value?.id)
    if(index !== -1) {
      this._data.value[index] = value
      this._data.next(this._data.value)
    }
  }

  delete(id:number):void {
    const index = this._data.value.findIndex((item)=> item.id === id)
    if(index !== -1) {
      this._data.value.splice(index, 1)
      this._data.next(this._data.value)
    }
  }

  softDelete(id:number):void {
    const index = this._data.value.findIndex((item)=> item.id === id)
    if(index !== -1) {
      this._data.value[index].deleted_at = new Date().toISOString()
      this._data.next(this._data.value)
    }
  }
}
