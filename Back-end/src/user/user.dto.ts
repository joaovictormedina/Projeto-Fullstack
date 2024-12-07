export class CreateUserDto {
  name: string;
  cpf: string;
  cau: string;
  email: string;
  password: string;
  profession: string;
  datanascimento?: Date;
  cep?: string;
  numero?: string;
  endereco?: string;
  bairro?: string;
  municipio?: string;
  estado?: string;
  complemento?: string;
  photopath?: string;
}
