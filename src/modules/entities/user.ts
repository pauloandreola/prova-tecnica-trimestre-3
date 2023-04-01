export class User {
  'idUser': string
  'name': string
  'email': string
  'password': string

  constructor (idUser: string, name:string, email: string, password: string) {
    this.idUser = idUser
    this.name = name
    this.email = email
    this.password = password
  }
}
