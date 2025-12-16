// ==========================================
// 1. KNOWLEDGE BASE (The Brain)
// ==========================================
const tagger = {
  proteins: ['chicken', 'beef', 'tofu', 'beans', 'fish', 'pork', 'tempeh', 'steak', 'bacon', 'shrimp', 'tuna', 'salmon', 'sausage', 'lentils', 'chickpeas'],
  eggs: ['egg', 'eggs'], // Separated for specific logic
  
  // Carbs
  dryCarbs: ['rice', 'pasta', 'quinoa', 'oats', 'noodles', 'spaghetti', 'penne', 'couscous'],
  readyCarbs: ['bread', 'tortilla', 'bagel', 'toast', 'bun', 'pita'],
  rootVeg: ['potato', 'potatoes', 'sweet potatoes', 'carrot', 'carrots', 'onion', 'garlic', 'beet', 'turnip'],
  
  // Veggies sorted by cooking time
  hardVeg: ['broccoli', 'cauliflower', 'pepper', 'peppers', 'asparagus', 'brussels sprouts', 'celery'],
  softVeg: ['spinach', 'kale', 'tomato', 'tomatoes', 'lettuce', 'zucchini', 'mushroom', 'mushrooms', 'corn', 'peas', 'cabbage'],
  
  // Flavor builders
  fats: ['oil', 'butter', 'avocado', 'cheese', 'cream', 'coconut milk', 'milk', 'yogurt', 'mayo', 'ghee'],
  liquids: ['soy sauce', 'vinegar', 'stock', 'broth', 'wine', 'water', 'lemon juice', 'lime juice', 'tomato sauce', 'salsa'],
  herbs: ['basil', 'oregano', 'parsley', 'cilantro', 'thyme', 'rosemary', 'chives', 'scallions', 'ginger']
};

const flavorProfiles = {
  'Italian': { spices: 'dried basil, oregano, and crushed red pepper', fat: 'olive oil', garnish: 'fresh parsley' },
  'Mexican': { spices: 'cumin, chili powder, and paprika', fat: 'oil', garnish: 'cilantro and lime' },
  'Asian': { spices: 'ginger powder, garlic powder, and white pepper', fat: 'sesame oil', garnish: 'scallions and sesame seeds' },
  'Indian': { spices: 'turmeric, garam masala, and cumin', fat: 'ghee or oil', garnish: 'cilantro' },
  'Mediterranean': { spices: 'oregano, lemon zest, and rosemary', fat: 'olive oil', garnish: 'fresh herbs' },
  'American': { spices: 'paprika, garlic powder, and onion powder', fat: 'butter', garnish: 'chives' },
  'Any': { spices: 'salt, black pepper, and garlic powder', fat: 'oil', garnish: 'fresh herbs' }
};

const dietRules = {
  'vegan': ['chicken', 'beef', 'pork', 'steak', 'bacon', 'eggs', 'egg', 'salmon', 'tuna', 'shrimp', 'milk', 'cheese', 'butter', 'cream', 'yogurt', 'honey', 'mayo', 'sausage', 'ghee'],
  'vegetarian': ['chicken', 'beef', 'pork', 'steak', 'bacon', 'salmon', 'tuna', 'shrimp', 'sausage'],
  'keto': ['rice', 'pasta', 'bread', 'potato', 'potatoes', 'sweet potatoes', 'oats', 'quinoa', 'flour', 'sugar', 'beans', 'lentils', 'chickpeas', 'corn', 'peas', 'tortilla', 'noodles', 'bagel', 'bun', 'pita'],
  'paleo': ['rice', 'pasta', 'bread', 'oats', 'quinoa', 'flour', 'sugar', 'beans', 'lentils', 'chickpeas', 'corn', 'peas', 'cheese', 'milk', 'yogurt', 'butter', 'cream', 'tofu', 'tempeh', 'soy sauce']
};

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

const analyzeIngredients = (ingredients) => {
  const analysis = { proteins: [], eggs: [], dryCarbs: [], readyCarbs: [], rootVeg: [], hardVeg: [], softVeg: [], fats: [], liquids: [], herbs: [], others: [] };
  
  ingredients.forEach(item => {
    const lower = item.toLowerCase();
    let matched = false;
    for (const [category, keywords] of Object.entries(tagger)) {
      if (keywords.some(k => lower.includes(k))) {
        analysis[category].push(item);
        matched = true;
        break; // Stop at first match (priority based on object order)
      }
    }
    if (!matched) analysis.others.push(item);
  });
  return analysis;
};

// --- DYNAMIC INSTRUCTION ENGINE ---
const generateDetailedInstructions = (baseType, data, flavor) => {
  const steps = [];
  const { proteins, eggs, dryCarbs, readyCarbs, rootVeg, hardVeg, softVeg, liquids, herbs, others } = data;

  // STEP 1: MISE EN PLACE (Prep)
  let prepText = "Mise en place: Wash all produce. ";
  if (rootVeg.length > 0) prepText += `Dice the ${rootVeg.join(', ')} into small, uniform cubes (1cm) to ensure even cooking. `;
  if (hardVeg.length > 0) prepText += `Chop the ${hardVeg.join(', ')} into bite-sized florets or strips. `;
  if (softVeg.length > 0) prepText += `Roughly chop the ${softVeg.join(', ')}. `;
  if (proteins.length > 0) prepText += `Pat the ${proteins.join(', ')} dry and cut into strips or cubes. Season generously with salt and pepper.`;
  steps.push(prepText);

  // STEP 2: CARB MANAGEMENT
  if (dryCarbs.length > 0) {
    if (baseType.includes('Fried Rice') || baseType.includes('Hash')) {
      steps.push(`If the ${dryCarbs.join(', ')} is raw, cook it now according to package instructions. Ideally, spread it on a tray to cool and dry out (this prevents mushiness).`);
    } else {
      steps.push(`Bring a pot of salted water to a boil. Cook the ${dryCarbs.join(', ')} until al dente. Drain and reserve 1/2 cup of starchy cooking water.`);
    }
  }

  // STEP 3: THE SEAR (Proteins & Roots)
  steps.push(`Heat 1 tbsp of ${flavor.fat} in a large skillet or wok over medium-high heat.`);
  
  if (proteins.length > 0) {
    steps.push(`Add the ${proteins.join(', ')} to the hot pan. Sear undisturbed for 3-4 minutes until a golden crust forms. Flip and cook until done. Remove from pan and set aside.`);
  }
  
  // Roots take longest
  if (rootVeg.length > 0) {
    steps.push(`In the same pan, add the ${rootVeg.join(', ')}. Sauté for 8-10 minutes until they start to soften and brown at the edges.`);
  }

  // STEP 4: THE AROMATICS & HARD VEG
  if (hardVeg.length > 0) {
    steps.push(`Toss in the ${hardVeg.join(', ')}. Stir-fry for 4-5 minutes until tender-crisp (bright in color).`);
  }
  steps.push(`Sprinkle in the ${flavor.spices}. Toast the spices in the hot oil for 30 seconds until fragrant.`);

  // STEP 5: COMBINING & SOFT VEG
  let combineText = "";
  if (baseType.includes('Bowl') || baseType.includes('Fried Rice') || baseType.includes('Pasta')) {
    const carbName = dryCarbs.length > 0 ? dryCarbs.join(', ') : 'cooked base';
    combineText = `Add the ${carbName} and the cooked proteins back into the pan. `;
  } else if (baseType.includes('Tacos')) {
    combineText = `Return the proteins to the pan with the veggie mix. `;
  }
  
  if (softVeg.length > 0) {
    combineText += `Fold in the ${softVeg.join(', ')} now (they cook quickly!). `;
  }
  steps.push(combineText + "Toss everything to combine.");

  // STEP 6: SAUCING / LIQUIDS
  if (liquids.length > 0) {
    steps.push(`Deglaze the pan by pouring in the ${liquids.join(', ')}. Scrape up any browned bits from the bottom of the pan (that's pure flavor!). Simmer for 1-2 minutes until slightly reduced.`);
  } else if (baseType.includes('Pasta')) {
    steps.push("Pour in the reserved pasta water and toss vigorously. The starch will emulsify with the fat to create a glossy sauce.");
  }

  // STEP 7: EGG HANDLING
  if (eggs.length > 0) {
    if (baseType.includes('Fried Rice') || baseType.includes('Hash')) {
      steps.push(`Create a well in the center of the pan. Crack the eggs into it and scramble them quickly until just set, then mix into the rest of the dish.`);
    } else if (baseType.includes('Toast') || baseType.includes('Bowl')) {
      steps.push(`In a separate small non-stick pan, fry or poach the eggs to your desired doneness (sunny side up works great here).`);
    } else {
      steps.push(`Whisk the eggs in a bowl and pour over the mixture. Cover the pan and cook on low for 3-4 minutes until the eggs are fluffy and set (Frittata style).`);
    }
  }

  // STEP 8: FINISH
  let finishText = "Taste and adjust seasoning with salt and pepper. ";
  if (readyCarbs.length > 0) {
    finishText += `Serve the mixture generously piled on top of toasted ${readyCarbs.join(', ')}. `;
  } else if (baseType.includes('Tacos')) {
    finishText += `Spoon the mixture into warm tortillas. `;
  }
  
  if (herbs.length > 0) finishText += `Garnish with fresh ${herbs.join(', ')}. `;
  else finishText += `Garnish with ${flavor.garnish}. `;
  
  if (others.length > 0) finishText += `Top with any remaining items: ${others.join(', ')}.`;
  
  steps.push(finishText);
  steps.push("Plate immediately and enjoy your zero-waste masterpiece!");

  return steps;
};

// ==========================================
// 3. MAIN CONTROLLER
// ==========================================

const generateRemix = async (req, res) => {
  try {
    // 1. Simulate AI Thinking Delay (2s)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { ingredients, preferences } = req.body;
    const { cuisine = 'Any', dietary = 'none', allergies = [] } = preferences || {};

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ message: "No ingredients provided" });
    }

    // 2. Strict Dietary Validation
    if (dietary !== 'none' && dietRules[dietary]) {
      const forbidden = dietRules[dietary];
      const conflicts = ingredients.filter(ing => 
        forbidden.some(badItem => ing.toLowerCase().includes(badItem.toLowerCase()))
      );
      if (conflicts.length > 0) {
        return res.status(400).json({ 
          message: `Impossible Combination: '${dietary}' diet conflicts with: ${conflicts.join(', ')}.` 
        });
      }
    }

    // 3. Smart Analysis
    const data = analyzeIngredients(ingredients);

    // 4. Determine Dish Type (Heuristics)
    let baseType = "Skillet Hash";
    const totalCarbs = data.dryCarbs.length + data.readyCarbs.length + data.rootVeg.length;
    
    if (data.readyCarbs.some(c => c.includes('tortilla'))) baseType = "Street Tacos";
    else if (data.readyCarbs.length > 0) baseType = "Artisan Toast / Sandwich";
    else if (data.dryCarbs.some(c => c.includes('pasta') || c.includes('spaghetti'))) baseType = "Pasta Sauté";
    else if (data.dryCarbs.some(c => c.includes('rice') || c.includes('quinoa'))) baseType = "Fried Rice Bowl";
    else if (data.eggs.length > 0 && totalCarbs === 0) baseType = "Farmhouse Frittata";
    else if (totalCarbs === 0) baseType = "Warm Salad / Sauté";

    // 5. Generate Content
    const flavor = flavorProfiles[cuisine] || flavorProfiles['Any'];
    const title = `${cuisine === 'Any' ? 'Homestyle' : cuisine} ${baseType}`;
    
    // Detailed Calculations
    const totalProteinCount = data.proteins.length + data.eggs.length;
    const calories = 300 + (totalProteinCount * 150) + (totalCarbs * 100) + (data.fats.length * 80);
    
    // Eco Score
    let ecoScore = 100;
    if (data.proteins.some(p => p.includes('beef') || p.includes('steak'))) ecoScore -= 40;
    else if (data.proteins.some(p => p.includes('pork') || p.includes('bacon'))) ecoScore -= 25;
    else if (data.proteins.some(p => p.includes('chicken'))) ecoScore -= 15;
    if (data.fats.some(f => f.includes('cheese') || f.includes('cream'))) ecoScore -= 10;
    ecoScore = Math.max(10, ecoScore);

    // Allergy Warning
    const allergyWarnings = [];
    if (allergies.length > 0) {
      const risky = ingredients.filter(ing => 
        allergies.some(alg => ing.toLowerCase().includes(alg.toLowerCase()))
      );
      if (risky.length > 0) allergyWarnings.push(`⚠️ ALERT: This recipe uses ${risky.join(', ')}. Please omit if allergic.`);
    }

    // 6. Final Object
    const recipe = {
      title,
      description: `A creative ${baseType} featuring ${data.proteins.join(', ') || 'fresh produce'} and ${data.rootVeg.join(', ') || 'veggies'}, brought together with ${cuisine} flavors.`,
      time: (parseInt(preferences.time) || 30) + " mins",
      calories,
      nutrition: { 
        protein: 10 + (totalProteinCount * 20), 
        carbs: 20 + (totalCarbs * 30), 
        fats: 10 + (data.fats.length * 15) 
      },
      ecoScore,
      ingredients: [
        ...ingredients, 
        ...flavor.spices.split(', ').map(s => s.replace('and ', '')),
        flavor.fat,
        flavor.garnish
      ], 
      instructions: [
        ...allergyWarnings,
        ...generateDetailedInstructions(baseType, data, flavor)
      ]
    };

    res.status(200).json(recipe);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Chef logic failed" });
  }
};

module.exports = { generateRemix };