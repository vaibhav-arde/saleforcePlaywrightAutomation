/**
 * Type-safe data loading utilities for test data files
 */

import fs from 'fs';
import path from 'path';

/**
 * Load and parse a JSON file as typed array
 * @param filePath - Relative or absolute path to JSON file
 * @returns Parsed array of typed objects
 */
export function loadJsonData<T>(filePath: string): T[] {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Test data file not found: ${absolutePath}`);
  }

  const rawData = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(rawData) as T[];
}

/**
 * Load and parse a CSV file into string arrays
 * @param filePath - Relative or absolute path to CSV file
 * @param skipHeader - Whether to skip the first row (default: true)
 * @returns Array of string arrays (rows × columns)
 */
export function loadCsvData(filePath: string, skipHeader = true): string[][] {
  const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Test data file not found: ${absolutePath}`);
  }

  const rawData = fs.readFileSync(absolutePath, 'utf-8');
  const lines = rawData
    .trim()
    .split('\n')
    .map((line) => line.split(',').map((cell) => cell.trim()));

  return skipHeader ? lines.slice(1) : lines;
}
