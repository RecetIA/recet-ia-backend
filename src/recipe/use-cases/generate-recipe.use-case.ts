import { HandlerResponse } from "@netlify/functions";

import { GenerateRecipeDto } from "../dtos";
import {
  FileUploadService,
  GptService,
  RecipeService,
} from "../../../services";

import { Formatted, HEADERS } from "../../../config/utils";
import { envs } from "../../../config/envs";

import { z } from "zod";

interface GenerateRecipeUseCase {
  execute: (dto: GenerateRecipeDto) => Promise<HandlerResponse>;
}

export class GenerateRecipe implements GenerateRecipeUseCase {
  
  constructor(
    private readonly gptService: GptService,
    private readonly recipeService: RecipeService = new RecipeService(),
  ) {}

  get dataStructure() {
    return z.object({
      observations: z
        .string()
        .describe(
          "Comentarios y observaciones adicionales generales sobre la receta generada"
        ),
      recipe: z.object({
        matchRate: z.number().int().positive().max(100).describe(`
        Porcentaje de coincidencia (Del 0 al 100%) de la receta generada con las preferencias y condiciones del usuario
        `),
        title: z.string().describe("Título de la receta generada"),
        description: z
          .string()
          .describe("Breve descripción descripción de la receta generada"),
        cookTimeInMins: z
          .number()
          .int()
          .positive()
          .describe("Tiempo de preparación de la receta en minutos"),
        calories: z
          .number()
          .int()
          .positive()
          .describe("Número de calorías de la receta"),
        servings: z
          .number()
          .int()
          .positive()
          .describe("Número de porciones de la receta"),
        ingredients: z.array(
          z.object({
            name: z.string().describe("Nombre del ingrediente"),
            measure: z.object({
              full: z.string().describe("Medida completa del ingrediente"),
              short: z.string().describe("Medida corta del ingrediente"),
            }),
            quantity: z
              .number()
              .int()
              .positive()
              .describe("Cantidad del ingrediente"),
            isOptional: z
              .boolean()
              .describe("Indica si el ingrediente es opcional"),
          })
        ),
        steps: z
          .array(z.string())
          .describe("Pasos de preparación de la receta"),
        nutritional: z.object({
          summary: z.string().describe("Resumen nutricional de la receta"),
          values: z.array(
            z.object({
              name: z.string().describe("Nombre del valor nutricional"),
              measure: z.object({
                full: z
                  .string()
                  .describe("Medida completa del valor nutricional"),
                short: z
                  .string()
                  .describe("Medida corta del valor nutricional"),
              }),
              quantity: z
                .number()
                .int()
                .positive()
                .describe("Cantidad del valor nutricional"),
            })
          ),
        }),
        observations: z.string().describe(`
        Comentarios y observaciones adicionales sobre la receta, aquí puedes mencionar si la receta no cubre el 100% de los criterios y cuáles son esos criterios.  
        `),
      }),
    });
  }

  private validatePrompt(dto: GenerateRecipeDto) {
    let promptRecipe = `
    Basado en las siguientes preferencias y condiciones, proporciona una única receta de comida personalizadas.

    Si no hay suficientes recetas que cumplan con el 100% de las condiciones, proporciona recetas alternativas que cumplan con la mayor cantidad de condiciones posibles.

    Estas son las preferencias y condiciones:
    `;

    if (dto.ingredients.length > 0) {
      promptRecipe += `- Ingredientes Disponibles: ${Formatted.fromArrayToString(
        dto.ingredients
      )}.\n`;
    }

    if (dto.lifeStage) {
      promptRecipe += `- Edad y Etapa de Vida: ${dto.lifeStage}.\n`;
    }
    if (dto.healthConditions.length > 0) {
      promptRecipe += `- Condiciones de Salud: ${Formatted.fromArrayToString(
        dto.healthConditions
      )}.\n`;
    }
    if (dto.healthGoals.length > 0) {
      promptRecipe += `- Metas de Salud y Fitness: ${Formatted.fromArrayToString(
        dto.healthGoals
      )}.\n`;
    }
    if (dto.dietaryPreference) {
      promptRecipe += `- Preferencias Dietéticas: ${dto.dietaryPreference}.\n`;
    }
    if (dto.foodRestrictions.length > 0) {
      promptRecipe += `- Restricciones Alimentarias: ${Formatted.fromArrayToString(
        dto.foodRestrictions
      )}.\n`;
    }
    if (dto.flavorPreference) {
      promptRecipe += `- Preferencias por Sabor y Textura: ${dto.flavorPreference}.\n`;
    }
    if (dto.lifeStyles.length > 0) {
      promptRecipe += `- Estilo de Vida y Ocupación: ${Formatted.fromArrayToString(
        dto.lifeStyles
      )}.\n`;
    }

    return promptRecipe;
  }

  async execute(dto: GenerateRecipeDto): Promise<HandlerResponse> {
    const prompt = this.validatePrompt(dto);

    try {
      const { object: recipeResponse } = await this.gptService.generateJSON(
        prompt,
        this.dataStructure
      );

       const recipe = await this.recipeService.createUser({
         ...recipeResponse,
         creator: dto.creator,
       });


      return {
        statusCode: 200,
        body: JSON.stringify(recipe),
        headers: HEADERS.json,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Internal Server Error",
          error: true,
        }),
        headers: HEADERS.json,
      }
    }
  }
}
