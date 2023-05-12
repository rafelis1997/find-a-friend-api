import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface RegisterPetUseCaseRequest {
  name: string
  org_id: string
  adopted?: boolean
  environment?: 'SMALL_OPEN' | 'WIDE_OPEN' | 'CLOSED'
  about?: string
  puppy_adoption_req?: string | null
  puppy_age?: 'PUPPY' | 'ADULT' | 'ELDER'
  puppy_dependency?: 'LOW' | 'MEDIUM' | 'HIGH'
  puppy_energy?: 'LOW' | 'MEDIUM' | 'HIGH'
  puppy_photos?: string | null
  puppy_size?: 'SMALL' | 'MEDIUM' | 'BIG'
}

export class RegisterPetUseCase {
  constructor(
    private petRepository: PetsRepository,
    private OrgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    org_id,
    about,
    adopted = false,
    environment,
    puppy_adoption_req,
    puppy_age,
    puppy_dependency,
    puppy_energy,
    puppy_photos,
    puppy_size,
  }: RegisterPetUseCaseRequest) {
    const org = await this.OrgsRepository.findById(org_id)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const pet = await this.petRepository.create({
      name,
      org_id,
      about,
      adopted,
      environment,
      puppy_adoption_req: JSON.stringify(puppy_adoption_req),
      puppy_age,
      puppy_dependency,
      puppy_energy,
      puppy_photos: JSON.stringify(puppy_photos),
      puppy_size,
    })

    return { pet }
  }
}
