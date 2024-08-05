import { BcryptAdapter } from '../../config/adapters/bcrypt.adapter';

export const seedData = {
  users: [
    {
      name: 'User 1',
      email: 'user1@gmail.com',
      password: BcryptAdapter.hash('123456'),
      emailValidated: true,
    },
    {
      name: 'User 2',
      email: 'user2@gmail.com',
      password: BcryptAdapter.hash('123456'),
      emailValidated: true,
    },
  ],
  recipes: [
    {
      observations:
        'La receta generada cumple con la mayoría de las condiciones y preferencias del usuario, pero no es dulce. Se ha priorizado la salud y las restricciones alimentarias del usuario.',
      recipe: {
        matchRate: 85,
        title: 'Sopa de Champiñones y Maíz',
        description:
          'Una sopa saludable y nutritiva, ideal para adultos con hipertensión, obesidad y diabetes. Esta receta es vegetariana, sin azúcar y sin mariscos, perfecta para estudiantes ocupados.',
        cookTimeInMins: 30,
        calories: 250,
        servings: 4,
        ingredients: [
          {
            name: 'Champiñones',
            measure: {
              full: 'taza',
              short: 'tza',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'Maíz',
            measure: {
              full: 'taza',
              short: 'tza',
            },
            quantity: 1,
            isOptional: false,
          },
          {
            name: 'Papa',
            measure: {
              full: 'taza',
              short: 'tza',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'Caldo de verduras bajo en sodio',
            measure: {
              full: 'taza',
              short: 'tza',
            },
            quantity: 4,
            isOptional: false,
          },
          {
            name: 'Cebolla',
            measure: {
              full: 'taza',
              short: 'tza',
            },
            quantity: 1,
            isOptional: true,
          },
          {
            name: 'Ajo',
            measure: {
              full: 'diente',
              short: 'dte',
            },
            quantity: 2,
            isOptional: true,
          },
          {
            name: 'Aceite de oliva',
            measure: {
              full: 'cucharada',
              short: 'cda',
            },
            quantity: 1,
            isOptional: false,
          },
          {
            name: 'Pimienta negra',
            measure: {
              full: 'cucharadita',
              short: 'cdta',
            },
            quantity: 1,
            isOptional: true,
          },
          {
            name: 'Perejil fresco',
            measure: {
              full: 'cucharada',
              short: 'cda',
            },
            quantity: 2,
            isOptional: true,
          },
        ],
        steps: [
          '1. Calienta el aceite de oliva en una olla grande a fuego medio.',
          '2. Agrega la cebolla y el ajo, y sofríe hasta que estén dorados.',
          '3. Añade los champiñones y cocina por 5 minutos.',
          '4. Agrega el maíz y las papas, y cocina por otros 5 minutos.',
          '5. Vierte el caldo de verduras y lleva a ebullición.',
          '6. Reduce el fuego y cocina a fuego lento durante 20 minutos o hasta que las papas estén tiernas.',
          '7. Sazona con pimienta negra al gusto.',
          '8. Sirve caliente y decora con perejil fresco.',
        ],
        nutritional: {
          summary:
            'Esta sopa es baja en calorías y sodio, y es adecuada para personas con hipertensión, obesidad y diabetes.',
          values: [
            {
              name: 'Calorías',
              measure: {
                full: 'calorías',
                short: 'cal',
              },
              quantity: 250,
            },
            {
              name: 'Proteínas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 8,
            },
            {
              name: 'Grasas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 5,
            },
            {
              name: 'Carbohidratos',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 45,
            },
            {
              name: 'Fibra',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 6,
            },
            {
              name: 'Sodio',
              measure: {
                full: 'miligramos',
                short: 'mg',
              },
              quantity: 150,
            },
          ],
        },
        observations:
          'La receta no es dulce, pero cumple con las restricciones alimentarias y condiciones de salud del usuario.',
      },
      img: 'https://res.cloudinary.com/dufuhfakg/image/upload/v1722731721/recetia/oy8aphcywdtdmbchcadb.png',
    },
    {
      observations:
        'La receta cumple con la mayoría de las condiciones, utilizando los ingredientes disponibles y adecuada para un adolescente.',
      recipe: {
        matchRate: 90,
        title: 'Arroz con Pollo y Queso',
        description:
          'Un delicioso y nutritivo plato de arroz con pollo y queso, perfecto para adolescentes.',
        cookTimeInMins: 45,
        calories: 600,
        servings: 4,
        ingredients: [
          {
            name: 'Huevo',
            measure: {
              full: 'unidad',
              short: 'ud',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'Pollo',
            measure: {
              full: 'gramos',
              short: 'g',
            },
            quantity: 500,
            isOptional: false,
          },
          {
            name: 'Arroz',
            measure: {
              full: 'gramos',
              short: 'g',
            },
            quantity: 300,
            isOptional: false,
          },
          {
            name: 'Queso',
            measure: {
              full: 'gramos',
              short: 'g',
            },
            quantity: 100,
            isOptional: false,
          },
          {
            name: 'Sal',
            measure: {
              full: 'cucharadita',
              short: 'cdta',
            },
            quantity: 1,
            isOptional: true,
          },
          {
            name: 'Pimienta',
            measure: {
              full: 'cucharadita',
              short: 'cdta',
            },
            quantity: 1,
            isOptional: true,
          },
          {
            name: 'Aceite de oliva',
            measure: {
              full: 'cucharada',
              short: 'cda',
            },
            quantity: 2,
            isOptional: true,
          },
          {
            name: 'Cebolla',
            measure: {
              full: 'unidad',
              short: 'ud',
            },
            quantity: 1,
            isOptional: true,
          },
          {
            name: 'Ajo',
            measure: {
              full: 'diente',
              short: 'dte',
            },
            quantity: 2,
            isOptional: true,
          },
        ],
        steps: [
          '1. Cocina el arroz según las instrucciones del paquete y reserva.',
          '2. En una sartén grande, calienta el aceite de oliva a fuego medio.',
          '3. Agrega la cebolla y el ajo picados, y sofríe hasta que estén dorados.',
          '4. Añade el pollo cortado en trozos y cocina hasta que esté bien cocido.',
          '5. Bate los huevos y agrégalos a la sartén, cocinando hasta que estén revueltos.',
          '6. Incorpora el arroz cocido y mezcla bien.',
          '7. Añade el queso rallado y mezcla hasta que se derrita.',
          '8. Sazona con sal y pimienta al gusto.',
          '9. Sirve caliente y disfruta.',
        ],
        nutritional: {
          summary:
            'Este plato es una excelente fuente de proteínas y carbohidratos, ideal para adolescentes en crecimiento.',
          values: [
            {
              name: 'Proteínas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 35,
            },
            {
              name: 'Carbohidratos',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 50,
            },
            {
              name: 'Grasas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 20,
            },
            {
              name: 'Fibra',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 5,
            },
            {
              name: 'Calcio',
              measure: {
                full: 'miligramos',
                short: 'mg',
              },
              quantity: 200,
            },
          ],
        },
        observations:
          'La receta no cubre el 100% de los criterios ya que incluye ingredientes opcionales como cebolla, ajo, sal, pimienta y aceite de oliva.',
      },
      img: 'https://res.cloudinary.com/dufuhfakg/image/upload/v1722749913/recetia/cylwdohppvtnkhnsndrd.png',
    },
    {
      observations:
        'La receta cumple con las condiciones y preferencias del usuario, utilizando los ingredientes disponibles: arroz, mantequilla y pescado.',
      recipe: {
        matchRate: 100,
        title: 'Pescado a la Mantequilla con Arroz',
        description:
          'Un delicioso plato de pescado a la mantequilla acompañado de arroz esponjoso.',
        cookTimeInMins: 30,
        calories: 450,
        servings: 2,
        ingredients: [
          {
            name: 'Arroz',
            measure: {
              full: 'taza',
              short: 'tz',
            },
            quantity: 1,
            isOptional: false,
          },
          {
            name: 'Mantequilla',
            measure: {
              full: 'cucharada',
              short: 'cda',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'Pescado',
            measure: {
              full: 'filete',
              short: 'filete',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'Sal',
            measure: {
              full: 'pizca',
              short: 'pizca',
            },
            quantity: 1,
            isOptional: true,
          },
          {
            name: 'Pimienta',
            measure: {
              full: 'pizca',
              short: 'pizca',
            },
            quantity: 1,
            isOptional: true,
          },
          {
            name: 'Ajo',
            measure: {
              full: 'diente',
              short: 'diente',
            },
            quantity: 1,
            isOptional: true,
          },
        ],
        steps: [
          'Cocina el arroz según las instrucciones del paquete.',
          'En una sartén grande, derrite la mantequilla a fuego medio.',
          'Añade el ajo picado y sofríe hasta que esté dorado.',
          'Agrega los filetes de pescado a la sartén y cocina durante 4-5 minutos por cada lado, o hasta que estén bien cocidos.',
          'Sazona con sal y pimienta al gusto.',
          'Sirve el pescado sobre una cama de arroz esponjoso.',
        ],
        nutritional: {
          summary:
            'Este plato es una excelente fuente de proteínas y carbohidratos, ideal para una comida balanceada.',
          values: [
            {
              name: 'Proteínas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 30,
            },
            {
              name: 'Carbohidratos',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 50,
            },
            {
              name: 'Grasas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 20,
            },
          ],
        },
        observations:
          'La receta utiliza todos los ingredientes disponibles y añade algunos opcionales para mejorar el sabor.',
      },
      img: 'https://res.cloudinary.com/dufuhfakg/image/upload/v1721879424/recetia/m14ygoqgma0esku0zjef.png',
    },
    {
      observations:
        'La receta cumple con las condiciones y preferencias del usuario, utilizando los ingredientes disponibles: plátano, pescado, ajo, limón y piña.',
      recipe: {
        matchRate: 100,
        title: 'Pescado a la Piña con Plátano',
        description:
          'Una deliciosa receta de pescado a la piña acompañado de plátano, perfecta para una comida tropical y saludable.',
        cookTimeInMins: 30,
        calories: 450,
        servings: 2,
        ingredients: [
          {
            name: 'pescado',
            measure: {
              full: 'filetes',
              short: 'filetes',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'ajo',
            measure: {
              full: 'dientes de ajo picados',
              short: 'dientes',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'limón',
            measure: {
              full: 'jugo de limón',
              short: 'jugo',
            },
            quantity: 1,
            isOptional: false,
          },
          {
            name: 'piña',
            measure: {
              full: 'rodajas de piña',
              short: 'rodajas',
            },
            quantity: 4,
            isOptional: false,
          },
          {
            name: 'plátano',
            measure: {
              full: 'plátanos en rodajas',
              short: 'plátanos',
            },
            quantity: 2,
            isOptional: false,
          },
        ],
        steps: [
          '1. Precalienta el horno a 180°C (350°F).',
          '2. Coloca los filetes de pescado en una bandeja para hornear.',
          '3. En un tazón pequeño, mezcla los dientes de ajo picados con el jugo de limón.',
          '4. Vierte la mezcla de ajo y limón sobre los filetes de pescado.',
          '5. Coloca las rodajas de piña sobre los filetes de pescado.',
          '6. Hornea el pescado durante 20-25 minutos o hasta que esté bien cocido.',
          '7. Mientras tanto, en una sartén, cocina las rodajas de plátano hasta que estén doradas.',
          '8. Sirve el pescado a la piña acompañado de los plátanos dorados.',
        ],
        nutritional: {
          summary:
            'Esta receta es rica en proteínas y vitaminas, ideal para una comida balanceada.',
          values: [
            {
              name: 'Proteínas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 30,
            },
            {
              name: 'Carbohidratos',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 50,
            },
            {
              name: 'Grasas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 10,
            },
            {
              name: 'Fibra',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 5,
            },
          ],
        },
        observations:
          'La receta utiliza todos los ingredientes disponibles y proporciona una comida balanceada y nutritiva.',
      },
      img: 'https://res.cloudinary.com/dufuhfakg/image/upload/v1722750448/recetia/qq5aqcbjjgih1hwrzvg2.png',
    },
    {
      observations:
        'Dado que las opciones de ingredientes son limitadas y las restricciones son específicas, he creado una receta que cumple con la mayoría de las condiciones. La receta es adecuada para un bebé y no contiene frutos secos, cafeína ni alcohol. Sin embargo, la receta puede no cumplir al 100% con la meta de mejorar la resistencia debido a la limitación de ingredientes disponibles.',
      recipe: {
        matchRate: 85,
        title: 'Puré de Piña y Aguacate',
        description:
          'Un puré suave y nutritivo ideal para bebés, hecho con piña y aguacate, perfecto para una comida saludable y deliciosa.',
        cookTimeInMins: 10,
        calories: 150,
        servings: 2,
        ingredients: [
          {
            name: 'piña',
            measure: {
              full: 'taza de piña picada',
              short: 'taza',
            },
            quantity: 1,
            isOptional: false,
          },
          {
            name: 'aguacate',
            measure: {
              full: 'aguacate maduro',
              short: 'aguacate',
            },
            quantity: 1,
            isOptional: false,
          },
          {
            name: 'leche',
            measure: {
              full: 'cucharada de leche',
              short: 'cda',
            },
            quantity: 2,
            isOptional: true,
          },
        ],
        steps: [
          'Pelar y picar la piña en trozos pequeños.',
          'Cortar el aguacate por la mitad, quitar el hueso y extraer la pulpa.',
          'En un procesador de alimentos, combinar la piña y el aguacate hasta obtener una mezcla suave.',
          'Agregar la leche si se desea una consistencia más suave.',
          'Servir el puré en un tazón pequeño y alimentar al bebé con una cuchara adecuada.',
        ],
        nutritional: {
          summary:
            'Este puré es una excelente fuente de vitaminas y grasas saludables, ideal para el crecimiento y desarrollo de los bebés.',
          values: [
            {
              name: 'Proteínas',
              measure: {
                full: 'gramos de proteínas',
                short: 'g',
              },
              quantity: 2,
            },
            {
              name: 'Grasas',
              measure: {
                full: 'gramos de grasas saludables',
                short: 'g',
              },
              quantity: 10,
            },
            {
              name: 'Carbohidratos',
              measure: {
                full: 'gramos de carbohidratos',
                short: 'g',
              },
              quantity: 15,
            },
            {
              name: 'Fibra',
              measure: {
                full: 'gramos de fibra',
                short: 'g',
              },
              quantity: 4,
            },
          ],
        },
        observations:
          'La receta es adecuada para bebés y cumple con las restricciones alimentarias. Sin embargo, debido a la limitación de ingredientes, puede no cumplir completamente con la meta de mejorar la resistencia.',
      },
      img: 'https://res.cloudinary.com/dufuhfakg/image/upload/v1722749205/recetia/qsmq4ca0n3weln9vxydo.png',
    },
    {
      observations:
        'La receta cumple con las preferencias y condiciones del usuario, utilizando los ingredientes disponibles: zanahoria, carne de res y cebolla.',
      recipe: {
        matchRate: 100,
        title: 'Salteado de Carne de Res con Zanahorias y Cebolla',
        description:
          'Un delicioso salteado de carne de res con zanahorias y cebolla, perfecto para una comida rápida y nutritiva.',
        cookTimeInMins: 30,
        calories: 350,
        servings: 2,
        ingredients: [
          {
            name: 'zanahoria',
            measure: {
              full: 'taza',
              short: 'tza',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'carne de res',
            measure: {
              full: 'gramos',
              short: 'g',
            },
            quantity: 300,
            isOptional: false,
          },
          {
            name: 'cebolla',
            measure: {
              full: 'taza',
              short: 'tza',
            },
            quantity: 1,
            isOptional: false,
          },
          {
            name: 'aceite de oliva',
            measure: {
              full: 'cucharada',
              short: 'cda',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'sal',
            measure: {
              full: 'cucharadita',
              short: 'cdta',
            },
            quantity: 1,
            isOptional: false,
          },
          {
            name: 'pimienta',
            measure: {
              full: 'cucharadita',
              short: 'cdta',
            },
            quantity: 1,
            isOptional: false,
          },
        ],
        steps: [
          '1. Cortar la carne de res en tiras finas.',
          '2. Pelar y cortar las zanahorias en rodajas finas.',
          '3. Cortar la cebolla en juliana.',
          '4. Calentar el aceite de oliva en una sartén grande a fuego medio-alto.',
          '5. Añadir la carne de res y cocinar hasta que esté dorada.',
          '6. Agregar la cebolla y las zanahorias a la sartén y saltear durante 5-7 minutos hasta que las verduras estén tiernas.',
          '7. Sazonar con sal y pimienta al gusto.',
          '8. Servir caliente.',
        ],
        nutritional: {
          summary:
            'Este salteado es una excelente fuente de proteínas y vitaminas.',
          values: [
            {
              name: 'Proteínas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 30,
            },
            {
              name: 'Carbohidratos',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 20,
            },
            {
              name: 'Grasas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 15,
            },
            {
              name: 'Fibra',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 5,
            },
          ],
        },
        observations:
          'La receta utiliza todos los ingredientes disponibles y es fácil de preparar en poco tiempo.',
      },
      img: 'https://res.cloudinary.com/dufuhfakg/image/upload/v1721626835/recetia/q1zqciafbwl513cgdewz.png',
      isFavorite: true,
    },
    {
      observations:
        'La receta se ha generado utilizando los ingredientes disponibles: brócoli, tomate y limón. No se han añadido otros ingredientes para cumplir con las condiciones establecidas.',
      recipe: {
        matchRate: 100,
        title: 'Ensalada de Brócoli y Tomate con Aderezo de Limón',
        description:
          'Una ensalada fresca y saludable hecha con brócoli, tomate y un aderezo de limón.',
        cookTimeInMins: 15,
        calories: 150,
        servings: 2,
        ingredients: [
          {
            name: 'brócoli',
            measure: {
              full: 'taza',
              short: 'tza',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'tomate',
            measure: {
              full: 'unidad',
              short: 'ud',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'limón',
            measure: {
              full: 'unidad',
              short: 'ud',
            },
            quantity: 1,
            isOptional: false,
          },
        ],
        steps: [
          'Lava y corta el brócoli en pequeños floretes.',
          'Hierve el brócoli en agua con sal durante 5 minutos y luego escúrrelo.',
          'Corta los tomates en rodajas o cubos, según tu preferencia.',
          'Exprime el jugo del limón en un tazón pequeño.',
          'En un bol grande, mezcla el brócoli, los tomates y el jugo de limón.',
          'Revuelve bien todos los ingredientes y sirve la ensalada fresca.',
        ],
        nutritional: {
          summary:
            'Esta ensalada es baja en calorías y rica en vitaminas y minerales.',
          values: [
            {
              name: 'Proteínas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 5,
            },
            {
              name: 'Carbohidratos',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 20,
            },
            {
              name: 'Grasas',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 2,
            },
            {
              name: 'Fibra',
              measure: {
                full: 'gramos',
                short: 'g',
              },
              quantity: 6,
            },
          ],
        },
        observations:
          'La receta cumple con el 100% de las condiciones y utiliza únicamente los ingredientes disponibles: brócoli, tomate y limón.',
      },
      img: 'https://res.cloudinary.com/dufuhfakg/image/upload/v1721655805/Ensalada%20de%20Br%C3%B3coli%20y%20Tomate%20con%20Aderezo%20de%20Lim%C3%B3n/ydrthrwgbksdauejymdj.png',
      isFavorite: true,
    },
    {
      observations:
        'La receta cumple con las preferencias y condiciones del usuario, utilizando todos los ingredientes disponibles: pollo, aguacate, papa y queso.',
      recipe: {
        matchRate: 100,
        title: 'Pollo al Horno con Puré de Papa y Guacamole',
        description:
          'Una deliciosa receta de pollo al horno acompañado de un cremoso puré de papa y un fresco guacamole de aguacate y queso.',
        cookTimeInMins: 60,
        calories: 600,
        servings: 4,
        ingredients: [
          {
            name: 'pollo',
            measure: {
              full: 'pechugas de pollo',
              short: 'pechugas',
            },
            quantity: 4,
            isOptional: false,
          },
          {
            name: 'aguacate',
            measure: {
              full: 'aguacates medianos',
              short: 'aguacates',
            },
            quantity: 2,
            isOptional: false,
          },
          {
            name: 'papa',
            measure: {
              full: 'papas grandes',
              short: 'papas',
            },
            quantity: 4,
            isOptional: false,
          },
          {
            name: 'queso',
            measure: {
              full: 'taza de queso rallado',
              short: 'taza',
            },
            quantity: 1,
            isOptional: false,
          },
          {
            name: 'sal',
            measure: {
              full: 'cucharadita de sal',
              short: 'cucharadita',
            },
            quantity: 1,
            isOptional: true,
          },
          {
            name: 'pimienta',
            measure: {
              full: 'cucharadita de pimienta',
              short: 'cucharadita',
            },
            quantity: 1,
            isOptional: true,
          },
          {
            name: 'aceite de oliva',
            measure: {
              full: 'cucharada de aceite de oliva',
              short: 'cucharada',
            },
            quantity: 2,
            isOptional: true,
          },
          {
            name: 'leche',
            measure: {
              full: 'taza de leche',
              short: 'taza',
            },
            quantity: 1,
            isOptional: true,
          },
        ],
        steps: [
          'Precalentar el horno a 200°C (400°F).',
          'Sazonar las pechugas de pollo con sal y pimienta al gusto.',
          'Colocar las pechugas de pollo en una bandeja para hornear y rociar con una cucharada de aceite de oliva.',
          'Hornear el pollo durante 25-30 minutos o hasta que esté completamente cocido.',
          'Mientras tanto, pelar y cortar las papas en trozos grandes.',
          'Cocinar las papas en agua hirviendo con sal hasta que estén tiernas, aproximadamente 20 minutos.',
          'Escurrir las papas y triturarlas con un machacador de papas.',
          'Agregar la leche y una cucharada de aceite de oliva a las papas trituradas y mezclar hasta obtener un puré cremoso.',
          'Cortar los aguacates por la mitad, quitar el hueso y sacar la pulpa.',
          'En un tazón, machacar la pulpa de los aguacates y mezclar con el queso rallado.',
          'Servir el pollo al horno acompañado del puré de papa y el guacamole de aguacate y queso.',
        ],
        nutritional: {
          summary:
            'Esta receta es una excelente fuente de proteínas y grasas saludables, además de ser rica en vitaminas y minerales.',
          values: [
            {
              name: 'Proteínas',
              measure: {
                full: 'gramos de proteínas',
                short: 'g',
              },
              quantity: 40,
            },
            {
              name: 'Grasas',
              measure: {
                full: 'gramos de grasas',
                short: 'g',
              },
              quantity: 30,
            },
            {
              name: 'Carbohidratos',
              measure: {
                full: 'gramos de carbohidratos',
                short: 'g',
              },
              quantity: 50,
            },
            {
              name: 'Fibra',
              measure: {
                full: 'gramos de fibra',
                short: 'g',
              },
              quantity: 10,
            },
            {
              name: 'Vitamina A',
              measure: {
                full: 'porcentaje de la ingesta diaria recomendada',
                short: '% IDR',
              },
              quantity: 20,
            },
            {
              name: 'Vitamina C',
              measure: {
                full: 'porcentaje de la ingesta diaria recomendada',
                short: '% IDR',
              },
              quantity: 30,
            },
          ],
        },
        observations:
          'La receta utiliza todos los ingredientes disponibles y es fácil de preparar. Se recomienda ajustar las cantidades de sal y pimienta al gusto.',
      },
      img: 'https://res.cloudinary.com/dufuhfakg/image/upload/v1721863956/recetia/ghunmghqytqdremiajsj.png',
      isFavorite: true,
    },
  ],
};
