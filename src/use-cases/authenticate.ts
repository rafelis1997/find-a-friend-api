import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcrypt'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

export class Authenticate {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
