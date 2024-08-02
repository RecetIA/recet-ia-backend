import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
} from 'class-validator';
import { UserResponse } from 'src/interfaces/user.interface';

enum LifeStage {
  general = '',
  adulto = 'adulto',
  bebe = 'bebe',
  nino = 'niño',
  adolescente = 'adolescente',
  adultoMayor = 'adulto-mayor',
}

enum HealthCondition {
  general = '',
  diabetes = 'diabetes',
  hipertension = 'hipertension',
  obesidad = 'obesidad',
  anemia = 'anemia',
  celiaca = 'celiaca',
  enfermedadRenal = 'enfermedad-renal',
  intoleranteLactosa = 'intolerante-lactosa',
  colesterol = 'colesterol',
}

enum HealthGoal {
  general = '',
  bajarPeso = 'bajar-peso',
  aumentoMasaMuscular = 'aumento-masa-muscular',
  mejorarResistencia = 'mejorar-resistencia',
  aumentarFlexibilidad = 'aumentar-flexibilidad',
  recuperarLesion = 'recuperar-lesion',
}

enum DietaryPreference {
  general = '',
  vegetariano = 'vegetariano',
  vegano = 'vegano',
  dietaPaleo = 'dieta-paleo',
  dietaKeto = 'dieta-keto',
  dietaMediterranea = 'dieta-mediterranea',
  dietaDash = 'dieta-dash',
}

enum FoodRestriction {
  general = '',
  sinFrutosSecos = 'sin-frutos-secos',
  sinMariscos = 'sin-mariscos',
  sinAzucar = 'sin-azucar',
  sinLacteos = 'sin-lacteos',
  sinCafeina = 'sin-cafeina',
  sinAlcohol = 'sin-alcohol',
  bajoSodio = 'bajo-sodio',
  bajoCarbohidratos = 'bajo-carbohidratos',
  bajoGrasas = 'bajo-grasas',
  altaProteinas = 'alta-proteinas',
}

enum FlavorPreference {
  general = '',
  salado = 'salada',
  dulce = 'dulce',
  picante = 'picante',
  crujiente = 'crujiente',
  suave = 'suave',
  bebida = 'bebida',
  amargo = 'amargo',
  acido = 'acido',
}

enum LifeStyles {
  estudiante = 'estudiante',
  horariosOcupados = 'horarios-ocupados',
  viajerosFrecuentes = 'viajeros-frecuentes',
  trabajadorNocturno = 'trabajador-nocturno',
}

export class GenerateRecipeDto {
  @IsNotEmpty()
  @IsMongoId()
  user: UserResponse;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ingredients: string[];

  @IsEnum(LifeStage)
  lifeStage: LifeStage;

  @IsArray()
  @IsOptional()
  @IsEnum(HealthCondition, { each: true })
  healthConditions?: HealthCondition[];

  @IsArray()
  @IsOptional()
  @IsEnum(HealthGoal, { each: true })
  healthGoals?: HealthGoal[];

  @IsEnum(DietaryPreference)
  dietaryPreference: DietaryPreference;

  @IsArray()
  @IsOptional()
  @IsEnum(FoodRestriction, { each: true })
  foodRestrictions?: FoodRestriction[];

  @IsEnum(FlavorPreference)
  flavorPreference: FlavorPreference;

  @IsArray()
  @IsOptional()
  @IsEnum(LifeStyles, { each: true })
  lifeStyles?: LifeStyles[];
}
