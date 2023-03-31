export class User {
  'idUser': string
  'name': string
  'email': string
  'password': string
  'createdAt': Date
  'updatedAt': Date

  constructor (idUser: string, name:string, email: string, password: string, createdAt: Date, updatedAt: Date) {
    this.idUser = idUser
    this.name = name
    this.email = email
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
