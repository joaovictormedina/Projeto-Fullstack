import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users') // Nome da tabela no banco de dados
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  cau: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: ['engenheiro', 'arquiteto', 'consultor', 'loja', 'escritorio'],
    default: 'engenheiro',
  })
  userType: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  datanascimento: Date;

  @Column({ nullable: true, length: 10 })
  cep: string;

  @Column({ nullable: true, length: 10 })
  numero: string;

  @Column({ nullable: true, length: 255 })
  endereco: string;

  @Column({ nullable: true, length: 255 })
  bairro: string;

  @Column({ nullable: true, length: 255 })
  municipio: string;

  @Column({ nullable: true, length: 2 })
  estado: string;

  @Column({ nullable: true, length: 255 })
  complemento: string;

  @Column({ nullable: true, length: 255 })
  photopath: string;

  // Validação da senha
  validatePassword() {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(this.password)) {
      throw new Error(
        'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.',
      );
    }
  }

  // Antes de inserir, criptografar a senha
  @BeforeInsert()
  async hashPassword() {
    this.validatePassword();
    if (process.env.NODE_ENV !== 'development') {
      // Criptografa a senha apenas em produção e outras versões
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  // Método para verificar se o ambiente é de desenvolvimento
  static isDevelopment() {
    return process.env.NODE_ENV === 'development';
  }
}
