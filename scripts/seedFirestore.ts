/**
 * Firestore Seed Data Script
 *
 * This script provides sample data structure for the AssistPro app.
 * To use this data, you can manually import it via the Firebase Console
 * or adapt this script to use the Firebase Admin SDK.
 *
 * Usage with Firebase Admin SDK:
 *   1. Set up a service account key from Firebase Console
 *   2. Install firebase-admin: npm install firebase-admin
 *   3. Run: npx ts-node scripts/seedFirestore.ts
 */

// ============================================
// Sample Data for AssistPro
// ============================================

export const sampleBrands = [
  {
    id: 'brand_daikin',
    name: 'Daikin',
    logoUrl: 'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/logos%2Fdaikin.png',
  },
  {
    id: 'brand_carrier',
    name: 'Carrier',
    logoUrl: 'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/logos%2Fcarrier.png',
  },
  {
    id: 'brand_lg',
    name: 'LG',
    logoUrl: 'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/logos%2Flg.png',
  },
  {
    id: 'brand_samsung',
    name: 'Samsung',
    logoUrl: 'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/logos%2Fsamsung.png',
  },
  {
    id: 'brand_mitsubishi',
    name: 'Mitsubishi Electric',
    logoUrl: 'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/logos%2Fmitsubishi.png',
  },
  {
    id: 'brand_bluestar',
    name: 'Blue Star',
    logoUrl: 'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/logos%2Fbluestar.png',
  },
  {
    id: 'brand_voltas',
    name: 'Voltas',
    logoUrl: 'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/logos%2Fvoltas.png',
  },
];

export const sampleModels = [
  // Daikin models
  {
    id: 'model_daikin_ftl35',
    name: 'FTL35TV16',
    brandId: 'brand_daikin',
  },
  {
    id: 'model_daikin_ftl50',
    name: 'FTL50TV16',
    brandId: 'brand_daikin',
  },
  {
    id: 'model_daikin_ftkf',
    name: 'FTKF50TV16',
    brandId: 'brand_daikin',
  },
  // Carrier models
  {
    id: 'model_carrier_24k',
    name: '24K Ester Neo',
    brandId: 'brand_carrier',
  },
  {
    id: 'model_carrier_18k',
    name: '18K Durafresh Neo',
    brandId: 'brand_carrier',
  },
  // LG models
  {
    id: 'model_lg_ps_q19',
    name: 'PS-Q19YNZE',
    brandId: 'brand_lg',
  },
  {
    id: 'model_lg_rs_q14',
    name: 'RS-Q14YNZE',
    brandId: 'brand_lg',
  },
  // Samsung models
  {
    id: 'model_samsung_ar18',
    name: 'AR18TY3QBBU',
    brandId: 'brand_samsung',
  },
];

export const sampleContents = [
  {
    id: 'content_001',
    title: 'Daikin FTL35 Indoor Unit Not Cooling - E1 Error',
    description:
      'Complete troubleshooting guide for Daikin FTL35TV16 when displaying E1 error code. This error typically indicates a communication failure between indoor and outdoor units.',
    errorCode: 'E1',
    steps: [
      'Turn off the AC and disconnect power for 5 minutes',
      'Check the communication cable between indoor and outdoor units',
      'Inspect the connector pins for corrosion or loose connections',
      'Measure voltage at the terminal block (should be 220V AC)',
      'Check the PCB board for burnt components',
      'Replace the communication cable if damaged',
      'Reset the unit by powering on after repairs',
      'Test for 30 minutes to confirm the error is resolved',
    ],
    tools: [
      'Multimeter',
      'Screwdriver set',
      'Wire stripper',
      'Communication cable (spare)',
      'Insulation tape',
    ],
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/images%2Fdaikin_ftl35_pcb.jpg',
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/images%2Fdaikin_ftl35_wiring.jpg',
    ],
    videoUrls: [
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fdaikin_e1_fix.mp4',
    ],
    brandId: 'brand_daikin',
    modelId: 'model_daikin_ftl35',
    keywords: [
      'daikin',
      'ftl35',
      'e1',
      'error',
      'not cooling',
      'communication',
      'pcb',
      'indoor',
      'outdoor',
      'cable',
    ],
  },
  {
    id: 'content_002',
    title: 'Daikin FTL35 Compressor Not Starting - L1 Error',
    description:
      'Step-by-step guide to diagnose and fix L1 error on Daikin FTL35TV16. The L1 code indicates an inverter compressor startup failure.',
    errorCode: 'L1',
    steps: [
      'Check the power supply voltage at the outdoor unit',
      'Inspect the compressor capacitor with a multimeter',
      'Measure compressor winding resistance (all three phases)',
      'Check the inverter board for visible damage',
      'Inspect the compressor plug connections',
      'Check refrigerant pressure using manifold gauge',
      'Replace the inverter board if faulty',
      'If compressor windings are open, replace the compressor',
    ],
    tools: [
      'Multimeter',
      'Clamp meter',
      'Manifold gauge set',
      'Screwdriver set',
      'Capacitor (spare)',
    ],
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/images%2Fdaikin_ftl35_compressor.jpg',
    ],
    videoUrls: [
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fdaikin_l1_diagnosis.mp4',
    ],
    brandId: 'brand_daikin',
    modelId: 'model_daikin_ftl35',
    keywords: [
      'daikin',
      'ftl35',
      'l1',
      'compressor',
      'not starting',
      'inverter',
      'startup',
      'failure',
      'capacitor',
    ],
  },
  {
    id: 'content_003',
    title: 'Carrier 24K Water Leaking from Indoor Unit',
    description:
      'Troubleshooting guide for water leakage from Carrier 24K Ester Neo indoor unit. Covers drain pipe blockage, improper installation, and evaporator coil issues.',
    errorCode: '',
    steps: [
      'Turn off the AC unit immediately',
      'Check the drain pipe for blockages or kinks',
      'Use a wet/dry vacuum to clear the drain line',
      'Inspect the drain pan for cracks or damage',
      'Check if the unit is properly leveled (slight tilt toward drain)',
      'Clean the evaporator coil if dirty or frozen',
      'Ensure the drain pipe has proper slope for gravity flow',
      'Test the unit and monitor for 2 hours',
    ],
    tools: [
      'Wet/dry vacuum',
      'Level tool',
      'Drain pipe cleaner',
      'Screwdriver set',
      'Cleaning brush',
    ],
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/images%2Fcarrier_24k_drain.jpg',
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/images%2Fcarrier_24k_evaporator.jpg',
    ],
    videoUrls: [],
    brandId: 'brand_carrier',
    modelId: 'model_carrier_24k',
    keywords: [
      'carrier',
      '24k',
      'water',
      'leak',
      'leaking',
      'drain',
      'blockage',
      'evaporator',
      'indoor',
    ],
  },
  {
    id: 'content_004',
    title: 'LG PS-Q19 Ice Formation on Evaporator Coil',
    description:
      'Complete guide to diagnose and fix ice formation on LG PS-Q19YNZE evaporator coil. Common causes include low refrigerant, dirty filter, and faulty thermistor.',
    errorCode: 'CH10',
    steps: [
      'Turn off the AC and let the ice melt completely',
      'Clean or replace the air filter',
      'Check the thermistor resistance (should match specification)',
      'Inspect the evaporator coil for dirt buildup',
      'Check refrigerant levels using manifold gauge',
      'Inspect the expansion valve for proper operation',
      'If refrigerant is low, check for leaks and recharge',
      'Test the unit in cooling mode for 1 hour',
    ],
    tools: [
      'Manifold gauge set',
      'Thermistor',
      'Multimeter',
      'Coil cleaning spray',
      'Leak detector',
      'Refrigerant (R32)',
    ],
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/images%2Flg_q19_evaporator.jpg',
    ],
    videoUrls: [
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Flg_ice_formation.mp4',
    ],
    brandId: 'brand_lg',
    modelId: 'model_lg_ps_q19',
    keywords: [
      'lg',
      'ps-q19',
      'ice',
      'formation',
      'freezing',
      'evaporator',
      'coil',
      'ch10',
      'thermistor',
      'refrigerant',
      'filter',
    ],
  },
  {
    id: 'content_005',
    title: 'Samsung AR18 Outdoor Fan Motor Replacement',
    description:
      'Step-by-step guide for replacing the outdoor fan motor on Samsung AR18TY3QBBU. Includes circuit diagrams and wiring instructions.',
    errorCode: 'E464',
    steps: [
      'Disconnect power to the outdoor unit',
      'Remove the outdoor unit top cover',
      'Disconnect the fan motor wiring harness',
      'Remove the fan blade using appropriate tool',
      'Unbolt the fan motor from the mounting bracket',
      'Install the new fan motor and secure with bolts',
      'Reattach the fan blade (ensure correct rotation direction)',
      'Reconnect the wiring harness',
      'Replace the top cover and restore power',
      'Test the outdoor unit operation',
    ],
    tools: [
      'Socket wrench set',
      'Screwdriver set',
      'Fan motor puller',
      'Replacement fan motor',
      'Cable ties',
      'Multimeter',
    ],
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/images%2Fsamsung_ar18_outdoor.jpg',
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/images%2Fsamsung_ar18_circuit.jpg',
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/images%2Fsamsung_ar18_wiring.jpg',
    ],
    videoUrls: [
      'https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT/o/videos%2Fsamsung_fan_motor.mp4',
    ],
    brandId: 'brand_samsung',
    modelId: 'model_samsung_ar18',
    keywords: [
      'samsung',
      'ar18',
      'fan',
      'motor',
      'outdoor',
      'replacement',
      'e464',
      'wiring',
      'circuit',
    ],
  },
];

/**
 * To seed Firestore, uncomment the code below and run with Firebase Admin SDK.
 *
 * Prerequisites:
 * 1. npm install firebase-admin
 * 2. Download service account key from Firebase Console
 * 3. Set GOOGLE_APPLICATION_CREDENTIALS environment variable
 */

/*
import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

async function seedData() {
  console.log('Seeding brands...');
  for (const brand of sampleBrands) {
    await db.collection('brands').doc(brand.id).set({
      name: brand.name,
      logoUrl: brand.logoUrl,
    });
  }
  console.log(`✓ ${sampleBrands.length} brands seeded`);

  console.log('Seeding models...');
  for (const model of sampleModels) {
    await db.collection('models').doc(model.id).set({
      name: model.name,
      brandId: model.brandId,
    });
  }
  console.log(`✓ ${sampleModels.length} models seeded`);

  console.log('Seeding contents...');
  for (const content of sampleContents) {
    const { id, ...data } = content;
    await db.collection('contents').doc(id).set(data);
  }
  console.log(`✓ ${sampleContents.length} contents seeded`);

  console.log('\\nSeed complete!');
}

seedData().catch(console.error);
*/

// Log the data structure for reference
/* eslint-disable no-console */
console.log('AssistPro Seed Data Structure');
console.log('============================');
console.log(`Brands: ${sampleBrands.length}`);
console.log(`Models: ${sampleModels.length}`);
console.log(`Contents: ${sampleContents.length}`);
console.log('\nTo seed your Firestore database:');
console.log('1. Set up Firebase Admin SDK');
console.log('2. Uncomment the seeding code in this file');
console.log('3. Run: npx ts-node scripts/seedFirestore.ts');
