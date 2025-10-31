
// lib/database.ts

export interface Supplier {
  supplier_id: string;
  supplier_name: string;
  parent_company: string | null;
  history_summary: string;
  mission: string | null;
  vision: string | null;
  core_business: string;
  contact_info: string;
}

export interface CropCategory {
  category_id: string;
  category_name: string;
}

export interface BotanicalName {
  common_name: string;
  botanical_name: string;
}

export interface MasterSeed {
  seed_id: string;
  variety_name: string;
  common_name: string;
  category_id: string;
  supplier_id: string;
}

export interface AgronomicTrait {
  seed_id: string;
  maturity_days_range: string | null;
  yield_description: string | null;
  altitude_range_masl: string | null;
  growth_habit_and_attributes: string | null;
  key_qualities: string | null;
}

export interface PhysicalCharacteristic {
  seed_id: string;
  shape: string | null;
  color: string | null;
  weight_range: string | null;
  general_description: string | null;
}

export interface DiseasePestTolerance {
  seed_id: string;
  tolerances_list: string;
}

export interface PlantingGuide {
  seed_id: string;
  seed_rate_per_acre: string | null;
  planting_spacing: string | null;
  plant_population_per_acre: string | null;
  approx_seeds_per_gram: string | null;
}

export const suppliers: Supplier[] = [
  {
    supplier_id: 'SUP-01',
    supplier_name: 'Simlaw Seeds Company LTD',
    parent_company: 'Kenya Seed Company',
    history_summary: 'Founded on October 9, 1929, as Simpson and Whitelaw. Acquired by Kirchoff East Africa in 1968, then by Kenya Seed Company in 1979. Officially registered as Simlaw Seeds Company Limited in 2002.',
    mission: 'To avail superior certified seeds and other agricultural inputs to maximize productivity.',
    vision: 'A world class supplier of certified agricultural seeds.',
    core_business: 'Sourcing, producing, importing, processing, marketing, and distributing superior and reliable certified vegetable and other seed varieties for domestic and regional markets.',
    contact_info: 'Phone: +254 794 546 935, +254 722 200 545, +254 734 811 861; Email: info@simlaw.co.ke'
  },
  {
    supplier_id: 'SUP-02',
    supplier_name: 'Kenya Seed Company',
    parent_company: null,
    history_summary: 'Parent company of Simlaw Seeds Company LTD since 1979. Major supplier of agricultural seeds including maize, wheat, pasture, and sunflower.',
    mission: null,
    vision: null,
    core_business: 'Production and distribution of certified agricultural seeds, including field crops and pastures.',
    contact_info: 'Phone: +254 (054) 31 909-14; Email: sales@kenyaseed.co.ke'
  }
];

export const cropCategories: CropCategory[] = [
  { category_id: 'CAT-01', category_name: 'Cabbage' },
  { category_id: 'CAT-02', category_name: 'Tomato' },
  { category_id: 'CAT-03', category_name: 'Root Crops' },
  { category_id: 'CAT-04', category_name: 'Onion' },
  { category_id: 'CAT-05', category_name: 'Watermelon' },
  { category_id: 'CAT-06', category_name: 'Cucurbits' },
  { category_id: 'CAT-07', category_name: 'Capsicums' },
  { category_id: 'CAT-08', category_name: 'Herbs & Others' },
  { category_id: 'CAT-09', category_name: 'Indigenous Vegetables' },
  { category_id: 'CAT-10', category_name: 'Beans' },
  { category_id: 'CAT-11', category_name: 'Lawn Grass' },
  { category_id: 'CAT-12', category_name: 'Fodder Crop' },
  { category_id: 'CAT-13', category_name: 'Sunflower' },
  { category_id: 'CAT-14', category_name: 'Maize' },
  { category_id: 'CAT-15', category_name: 'Sorghums & Millet' },
  { category_id: 'CAT-16', category_name: 'Hybrid Wheat' },
  { category_id: 'CAT-17', category_name: 'OATS/Rice' }
];

export const botanicalNames: BotanicalName[] = [
  { common_name: 'Beans', botanical_name: 'Phaseolus vulgaris' },
  { common_name: 'Beetroot', botanical_name: 'Beta vulgaris' },
  { common_name: 'Broccoli', botanical_name: 'Brasicca oleracea: italica' },
  { common_name: 'Cabbage', botanical_name: 'Brasicca oleracea var. capitata' },
  { common_name: 'Cabbage Chinese', botanical_name: 'Brasicca chinensis' },
  { common_name: 'Capsicum or Sweet Pepper', botanical_name: 'Capsicum frutescens' },
  { common_name: 'Carrot', botanical_name: 'Daucus carota' },
  { common_name: 'Cauliflower', botanical_name: 'Brasicca oleracea var. botrytis' },
  { common_name: 'Cucumber', botanical_name: 'Cucumis Sativus' },
  { common_name: 'Tomato', botanical_name: 'Lycopersicum Esculentum' },
  { common_name: 'Kikuyu Grass', botanical_name: 'Penisetum cladestinum' },
  { common_name: 'Lucerne', botanical_name: 'Medicago sativa' },
  { common_name: 'Sunflower', botanical_name: 'Helianthus annuus' },
  { common_name: 'Maize', botanical_name: 'Zea mays' }
];

export const masterSeedList: MasterSeed[] = [
  { seed_id: 'SIMLAW-001', variety_name: 'Gloria Star F1', common_name: 'Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-002', variety_name: 'Queen F1', common_name: 'Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-003', variety_name: 'Pak Choi Green', common_name: 'Chinese Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-004', variety_name: 'Chairman F1', common_name: 'Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-005', variety_name: 'Chinese Cabbage (Michilili)', common_name: 'Chinese Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-006', variety_name: 'Pruktor F1', common_name: 'Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-007', variety_name: 'Imani F1', common_name: 'Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-008', variety_name: 'Riana F1', common_name: 'Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-009', variety_name: 'Serena F1', common_name: 'Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-010', variety_name: 'Copenhagen Market', common_name: 'Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-011', variety_name: 'Sugarloaf', common_name: 'Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-012', variety_name: 'Red Rock', common_name: 'Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-013', variety_name: 'Gloria F1', common_name: 'Cabbage', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-016', variety_name: 'Collards Simlaw Select', common_name: 'Collards', category_id: 'CAT-09', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-017', variety_name: 'Curly Kale', common_name: 'Kale', category_id: 'CAT-09', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-018', variety_name: 'Ethiopian Kale (Kanzera)', common_name: 'Kale', category_id: 'CAT-09', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-019', variety_name: 'Kale Thousand Headed', common_name: 'Kale', category_id: 'CAT-09', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-020', variety_name: 'Swisschard Fordhook Giant', common_name: 'Swisschard', category_id: 'CAT-09', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-021', variety_name: 'Broccoli Calabrese', common_name: 'Broccoli', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-022', variety_name: 'Broccoli Marathon F1', common_name: 'Broccoli', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-023', variety_name: 'Broccoli Panthenon F1', common_name: 'Broccoli', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-024', variety_name: 'Cauliflower Snowball', common_name: 'Cauliflower', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-025', variety_name: 'Cauliflower Smilla F1', common_name: 'Cauliflower', category_id: 'CAT-01', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-026', variety_name: 'Nyota F1', common_name: 'Tomato', category_id: 'CAT-02', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-027', variety_name: 'Crown F1', common_name: 'Tomato', category_id: 'CAT-02', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-028', variety_name: 'Kibo Star F1', common_name: 'Tomato', category_id: 'CAT-02', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-029', variety_name: 'Super Rio', common_name: 'Tomato', category_id: 'CAT-02', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-030', variety_name: 'Maya F1', common_name: 'Tomato', category_id: 'CAT-02', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-031', variety_name: 'Prostar F1', common_name: 'Tomato', category_id: 'CAT-02', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-032', variety_name: 'Libra F1', common_name: 'Tomato', category_id: 'CAT-02', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-033', variety_name: 'Cal-J', common_name: 'Tomato', category_id: 'CAT-02', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-034', variety_name: 'M-82', common_name: 'Tomato', category_id: 'CAT-02', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-035', variety_name: 'Moneymaker', common_name: 'Tomato', category_id: 'CAT-02', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-036', variety_name: 'Rio Grande', common_name: 'Tomato', category_id: 'CAT-02', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-039', variety_name: 'Carrot Nantes', common_name: 'Carrot', category_id: 'CAT-03', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-041', variety_name: 'Beetroot Detroit Dark Red', common_name: 'Beetroot', category_id: 'CAT-03', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-042', variety_name: 'Crimson Globe', common_name: 'Beetroot', category_id: 'CAT-03', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-043', variety_name: 'Radish Cherry belle', common_name: 'Radish', category_id: 'CAT-03', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-044', variety_name: 'White Icicle', common_name: 'Radish', category_id: 'CAT-03', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-045', variety_name: 'Improved Red Creole', common_name: 'Onion', category_id: 'CAT-04', supplier_id: 'SUP-01' },
  { seed_id: 'SIMLAW-046', variety_name: 'Spring Bunching Onion', common_name: 'Onion', category_id: 'CAT-04', supplier_id: 'SUP-01' }
];

export const agronomicTraits: AgronomicTrait[] = [
  { seed_id: 'SIMLAW-001', maturity_days_range: '75-85', yield_description: '4-5Kg', altitude_range_masl: 'Widely adaptable', growth_habit_and_attributes: 'N/A', key_qualities: 'Excellent Field Holding ability, long Shelf Life, High size uniformity' },
  { seed_id: 'SIMLAW-002', maturity_days_range: '85-90', yield_description: '4-6Kgs', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Very uniform', key_qualities: 'Excellent cooking quality' },
  { seed_id: 'SIMLAW-004', maturity_days_range: '90-100', yield_description: '5-6Kg', altitude_range_masl: 'Widely adaptable', growth_habit_and_attributes: 'Widely adaptable', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-006', maturity_days_range: '85-90', yield_description: '4-5Kg', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'High yielding', key_qualities: 'Good field Holding ability, long Shelf Life' },
  { seed_id: 'SIMLAW-007', maturity_days_range: null, yield_description: '14k heads/acre', altitude_range_masl: 'Widely adaptable', growth_habit_and_attributes: 'Widely adaptable', key_qualities: 'Good field holding capacity, Excellent taste and flavour' },
  { seed_id: 'SIMLAW-008', maturity_days_range: '90-95', yield_description: '4-5Kg', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Good field standing ability', key_qualities: 'Very good flavor' },
  { seed_id: 'SIMLAW-009', maturity_days_range: '95-100', yield_description: '4-5Kg', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Large head', key_qualities: 'High disease tolerance' },
  { seed_id: 'SIMLAW-010', maturity_days_range: '65-70', yield_description: '2-3Kg', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Classic open pollinated variety', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-011', maturity_days_range: '70-75', yield_description: '2-3Kg', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Conical shape', key_qualities: 'Sugary with excellent cooking quality' },
  { seed_id: 'SIMLAW-013', maturity_days_range: '75-85', yield_description: '4-5Kg', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'N/A', key_qualities: 'Long field holding capacity, long shelf life' },
  { seed_id: 'SIMLAW-016', maturity_days_range: '45', yield_description: '40 Tons/acre', altitude_range_masl: 'Cool and warm regions', growth_habit_and_attributes: 'Widely adapted, Selected for late flowering, Prolific', key_qualities: 'Sweet taste & non-acidic, Highly palatable, Ideal for distant markets' },
  { seed_id: 'SIMLAW-018', maturity_days_range: '30', yield_description: '15 Tons/acre', altitude_range_masl: 'Widely adaptable', growth_habit_and_attributes: 'Large green leaves', key_qualities: 'Highly palatable, Sweet taste & non-acidic, Good aroma, Has few pests' },
  { seed_id: 'SIMLAW-019', maturity_days_range: '50', yield_description: '30 Tons/acre', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'N/A', key_qualities: 'Long harvesting period' },
  { seed_id: 'SIMLAW-020', maturity_days_range: null, yield_description: '20 Tons/acre', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Vigorous', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-021', maturity_days_range: '50-55', yield_description: '0.3-0.4Kgs', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Extra early', key_qualities: 'Best for fresh and export market' },
  { seed_id: 'SIMLAW-022', maturity_days_range: '60-65', yield_description: '0.6-0.7Kg', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Large, uniform curds', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-023', maturity_days_range: '60-65', yield_description: '0.5-0.6Kg', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Large, uniform curds', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-024', maturity_days_range: '55-60', yield_description: '0.3-0.4Kgs', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Uniform maturity, Early, Medium sized', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-025', maturity_days_range: '75', yield_description: '1.7 kg', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Self covering ability', key_qualities: 'Best for fresh and export market' },
  { seed_id: 'SIMLAW-026', maturity_days_range: '70-75', yield_description: '100-110g/fruit', altitude_range_masl: 'Widely adaptable', growth_habit_and_attributes: 'Determinate variety, Vigorous', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-027', maturity_days_range: '75-85', yield_description: '150-200g/fruit', altitude_range_masl: 'Widely adaptable', growth_habit_and_attributes: 'Semi-determinate tomato, Vigorous', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-028', maturity_days_range: '80-85', yield_description: '150g/fruit', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Prolific semi-determinate, Early Maturing', key_qualities: 'Excellent shelf life, over 35 tons/acre yield potential' },
  { seed_id: 'SIMLAW-029', maturity_days_range: '75-85', yield_description: '90-100g/fruit', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Popular determinate variety', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-030', maturity_days_range: '80-85', yield_description: null, altitude_range_masl: 'Widely adaptable', growth_habit_and_attributes: 'Determinate variety', key_qualities: 'Good shelf life' },
  { seed_id: 'SIMLAW-031', maturity_days_range: '70-75', yield_description: '110-130g/fruit', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Indeterminate, Ideal for green House and open field', key_qualities: 'long shelf life, long harvesting period' },
  { seed_id: 'SIMLAW-032', maturity_days_range: '80-85', yield_description: '110-120g/fruit', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Semi-determinate', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-033', maturity_days_range: '75-85', yield_description: '80-90g/fruit', altitude_range_masl: 'Widely adaptable', growth_habit_and_attributes: 'Determinate, widely adaptable variety', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-034', maturity_days_range: '70-75', yield_description: '70-80g/fruit', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Determinate heat tolerant variety', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-035', maturity_days_range: '70-75', yield_description: '90-100g/fruit', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Indeterminate', key_qualities: 'Fresh Market' },
  { seed_id: 'SIMLAW-036', maturity_days_range: '75-85', yield_description: '90-100g/fruit', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Popular determinate variety', key_qualities: 'Good shelf life' },
  { seed_id: 'SIMLAW-039', maturity_days_range: '60-110', yield_description: null, altitude_range_masl: 'N/A', growth_habit_and_attributes: 'Vigorous in growth, Early maturing', key_qualities: 'Sweet and small core roots' },
  { seed_id: 'SIMLAW-041', maturity_days_range: '50-60', yield_description: null, altitude_range_masl: 'Widely adaptable', growth_habit_and_attributes: 'Heat tolerant', key_qualities: 'Deep red interior colour' },
  { seed_id: 'SIMLAW-042', maturity_days_range: '60-70', yield_description: 'Medium size', altitude_range_masl: 'N/A', growth_habit_and_attributes: 'N/A', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-043', maturity_days_range: '40', yield_description: null, altitude_range_masl: 'N/A', growth_habit_and_attributes: 'High yielding variety, Grows vigorously', key_qualities: 'Slightly flavored flesh' },
  { seed_id: 'SIMLAW-044', maturity_days_range: null, yield_description: null, altitude_range_masl: 'N/A', growth_habit_and_attributes: 'N/A', key_qualities: 'N/A' },
  { seed_id: 'SIMLAW-045', maturity_days_range: '90', yield_description: null, altitude_range_masl: 'Low to medium altitude areas', growth_habit_and_attributes: 'N/A', key_qualities: 'Excellent curing qualities and storage' },
  { seed_id: 'SIMLAW-046', maturity_days_range: '80-90', yield_description: '5-6 Tons/acre', altitude_range_masl: 'Highly adaptable', growth_habit_and_attributes: 'Uniformly sized perennial onion', key_qualities: 'N/A' }
];

export const plantingGuides: PlantingGuide[] = [
  { seed_id: 'SIMLAW-001', seed_rate_per_acre: '100g', planting_spacing: '60x60 cm', plant_population_per_acre: '14K', approx_seeds_per_gram: '200' },
  { seed_id: 'SIMLAW-002', seed_rate_per_acre: '100g', planting_spacing: '60x60 cm', plant_population_per_acre: '14K', approx_seeds_per_gram: '200-300' },
  { seed_id: 'SIMLAW-004', seed_rate_per_acre: '100g', planting_spacing: '60x60 cm', plant_population_per_acre: '14K', approx_seeds_per_gram: '200-280' },
  { seed_id: 'SIMLAW-005', seed_rate_per_acre: '150g', planting_spacing: '45x45 cm', plant_population_per_acre: '14K', approx_seeds_per_gram: '250' },
  { seed_id: 'SIMLAW-006', seed_rate_per_acre: '100g', planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '200-280' },
  { seed_id: 'SIMLAW-007', seed_rate_per_acre: '100g', planting_spacing: '60x60 cm', plant_population_per_acre: '14K', approx_seeds_per_gram: '200' },
  { seed_id: 'SIMLAW-008', seed_rate_per_acre: null, planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '280' },
  { seed_id: 'SIMLAW-009', seed_rate_per_acre: null, planting_spacing: '60x50 cm', plant_population_per_acre: null, approx_seeds_per_gram: '200-280' },
  { seed_id: 'SIMLAW-010', seed_rate_per_acre: null, planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '250-300' },
  { seed_id: 'SIMLAW-011', seed_rate_per_acre: null, planting_spacing: '60x45 cm', plant_population_per_acre: null, approx_seeds_per_gram: '250-300' },
  { seed_id: 'SIMLAW-012', seed_rate_per_acre: '150g', planting_spacing: '60x60 cm', plant_population_per_acre: '14K', approx_seeds_per_gram: '250-280' },
  { seed_id: 'SIMLAW-013', seed_rate_per_acre: '100g', planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '200-280' },
  { seed_id: 'SIMLAW-016', seed_rate_per_acre: '120-150g', planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '300' },
  { seed_id: 'SIMLAW-018', seed_rate_per_acre: '0.5 Kgs', planting_spacing: '30xdrill', plant_population_per_acre: null, approx_seeds_per_gram: null },
  { seed_id: 'SIMLAW-019', seed_rate_per_acre: '150g', planting_spacing: '60x45 cm', plant_population_per_acre: null, approx_seeds_per_gram: '300' },
  { seed_id: 'SIMLAW-024', seed_rate_per_acre: '150g', planting_spacing: '45x45 cm', plant_population_per_acre: '18K - 24K', approx_seeds_per_gram: '250-350' },
  { seed_id: 'SIMLAW-025', seed_rate_per_acre: '150g', planting_spacing: '45x45 cm', plant_population_per_acre: '14k', approx_seeds_per_gram: '200' },
  { seed_id: 'SIMLAW-026', seed_rate_per_acre: '50g', planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '250-300' },
  { seed_id: 'SIMLAW-027', seed_rate_per_acre: '50g', planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '250-300' },
  { seed_id: 'SIMLAW-028', seed_rate_per_acre: '50g', planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '400-450' },
  { seed_id: 'SIMLAW-031', seed_rate_per_acre: '50g', planting_spacing: '90x45 cm', plant_population_per_acre: '12k', approx_seeds_per_gram: '250-300' },
  { seed_id: 'SIMLAW-032', seed_rate_per_acre: '50g', planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '250-300' },
  { seed_id: 'SIMLAW-033', seed_rate_per_acre: '100g', planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '250-300' },
  { seed_id: 'SIMLAW-034', seed_rate_per_acre: '100g', planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '280-300' },
  { seed_id: 'SIMLAW-036', seed_rate_per_acre: '100g', planting_spacing: '60x60 cm', plant_population_per_acre: null, approx_seeds_per_gram: '250-300' },
  { seed_id: 'SIMLAW-039', seed_rate_per_acre: '0.5-1.0kg', planting_spacing: '20xdrill', plant_population_per_acre: '400k - 800K', approx_seeds_per_gram: '800' },
  { seed_id: 'SIMLAW-041', seed_rate_per_acre: '6.0kg', planting_spacing: '30x10 cm', plant_population_per_acre: '180k - 220k', approx_seeds_per_gram: '20' }
];

export const diseasePestTolerances: DiseasePestTolerance[] = [
  { seed_id: 'SIMLAW-001', tolerances_list: 'Black rot' },
  { seed_id: 'SIMLAW-002', tolerances_list: 'Black Rot' },
  { seed_id: 'SIMLAW-004', tolerances_list: 'Black rot, Ring spot' },
  { seed_id: 'SIMLAW-006', tolerances_list: 'Black Rot, Ring Spot' },
  { seed_id: 'SIMLAW-007', tolerances_list: 'Black rot' },
  { seed_id: 'SIMLAW-013', tolerances_list: 'black rot' },
  { seed_id: 'SIMLAW-025', tolerances_list: 'Black rot' },
  { seed_id: 'SIMLAW-026', tolerances_list: 'Bacterial Wilt, TYLCV' },
  { seed_id: 'SIMLAW-027', tolerances_list: 'Bacterial wilt, Tomato yellow leaf curl virus (TYLCV), Verticulum or fusarium wilt' },
  { seed_id: 'SIMLAW-028', tolerances_list: 'BW, TYLCV' },
  { seed_id: 'SIMLAW-030', tolerances_list: 'Bacterial wilt, TYLCV' },
  { seed_id: 'SIMLAW-031', tolerances_list: 'TYLCV, BW' },
  { seed_id: 'SIMLAW-045', tolerances_list: 'Pink rot, Purple blotch' },
  { seed_id: 'SIMLAW-048', tolerances_list: 'Purple blotch' },
  { seed_id: 'SIMLAW-049', tolerances_list: 'Purple blotch' },
  { seed_id: 'SIMLAW-055', tolerances_list: 'General Disease Tolerance' },
  { seed_id: 'SIMLAW-100', tolerances_list: 'Common Bean diseases' },
  { seed_id: 'SIMLAW-101', tolerances_list: 'Common diseases, Heat' },
  { seed_id: 'SIMLAW-108', tolerances_list: 'Mildew' },
  { seed_id: 'SIMLAW-110', tolerances_list: 'Mildew' }
];
