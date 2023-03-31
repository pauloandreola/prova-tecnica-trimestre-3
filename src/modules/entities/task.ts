export class Task {
  'idTask': string
  'title': string
  'description': string
  'effort': number
  'createdAt': Date
  'updateAt': Date

  constructor (idTask: string, title: string, description: string, effort: number, createdAt: Date, updatedAt: Date) {
    this.idTask = idTask
    this.title = title
    this.description = description
    this.effort = effort
    this.createdAt = createdAt
    this.updateAt = updatedAt
  }
}
