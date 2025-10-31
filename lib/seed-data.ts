import {
    agronomicTraits,
    cropCategories,
    diseasePestTolerances,
    masterSeedList,
    plantingGuides,
    suppliers
} from "./database";
import {AgronomicTrait, CropCategory, DiseasePestTolerance, MasterSeed, PlantingGuide, Supplier} from "./database";

export interface Seed {
    id: string;
    variety_name: string;
    common_name: string;
    supplier: Supplier | undefined;
    category: CropCategory | undefined;
    agronomic_traits: AgronomicTrait | undefined;
    planting_guide: PlantingGuide | undefined;
    disease_pest_tolerance: DiseasePestTolerance | undefined;
    min_altitude: number;
    max_altitude: number;
}

function parseAltitude(altitude_range_masl: string | null): [number, number] {
    if (!altitude_range_masl || altitude_range_masl.toLowerCase() === 'n/a' || altitude_range_masl.toLowerCase() === 'widely adaptable') {
        return [0, 8000]; // Widely adaptable, covers all reasonable altitudes
    }
    const matches = altitude_range_masl.match(/(\d+)\s*-\s*(\d+)/);
    if (matches) {
        return [parseInt(matches[1], 10), parseInt(matches[2], 10)];
    }
    const single_match = altitude_range_masl.match(/(\d+)/);
    if (single_match) {
        return [parseInt(single_match[1], 10), parseInt(single_match[1], 10)];
    }
    return [0, 8000];
}

export function getRecommendedSeeds(altitude: number, cropName?: string): Seed[] {
    const allSeeds: Seed[] = masterSeedList.map(masterSeed => {
        const agronomic_trait = agronomicTraits.find(t => t.seed_id === masterSeed.seed_id);
        const [min_altitude, max_altitude] = parseAltitude(agronomic_trait?.altitude_range_masl || null);

        return {
            id: masterSeed.seed_id,
            variety_name: masterSeed.variety_name,
            common_name: masterSeed.common_name,
            supplier: suppliers.find(s => s.supplier_id === masterSeed.supplier_id),
            category: cropCategories.find(c => c.category_id === masterSeed.category_id),
            agronomic_traits: agronomic_trait,
            planting_guide: plantingGuides.find(p => p.seed_id === masterSeed.seed_id),
            disease_pest_tolerance: diseasePestTolerances.find(d => d.seed_id === masterSeed.seed_id),
            min_altitude: min_altitude,
            max_altitude: max_altitude,
        };
    });

    let recommendedSeeds = allSeeds.filter(seed => altitude >= seed.min_altitude && altitude <= seed.max_altitude);

    if (cropName) {
        recommendedSeeds = recommendedSeeds.filter(seed => seed.common_name.toLowerCase() === cropName.toLowerCase());
    }

    return recommendedSeeds.sort((a, b) => {
        const aMid = (a.min_altitude + a.max_altitude) / 2;
        const bMid = (b.min_altitude + b.max_altitude) / 2;
        return Math.abs(altitude - aMid) - Math.abs(altitude - bMid);
    });
}
