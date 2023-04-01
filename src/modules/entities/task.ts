export class Task {
  'idTask': string
  'title': string
  'description': string
  'done': boolean
  'createdAt': string
  'updateAt': string

  constructor (idTask: string, title: string, description: string, done: boolean, createdAt: string, updatedAt: string) {
    this.idTask = idTask
    this.title = title
    this.description = description
    this.done = done
    this.createdAt = createdAt
    this.updateAt = updatedAt
  }
}
